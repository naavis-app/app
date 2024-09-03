import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { db } from "../db";

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		expires: false,
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes: DatabaseUserAttributes) => {
		return {
			username: attributes.username,
			firstname: attributes.firstname,
			lastname: attributes.lastname,
			profile_pic: attributes.profile_pic,
			email: attributes.email,
		};
	},
});

export interface DatabaseUserAttributes {
	id: string;
	github_id?: number | null;
	username: string;
	firstname: string;
	lastname: string;
	profile_pic: string | null; // if there are pfp errors, make this optional
	// i made it mandatory for the cache
	email: string | null;
}

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}