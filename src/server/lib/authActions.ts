/* this file handles regular authentication with user entered
username/password. please check https://lucia-auth.com/
for more information. */
"use server";

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { verify } from "@node-rs/argon2";
import { hash } from "@node-rs/argon2";
import type prismaTypes from "@prisma/client";
import { Prisma, type User as PrismaUser } from "@prisma/client";
import { generateIdFromEntropySize } from "lucia";
import { Lucia } from "lucia";
import type { Session, User } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import toast from "react-hot-toast";
import { db } from "~/server/db";
import { redis } from "../redis";

import { lucia, type DatabaseUserAttributes } from "./lucia";

function filterUserAttributes(user: prismaTypes.User): DatabaseUserAttributes {
	return {
		id: user.id,
		github_id: user.github_id,
		username: user.username,
		firstname: user.firstname || "",
		lastname: user.lastname || "",
		profile_pic: user.profile_pic,
		email: user.email,
	};
}

interface ActionResult {
	error?: string;
	user?: DatabaseUserAttributes;
}

export async function cacheSession(session: Session) {
	await redis.setex(
		`session:${session.id}`,
		3600,
		JSON.stringify({ userId: session.userId }),
	);
}

export async function login(formData: FormData): Promise<ActionResult> {
	const username = formData.get("username");

	const cachedUser = await redis.get(`user:${username}`);
	let existingUser: PrismaUser | null;

	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-zA-Z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username",
		};
	}

	if (cachedUser) {
		existingUser = JSON.parse(cachedUser);
	} else {
		existingUser = await db.user.findUnique({
			where: {
				username: username,
			},
		});
	}

	if (!existingUser) {
		return {
			error: "Incorrect username!",
		};
	}

	await redis.setex(`user:${username}`, 3600, JSON.stringify(existingUser));

	const password = formData.get("password");
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			error: "Invalid password",
		};
	}

	const validPassword = await verify(
		existingUser.password as string,
		password,
		{
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		},
	);

	if (!validPassword) {
		return {
			error: "Incorrect password!",
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);

	await cacheSession(session);

	return redirect("/dashboard");
}

export async function signup(formData: FormData): Promise<ActionResult> {
	const username = formData.get("username");

	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-zA-Z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username",
		};
	}

	const password = formData.get("password");

	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			error: "Invalid password",
		};
	}

	const firstname = formData.get("firstname");
	if (typeof firstname !== "string" || firstname.length > 255) {
		return {
			error: "Invalid first name",
		};
	}

	const lastname = formData.get("lastname");
	if (typeof lastname !== "string" || lastname.length > 255) {
		return {
			error: "Invalid last name",
		};
	}

	const email = formData.get("email");
	if (typeof email !== "string" || email.length > 255) {
		return {
			error: "Invalid email",
		};
	}

	const userId = generateIdFromEntropySize(10);
	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	let existingUser: PrismaUser | null;
	const cachedUser = await redis.get(`user:${username}`);

	if (cachedUser) {
		existingUser = JSON.parse(cachedUser);
	} else {
		existingUser = await db.user.findUnique({
			where: {
				username: username,
			},
		});
	}

	if (existingUser) {
		return {
			error: "Taken username",
		};
	}

	const createdUser = await db.user.create({
		data: {
			id: userId,
			username: username,
			password: passwordHash,
			firstname: firstname,
			lastname: lastname,
			email: email,
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

	return redirect("/sign-up/picture");
}

export async function edit(formData: FormData): Promise<ActionResult> {
	const username = formData.get("username");

	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-zA-Z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username",
		};
	}

	const firstname = formData.get("firstname");
	if (typeof firstname !== "string" || firstname.length > 255) {
		return {
			error: "Invalid first name",
		};
	}

	const lastname = formData.get("lastname");
	if (typeof lastname !== "string" || lastname.length > 255) {
		return {
			error: "Invalid last name",
		};
	}

	const email = formData.get("email");
	if (typeof email !== "string" || email.length > 255) {
		return {
			error: "Invalid email",
		};
	}

	const userId = formData.get("userId");

	const editUser = await db.user.update({
		where: {
			id: userId as string,
		},
		data: {
			username: username,
			firstname: firstname,
			lastname: lastname,
			email: email,
		},
	});

	await redis.setex(`user:${username}`, 3600, JSON.stringify(editUser));
	await redis.setex(`user:${userId}`, 3600, JSON.stringify(editUser));

	const session = await lucia.createSession(userId as string, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);

	await cacheSession(session);

	return {
		user: filterUserAttributes(editUser),
	};
} // editing all other profile fields but passwords

export async function editPassword(formData: FormData): Promise<ActionResult> {
	const password = formData.get("password") || formData.get("text");
	const userId = formData.get("userId");

	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			error: "Invalid password",
		};
	}

	const passwordHash = await hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	const editPasswordUser = await db.user.update({
		where: {
			id: userId as string,
		},
		data: {
			password: passwordHash,
		},
	});

	const session = await lucia.createSession(userId as string, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);

	await cacheSession(session);

	return {
		user: filterUserAttributes(editPasswordUser),
	};
} // editing specifically for passwords

export async function signOut(): Promise<ActionResult> {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value;
	if (sessionId) {
		await redis.del(`session:${sessionId}`);

		await db.session.delete({
			where: {
				id: sessionId,
			},
		});
	}
	cookies().set(lucia.sessionCookieName, "", {
		expires: new Date(0),
		secure: process.env.NODE_ENV === "production",
	});

	return redirect("/");
}

export const validateRequest = cache(
	async (): Promise<
		{ user: User; session: Session } | { user: null; session: null }
	> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null,
			};
		}

		const cachedSession = await redis.get(`session:${sessionId}`);

		if (cachedSession) {
			const cachedData = JSON.parse(cachedSession);
			const user = await db.user.findUnique({
				where: { id: cachedData.userId },
			});

			if (!user) {
				return {
					user: null,
					session: null,
				};
			}

			return {
				user: filterUserAttributes(user),
				session: {
					id: sessionId,
					userId: cachedData.userId,
				} as Session,
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session?.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(
					sessionCookie.name,
					sessionCookie.value,
					sessionCookie.attributes,
				);
			}
		} catch (error) {
			toast.error("Something unexpected occured!");
			// for linter, if there was another plan for this catch, then do that
		}
		return result;
	},
);
