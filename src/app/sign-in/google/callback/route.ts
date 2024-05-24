import { google, lucia } from "~/server/lib/googleauth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { db } from "~/server/db";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const codeVerifier = cookies().get("google_oauth_state")?.value ?? null;
    if (!code || !state || !codeVerifier) {
        return new Response(null, {
            status: 400
        });
    }

    try {
        const tokens = await google.validateAuthorizationCode(code, codeVerifier);
        const googleUserResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: {
                Authorization: `Bearer ${tokens.accessToken}`,
            },
        });
        const googleUser: GoogleUser = await googleUserResponse.json();

        const existingUser = await db.user.findUnique({
            where: {
                email: googleUser.email
            }
        });

        if(existingUser) {
            const session = await lucia.createSession(existingUser.id, {});
            const sessionCookie = lucia.createSessionCookie(session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );

            return new Response(null, {
                status: 302,
                headers: {
                    Location: "/dashboard",
                },
            });
        }

        const randInt = (max: number) => {
            return Math.floor(Math.random() * max);
        }

        const createUsername = (firstName: string, lastName: string): string => {
            return firstName[0] + lastName + randInt(51);
        }

        const firstName = googleUser.given_name;
        const lastName = googleUser.family_name;
        const userName = createUsername(firstName, lastName);
        const userId = generateIdFromEntropySize(10);

        await db.user.create({
            data: {
                id: userId,
                username: userName,
                firstname: firstName,
                lastname: lastName,
                email: googleUser.email,
            },
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );
        
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/dashboard",
            },
        });
    } catch (e) {
        if (e instanceof OAuth2RequestError) {
            return new Response(null, {
                status: 400,
            });
        }
        return new Response(null, {
            status: 500,
        });
    }
}

interface GoogleUser {
    email: string,
    given_name: string,
    family_name: string,
}