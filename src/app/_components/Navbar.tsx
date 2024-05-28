"use client";

import { Text, Link, Button, Switch, Card, Flex, Popover } from "@radix-ui/themes";
import ThemeToggle from "./ThemeToggle";

import AccountButton from "./auth/AccountButton";
import { validateRequest } from "~/server/lib/auth";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "~/server/lib/stores";
import HamburgerLogo from "./HamburgerLogo";
import useWindowSize from "../hooks/useWindowSize";
import { useState } from "react";

export default function Navbar() {
    const [user, setUser] = useAtom(userAtom);
    const width = useWindowSize().width;
    const [isMounted, setIsMounted] = useState(false);

    async function fetchUser() {
        console.log("fetching user");
        const data = await validateRequest();

        console.log(data);
        setUser(data.user);
    }

    useEffect(() => {
        fetchUser();
        setIsMounted(true);
    }, []);

    if(!isMounted) {
        return (
            <nav className="fixed z-50 flex w-full select-none p-4">
                <Card className="w-full" variant={"classic"}>
                    <Flex justify={"between"}>
                        <Link href="/" className="hover:no-underline">
                            <Text className="text-2xl font-bold text-blue-500 hover:no-underline">
                                Location App
                            </Text>
                        </Link>
                        <div className="flex flex-row items-center justify-center gap-2 text-white">
                            <ThemeToggle />
                            <p className="font-bold">Loading...</p>
                        </div>
                    </Flex>
                </Card>
            </nav>
        );
    }

    return (
        <>
            <nav className="fixed z-50 flex w-full select-none p-4">
                <Card className="w-full" variant={"classic"}>
                    <Flex justify={"between"}>
                        <Link href="/" className="hover:no-underline">
                            <Text
                                className="text-2xl font-bold text-blue-500
                    hover:no-underline"
                            >
                                Location App
                            </Text>
                        </Link>

                        <div
                            className="flex flex-row items-center justify-center 
                            gap-2 text-white"
                        >
                            <ThemeToggle />

                            {width! > 768 ? (
                                <>
                                    {!user?.id ? (
                                        <Link
                                            href="/sign-in"
                                            className="hover:no-underline"
                                        >
                                            <Text
                                                className="rounded-md border-2 
                                                border-blue-500 
                                                bg-transparent px-4 py-2 
                                                font-bold text-blue-500 
                                                transition-all 
                                                hover:border-blue-600
                                                hover:bg-blue-600 hover:bg-opacity-50 
                                                hover:text-white"
                                            >
                                                Sign in
                                            </Text>
                                        </Link>
                                    ) : (
                                        <AccountButton user={user} />
                                    )}

                                    {user?.id ? (
                                        <Link
                                            href="/dashboard"
                                            className="hover:no-underline"
                                        >
                                            <Text
                                                className="rounded-md border-2
                                            border-blue-500 bg-blue-500
                                            px-4 py-2 font-bold text-white
                                            transition-colors hover:border-blue-700
                                            hover:bg-blue-700"
                                            >
                                                Dashboard
                                            </Text>
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/sign-up"
                                            className="hover:no-underline"
                                        >
                                            <Text
                                                className="rounded-md border-2 
                                                border-blue-500 
                                                bg-blue-500 px-4 py-2
                                                    font-bold text-white 
                                                    transition-colors 
                                                    hover:border-blue-700
                                                    hover:bg-blue-700"
                                            >
                                                Get Started
                                            </Text>
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <Popover.Root>
                                    <Popover.Trigger>
                                            <button aria-label="Hamburger Menu" 
                                            className="hamburger-button">
                                                <HamburgerLogo />
                                            </button>
                                    </Popover.Trigger>
                                    <Popover.Content className="flex flex-col space-y-6">
                                        {!user?.id ? (
                                        <Link
                                            href="/sign-in"
                                            className="hover:no-underline"
                                        >
                                            <Text
                                                className="rounded-md border-2 border-blue-500 
                                                bg-transparent px-8 py-2 
                                                font-bold text-blue-500 transition-all 
                                                hover:border-blue-600 hover:bg-blue-600 
                                                hover:bg-opacity-50 hover:text-white"
                                            >
                                                Sign in
                                            </Text>
                                        </Link>
                                    ) : (
                                        <AccountButton user={user} />
                                    )}

                                    {user?.id ? (
                                        <Link
                                            href="/dashboard"
                                            className="hover:no-underline"
                                        >
                                            <Text
                                                className="rounded-md border-2
                                            border-blue-500 bg-blue-500
                                            px-4 py-2 font-bold text-white
                                            transition-colors hover:border-blue-700
                                            hover:bg-blue-700"
                                            >
                                                Dashboard
                                            </Text>
                                        </Link>
                                    ) : (
                                        <Link
                                            href="/sign-up"
                                            className="hover:no-underline"
                                        >
                                            <Text
                                                className="rounded-md border-2 border-blue-500 
                                                bg-blue-500 px-4 py-2 font-bold text-white 
                                                transition-colors hover:border-blue-700
                                                hover:bg-blue-700"
                                            >
                                                Get Started
                                            </Text>
                                        </Link>
                                    )}
                                    </Popover.Content>
                                </Popover.Root>
                            )}
                        </div>
                    </Flex>
                </Card>
            </nav>
        </>
    );
}
