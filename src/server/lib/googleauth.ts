/* this file exports necessary functions and constants
for authentication with Google. we use lucia and arctic for 
third-party authentication. 
check https://developers.google.com/identity/protocols/oauth2
and https://arctic.js.org/providers/google
for more information. */

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { Google } from "arctic";
import { db } from "../db";

const adapter = new PrismaAdapter(db.session, db.user);
export const google = new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    "http://localhost:3000/sign-in/google/callback",
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
            given_name: attributes.given_name,
            family_name: attributes.family_name,
        };
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    github_id?: number;
    username: string;
    name: string;
    email: string;
    given_name?: string;
    family_name?: string;
    profile_pic?: string;
}

export const randInt = (max: number) => {
    return Math.floor(Math.random() * max);
};
