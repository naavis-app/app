/* this is our sign-in page, where users can enter their information,
or sign-in through github and google (more to come!) 
some components here are from radix-ui, and react-icons.
check https://www.radix-ui.com/themes/docs/overview/getting-started 
and https://react-icons.github.io/react-icons/ for more information */

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

import { BsGithub, BsGoogle } from "react-icons/bs";

import NextLink from "next/link";
import { login } from "~/server/lib/auth";
import { useState } from "react";

import { ImEye, ImEyeBlocked } from "react-icons/im";

import React from "react";

export default function Page() {
    const [toggle, setToggle] = useState<boolean>(false);

    return (
        <div
            className="mt-20 flex h-full w-full flex-1
        flex-col items-center justify-center overflow-scroll"
        >
            <div className="w-[300px] md:w-[400px]">
                <Card
                    size={"4"}
                    variant="surface"
                    className="w-[300px] md:w-[400px]"
                >
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
                            <div
                                className="relative flex
                            w-full flex-row items-center
                            justify-end"
                            >
                                <TextField.Root
                                    size={"2"}
                                    variant="surface"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    type={toggle ? "text" : "password"}
                                    className="w-full pr-10"
                                    spellCheck={false}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-4"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setToggle(!toggle);
                                    }}
                                >
                                    {!toggle && <ImEyeBlocked />}
                                    {toggle && <ImEye />}
                                </button>
                            </div>
                        </Box>
                        <Flex justify="end" gap={"3"} mt={"6"}>
                            <NextLink href="/sign-up">
                                <Button size={"2"} variant="soft">
                                    Create an account
                                </Button>
                            </NextLink>
                            <Button size={"2"} variant="solid" type="submit">
                                Sign in
                            </Button>
                        </Flex>
                    </form>
                </Card>
            </div>
            <Text className="pt-2 font-bold">or sign-in with...</Text>
            <div className="flex justify-center">
                <NextLink href="/sign-up/github">
                    <div
                        className="rounded-lg 
                            fill-current p-2
                            text-4xl transition-colors 
                            duration-300 hover:text-neutral-400"
                    >
                        <BsGithub />
                    </div>
                </NextLink>
                <NextLink href="/sign-up/google">
                    <div
                        className="rounded-lg 
                            fill-current p-2
                            text-4xl transition-colors 
                            duration-300 hover:text-neutral-400"
                    >
                        <BsGoogle />
                    </div>
                </NextLink>
            </div>
        </div>
    );
}
