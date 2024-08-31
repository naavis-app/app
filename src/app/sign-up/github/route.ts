/* route visited during github authentication, where
a cookie is created with a oauth state and allows for 
this information to be pulled by a callback route through a 
cookie */

import { generateState } from "arctic";
import { cookies } from "next/headers";
import { github } from "~/server/lib/githubauth";

export async function GET(): Promise<Response> {
	const state = generateState();
	const url = await github.createAuthorizationURL(state);

	cookies().set("github_oauth_state", state, {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: "lax",
	});

	return Response.redirect(url);
}
