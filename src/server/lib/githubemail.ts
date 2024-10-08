/* this file sends an email address to the database when a user
logs in through github. this is done because pulling an email address
from a github account is a little annoying, (as many users don't have
public emails) so i went with this option. */

"use server";

import type { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "../db";
import { redis } from "../redis";
import { validateRequest } from "./authActions";

export async function emailSubmit(formData: FormData): Promise<EmailProps> {
	const email = formData.get("email");
	const { user } = await validateRequest();

	const cachedUser = await redis.get(`user:${user?.username}`);
	let existingUser: User | null;

	if (
		typeof email !== "string" ||
		email.length > 320 ||
		email.length < 3 ||
		!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
	) {
		return {
			error: "Invalid email",
		};
	}

	if (cachedUser) {
		existingUser = JSON.parse(cachedUser);
	} else {
		existingUser = await db.user.findUnique({
			where: {
				email: email,
			},
		});
	}

	if (existingUser) {
		return {
			error: "Taken username",
		};
	}

	await db.user.update({
		where: {
			id: user?.id,
		},
		data: {
			email: email,
		},
	});

	return redirect("/dashboard");
}

interface EmailProps {
	error: string;
}
