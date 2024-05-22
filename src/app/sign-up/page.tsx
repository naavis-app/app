import { db } from "~/server/db";
import { cookies } from "next/headers";
import { lucia } from "~/app/lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Text,
    TextField,
} from "@radix-ui/themes";

import NextLink from "next/link";

export default function Page() {
    return (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
            <div className="w-[400px]">
                <Card size={"4"} variant="surface" style={{ width: "400px" }}>
                    <Heading size={"6"} mb="6">
                        Create an Account
                    </Heading>
                    <form action={signup}>
                        <Box mb={"5"}>
                            <Text size={"2"} weight="medium" mb={"1"}>
                                First Name
                            </Text>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="firstname"
                                placeholder="Enter your first name"
                                required
                            />
                        </Box>
                        <Box mb={"5"}>
                            <Text size={"2"} weight="medium" mb={"1"}>
                                Last Name
                            </Text>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="lastname"
                                placeholder="Enter your last name"
                                required
                            />
                        </Box>
                        <Box mb={"5"}>
                            <Text size={"2"} weight="medium" mb={"1"}>
                                Email
                            </Text>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="email"
                                placeholder="Enter your email"
                                required
                            />
                        </Box>
                        <Box mb={"5"}>
                            <Text size={"2"} weight="medium" mb={"1"}>
                                Username
                            </Text>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="username"
                                placeholder="Enter your username"
                                required
                            />
                        </Box>
                        <Box mb={"5"} position="relative">
                            <Text size={"2"} weight="medium" mb={"1"}>
                                Password
                            </Text>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                required
                            />
                        </Box>
                        <Flex justify="end" gap={"3"} mt={"6"}>
                            <NextLink href="/sign-in">
                                <Button size={"2"} variant="soft">
                                    I already have an account
                                </Button>
                            </NextLink>
                            <Button size={"2"} variant="solid">
                                Continue
                            </Button>
                        </Flex>
                    </form>
                </Card>
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
