import { db } from "~/server/db";
import { cookies } from "next/headers";
import { lucia } from "~/app/lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { Text } from "@radix-ui/themes";
import Link from "next/link";

export default function Page() {
    return (
        <div
            className="flex h-full flex-1 flex-col 
        items-center justify-center text-white"
        >
            <div
                className="flex flex-col rounded-lg
            p-20"
            >
                <Link href="/sign-up/github">
                    <Text className="text-white">Sign in with GitHub</Text>
                </Link>
                <Text
                    className="mb-5
                text-center text-2xl font-bold"
                >
                    Create an Account
                </Text>
                <form action={signup}>
                    <div
                        className="mb-5 flex 
                    flex-col items-center"
                    >
                        <label
                            htmlFor="firstname"
                            className="text-center
                        text-lg font-bold"
                        >
                            First Name
                        </label>
                        <input
                            name="firstname"
                            id="firstname"
                            type="text"
                            className="rounded-md border-2 
                        border-blue-950 bg-bg-col p-1
                        text-white focus:border-blue-900
                        focus:outline-none"
                            required
                        />
                    </div>
                    <div
                        className="mb-5 flex 
                    flex-col items-center"
                    >
                        <label
                            htmlFor="lastname"
                            className="text-center
                        text-lg font-bold"
                        >
                            Last Name
                        </label>
                        <input
                            name="lastname"
                            id="lastname"
                            type="text"
                            className="rounded-md border-2 
                        border-blue-950 bg-bg-col p-1
                        text-white focus:border-blue-900
                        focus:outline-none"
                            required
                        />
                    </div>
                    <div
                        className="mb-5 flex 
                    flex-col items-center"
                    >
                        <label
                            htmlFor="email"
                            className="text-center
                        text-lg font-bold"
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            className="rounded-md border-2 
                        border-blue-950 bg-bg-col p-1
                        text-white focus:border-blue-900
                        focus:outline-none"
                            required
                        />
                    </div>
                    <div
                        className="mb-5 flex 
                    flex-col items-center"
                    >
                        <label
                            htmlFor="username"
                            className="text-center
                        text-lg font-bold"
                        >
                            Username
                        </label>
                        <input
                            name="username"
                            id="username"
                            className="rounded-md border-2 
                        border-blue-950 bg-bg-col p-1
                        text-white focus:border-blue-900
                        focus:outline-none"
                            required
                        />
                    </div>
                    <div
                        className="mb-5 flex 
                    flex-col items-center"
                    >
                        <label
                            htmlFor="password"
                            className="text-center
                        text-lg font-bold"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="rounded-md
                        border-2 border-blue-950 
                        bg-bg-col p-1
                        text-white focus:border-blue-900
                        focus:outline-none"
                            required
                        />
                    </div>
                    <div className="flex justify-center pt-3">
                        <button
                            className="rounded-md bg-blue-500 
                        px-4 py-2 font-bold text-white
                        transition-colors hover:bg-blue-700"
                        >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

async function signup(formData: FormData): Promise<ActionResult> {
    "use server";

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
    return redirect("/sign-in");
}

interface ActionResult {
    error: string;
}

export async function generateStaticParams() {
    return [{ params: {} }];
}
