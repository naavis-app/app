import { google, lucia } from "~/server/lib/googleauth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { db } from "~/server/db";

export async function GET(request: Request): Promise<Response> {
    const url = new URL(request.url);
}