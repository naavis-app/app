import { db } from "~/server/db";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "~/app/lib/auth";
import { redirect } from "next/navigation";
import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Text,
    TextField,
} from "@radix-ui/themes";
import Link from "next/link";

export default function Page() {
    return (
        <div
            className="flex h-full w-full flex-1 flex-col
        items-center justify-center"
        >
            <div className="w-[400px]">
                <Card size={"4"} variant="surface" style={{ width: "400px" }}>
                    <Heading size={"6"} mb="6">
                        Sign in
                    </Heading>
                    <form action={login}>
                        <Box mb={"5"}>
                            <Text size={"2"} weight="medium" mb={"1"}>
                                Username
                            </Text>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="username"
                                placeholder="Enter your username"
                            />
                        </Box>

                        <Box mb={"5"} position="relative">
                            <Flex justify={"between"} mb={"1"}>
                                <Text size={"2"} weight="medium">
                                    Password
                                </Text>
                                <Link href="/forgot-password">
                                    Forgot password?
                                </Link>
                            </Flex>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                spellCheck={false}
                            />
                        </Box>
                        <Flex justify="end" gap={"3"} mt={"6"}>
                            <Link href="/sign-up">
                                <Button size={"2"} variant="soft">
                                    Create an account
                                </Button>
                            </Link>
                            <Button size={"2"} variant="solid">
                                    Sign in
                            </Button>
                        </Flex>
                    </form>
                </Card>
            </div>
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

    const validPassword = await verify(existingUser.password, password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

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

interface ActionResult {
    error: string;
}

export async function generateStaticParams() {
    return [{ params: {} }];
}
