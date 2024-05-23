"use server";

import { db } from "../db";
import { validateRequest } from "./auth";
import { redirect } from "next/navigation";

export async function emailSubmit(formData: FormData): Promise<EmailProps> {
    let email = formData.get("email");
    const { user } = await validateRequest();

    if(
        typeof email !== "string" ||
        email.length > 320 ||
        email.length < 3 ||
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
    ) {
        return {
            error: "Invalid email"
        }
    }

    const existingUser = await db.user.findUnique({
        where: {
            email: email
        }
    });

    if(existingUser) {
        return {
            error: "Taken username",
        }
    }

    await db.user.update({
        where: {
            id: user?.id,
            username: user?.username
        },
        data: {
            email: email,
        }
    });

    return redirect('/dashboard')
}

interface EmailProps {
    error: string;
}