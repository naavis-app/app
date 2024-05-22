import { db } from "~/server/db";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "~/auth";
import { redirect } from "next/navigation";

export default function Page() {
    return (
        <div className="flex flex-col h-full w-full flex-1
        items-center justify-center text-white"
        >
            <h1>
                Login
            </h1>
            <form action={login}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input name="username" id="username" 
                    className="border-2 text-black"
                    />
                    <br />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" 
                    id="password" className="border-2
                    text-black" 
                    />
                    <br />
                    <div className="flex justify-center pt-3">
                        <button className="rounded-md bg-blue-500
                        p-2 text-white hover:bg-blue-700"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

async function login(formData: FormData): Promise<ActionResult> {
    "use server";

    const username = formData.get("username");
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username)
    ) {
        return {
            error: "Invalid username"
        };
    }
    const password = formData.get("password");
    if (typeof password !== "string" ||
        password.length < 6 ||
        password.length > 255 ) {
            return {
                error: "Invalid password"
            };
    }

    const existingUser = await db.user.findUnique({
        where: {
            username: username
        },
    });

    if(!existingUser) {
        return {
            error: "Taken username!"
        };
    }

    const validPassword = await verify(existingUser.password, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    if(!validPassword) {
        return {
            error: "Incorrect username or password"
        };
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    return redirect("/dashboard");
}

interface ActionResult {
    error: string;
}

export async function generateStaticParams() {
    return [{ params: {} }];
}
