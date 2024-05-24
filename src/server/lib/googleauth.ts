import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { Google } from "arctic";
import { db } from "../db";

const adapter = new PrismaAdapter(db.session, db.user);
export const google = new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    process.env.NEXT_PUBLIC_BASE_URL + "/sign-in/google/callback"
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

        };
    },
});

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: RegisteredDatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    google_id?: string,
    username: string;
    name: string
}

// ! TODO: FINISH THIS !