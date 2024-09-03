/* this file exports necessary functions and constants
for authentication with Google. we use lucia and arctic for 
third-party authentication. 
check https://developers.google.com/identity/protocols/oauth2
and https://arctic.js.org/providers/google
for more information. */

import { Google } from "arctic";

if (!process.env.GOOGLE_CLIENT_ID) {
	throw new Error("Missing GOOGLE_CLIENT_ID");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
	throw new Error("Missing GOOGLE_CLIENT_SECRET");
}
if (!process.env.GOOGLE_CALLBACK_URL) {
	throw new Error("Missing GOOGLE_CALLBACK_URL");
}

export const google = new Google(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_CALLBACK_URL,
);

export const randInt = (max: number) => {
	return Math.floor(Math.random() * max);
};
