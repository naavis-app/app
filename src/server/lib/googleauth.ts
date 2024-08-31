/* this file exports necessary functions and constants
for authentication with Google. we use lucia and arctic for 
third-party authentication. 
check https://developers.google.com/identity/protocols/oauth2
and https://arctic.js.org/providers/google
for more information. */

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Google } from "arctic";
import { Lucia } from "lucia";
import { db } from "../db";
import type { DatabaseUserAttributes } from "./auth";

if (!process.env.GOOGLE_CLIENT_ID) {
	throw new Error("Missing GOOGLE_CLIENT_ID");
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
	throw new Error("Missing GOOGLE_CLIENT_SECRET");
}
if (!process.env.GOOGLE_CALLBACK_URL) {
	throw new Error("Missing GOOGLE_CALLBACK_URL");
}

const adapter = new PrismaAdapter(db.session, db.user);
export const google = new Google(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_CALLBACK_URL,
);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes: DatabaseUserAttributes) => {
		return {
			email: attributes.email,
		};
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

export const randInt = (max: number) => {
	return Math.floor(Math.random() * max);
};
