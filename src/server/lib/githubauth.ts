/* this file exports functions and constants for github authentication.
we use lucia and arctic for third-parth authentication.
check https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
and https://arctic.js.org/providers/github for more information. */

import { GitHub } from "arctic";

if (!process.env.GITHUB_CLIENT_ID) {
	throw new Error("GITHUB_CLIENT_ID is not defined");
}

if (!process.env.GITHUB_CLIENT_SECRET) {
	throw new Error("GITHUB_CLIENT_SECRET is not defined");
}

if (!process.env.GITHUB_CALLBACK_URL) {
	throw new Error("GITHUB_CALLBACK_URL is not defined");
}

export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID,
	process.env.GITHUB_CLIENT_SECRET,
	{ redirectURI: process.env.GITHUB_CALLBACK_URL },
);
