/* this file exports functions and constants for github authentication.
we use lucia and arctic for third-parth authentication.
check https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps
and https://arctic.js.org/providers/github for more information. */

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { GitHub } from "arctic";
import { db } from "~/server/db";

const adapter = new PrismaAdapter(db.session, db.user);
export const github = new GitHub(
    process.env.GITHUB_CLIENT_ID!,
    process.env.GITHUB_CLIENT_SECRET!,
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
            githubId: attributes.github_id,
            username: attributes.username,
            name: attributes.name,
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
