/* route visited during google authentication, where
a cookie is created with a oauth state and codeverifier which allows for 
this information to be pulled by a callback route through a 
cookie */

import { generateState, generateCodeVerifier } from "arctic";
import { google } from "~/server/lib/googleauth";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const url = await google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"],
    });

    cookies().set("google_oauth_state", codeVerifier, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10,
        sameSite: "lax",
    });

    return Response.redirect(url);
}
