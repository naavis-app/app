import { db } from "~/server/db";
import { cookies } from "next/headers";
import { lucia } from "~/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { Text } from "@radix-ui/themes";

export default function Page() {
    return (
        <div 
        className="flex h-full flex-1 flex-col 
        items-center justify-center text-white"
        >
            <div className="flex flex-col p-20
            rounded-lg">
                <Text 
                className="text-center
                font-bold text-2xl mb-5"
                >
                    Create an Account
                </Text>
                <form action={signup}>
                    <div 
                    className="flex flex-col 
                    items-center mb-5"
                    >
                        <label htmlFor="username"
                        className="text-center
                        font-bold text-lg"
                        >
                            Username
                        </label>
                        <input name="username" id="username" 
                        className="rounded-md bg-bg-col 
                        text-white border-2 border-blue-950
                        focus:outline-none focus:border-blue-900
                        p-1"
                        />
                    </div>
                    <div 
                    className="flex flex-col 
                    items-center mb-5"
                    >
                        <label htmlFor="password"
                        className="text-center
                        font-bold text-lg"
                        >
                            Password
                        </label>
                        <input type="password" name="password" 
                        id="password" className="border-2
                        border-blue-950 rounded-md 
                        bg-bg-col text-white
                        focus:outline-none focus:border-blue-900
                        p-1"
                        />
                    </div>
                    <div 
                    className="flex flex-col 
                    items-center mb-5"
                    >
                        <label htmlFor="firstname"
                        className="text-center
                        font-bold text-lg"
                        >
                            First Name
                        </label>
                        <input name="firstname" id="firstname" type="text"
                        className="rounded-md bg-bg-col 
                        text-white border-2 border-blue-950
                        focus:outline-none focus:border-blue-900
                        p-1"
                        />
                    </div>
                    <div 
                    className="flex flex-col 
                    items-center mb-5"
                    >
                        <label htmlFor="lastname"
                        className="text-center
                        font-bold text-lg"
                        >
                            Last Name
                        </label>
                        <input name="lastname" id="lastname" type="text"
                        className="rounded-md bg-bg-col 
                        text-white border-2 border-blue-950
                        focus:outline-none focus:border-blue-900
                        p-1"
                        />
                    </div>
                    <div 
                    className="flex flex-col 
                    items-center mb-5"
                    >
                        <label htmlFor="email"
                        className="text-center
                        font-bold text-lg"
                        >
                            Email
                        </label>
                        <input name="email" id="email" type="email"
                        className="rounded-md bg-bg-col 
                        text-white border-2 border-blue-950
                        focus:outline-none focus:border-blue-900
                        p-1"
                        />
                    </div>
                    <div className="flex justify-center pt-3">
                        <button className="rounded-md bg-blue-500 
                        py-2 px-4 text-white hover:bg-blue-700
                        font-bold"
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
            error: "Invalid first name"
        };
    }

    const lastname = formData.get("lastname");
    if (typeof lastname !== "string" || lastname.length > 255) {
        return {
            error: "Invalid last name"
        };
    }

    const email = formData.get("email");
    if ( typeof email !== "string" ||
        email.length > 255
    ) {
        return {
            error: "Invalid email"
        }
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
