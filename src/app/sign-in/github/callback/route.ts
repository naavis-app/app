/* this file deals with github's callback route during authentication,
where the data is pulled from github's api and sent to our database. 
check https://arctic.js.org/providers/github 
and https://lucia-auth.com/ for more information */

import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { db } from "~/server/db";
import { cacheSession } from "~/server/lib/authActions";
import { github } from "~/server/lib/githubauth";
import { lucia } from "~/server/lib/lucia";
import { redis } from "~/server/redis";

export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("github_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400,
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);
		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`,
			},
		});
		const githubUser: GitHubUser = await githubUserResponse.json();

		const existingUser = await db.user.findFirst({
			where: {
				github_id: Number(githubUser.id),
			},
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes,
			);

			await cacheSession(session);

			return new Response(null, {
				status: 302,
				headers: {
					Location: "/dashboard",
				},
			});
		}

		const splitName = (name: string) => {
			const [firstName, ...lastName] = name.split(" ").filter(Boolean);
			return {
				firstName: firstName || "",
				lastName: lastName.join(" ") || "",
			};
		};

		const { firstName, lastName } = splitName(githubUser.name || "");
		const profilePic = `https://github.com/${githubUser.login}.png`;
		const userId = generateIdFromEntropySize(10);

		const createdUser = await db.user.create({
			data: {
				id: userId,
				github_id: Number(githubUser.id),
				username: githubUser.login,
				firstname: firstName,
				lastname: lastName,
				profile_pic: profilePic,
				// Create initial group for user
				groups: {
					create: {
						name: "My Group",
						description: "My first group",
						personalGroup: true,
						ownerId: userId,
					},
				},
			},
		});

		await redis.setex(`user:${userId}`, 3600, JSON.stringify(createdUser));

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);

		await cacheSession(session);

		return new Response(null, {
			status: 302,
			headers: {
				Location: "/sign-in/email",
			},
		});
	} catch (e) {
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400,
			});
		}
		return new Response(null, {
			status: 500,
		});
	}
}

interface GitHubUser {
	id: string;
	login: string;
	name: string;
	picture: string;
}

// ! TODO: validate requests/signout
