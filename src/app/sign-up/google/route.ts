import { generateState, generateCodeVerifier } from "arctic";
import { google } from "~/server/lib/googleauth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = await google.createAuthorizationURL(
        state,
        codeVerifier,
        { scopes: ["profile", "email", "name"] }
    );

    cookies().set("google_oauth_state", codeVerifier, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10,
        sameSite: "lax"
    });

    return Response.redirect(url);
}