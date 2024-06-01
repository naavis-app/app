/* this file handles regular authentication with user entered
username/password. please check https://lucia-auth.com/
for more information. */

"use server";

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { db } from "~/server/db";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { Lucia } from "lucia";
import type { Session, User } from "lucia";
import { cache } from "react";

const adapter = new PrismaAdapter(db.session, db.user);

const lucia = new Lucia(adapter, {
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

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    github_id?: number;
    username: string;
    firstname: string,
    lastname: string,
    profile_pic?: string;
}

export async function login(formData: FormData): Promise<ActionResult> {
    const username = formData.get("username");
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username)
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

    const existingUser = await db.user.findUnique({
        where: {
            username: username,
        },
    });

    if (!existingUser) {
        return {
            error: "Taken username!",
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
            error: "Incorrect username or password",
        };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );
    return redirect("/dashboard");
}

export async function signup(formData: FormData): Promise<ActionResult> {
    let username = formData.get("username");

    if (
        typeof username != "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username)
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

    const existingUser = await db.user.findUnique({
        where: {
            username: username,
        },
    });

    if (existingUser) {
        return {
            error: "Taken username",
        };
    }

    await db.user.create({
        data: {
            id: userId,
            username: username,
            password: passwordHash,
            firstname: firstname,
            lastname: lastname,
            email: email,
        },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
    );
    return redirect(`/sign-up/picture`);
}

export async function signOut(): Promise<ActionResult> {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value;
    if (sessionId) {
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

interface ActionResult {
    error: string;
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

        const result = await lucia.validateSession(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session && result.session.fresh) {
                const sessionCookie = lucia.createSessionCookie(
                    result.session.id,
                );
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
        } catch {}
        return result;
    },
);

interface DatabaseUserAttributes {
    github_id?: number;
    username: string;
    name: string;
    email: string;
    given_name?: string;
    family_name?: string;
}
