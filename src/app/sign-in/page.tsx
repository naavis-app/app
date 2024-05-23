"use client";

import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Link,
    Text,
    TextField,
} from "@radix-ui/themes";

import { BsGithub } from "react-icons/bs";

import NextLink from "next/link";
import { login } from "~/server/lib/auth";

export default function Page() {
    return (
        <div
            className="flex h-full w-full flex-1 flex-col
        items-center justify-center overflow-scroll"
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
                                    <Text size={"2"} weight="light">
                                        Forgot password?
                                    </Text>
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
                            <NextLink href="/sign-up">
                                <Button size={"2"} variant="soft">
                                    Create an account
                                </Button>
                            </NextLink>
                            <Button size={"2"} variant="solid">
                                Sign in
                            </Button>
                        </Flex>
                    </form>
                </Card>
            </div>
            <Text className="pt-2 font-bold">or sign-in with...</Text>
            <NextLink href="/sign-up/github">
                <div
                    className="rounded-lg 
						fill-current p-2 text-5xl 
						text-white transition-colors 
						duration-300 hover:text-neutral-400"
                >
                    <BsGithub />
                </div>
            </NextLink>
        </div>
    );
}
