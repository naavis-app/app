"use client";

import {
    Text,
    Link,
    Button,
    Switch,
    Card,
    Flex,
    Popover,
} from "@radix-ui/themes";
import ThemeToggle from "../ThemeToggle";

import AccountButton from "../auth/AccountButton";
import { validateRequest } from "~/server/lib/auth";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "~/server/lib/stores";
import HamburgerIcon from "./HamburgerIcon";
import useWindowSize from "../../hooks/useWindowSize";
import SignInButton from "./SignInButton";
import GetStartedButton from "./GetStartedButton";
import DashboardButton from "./DashboardButton";
import Logo from "./Logo";
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
                        <Logo />
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
                        <Logo />

                        <div
                            className="flex flex-row items-center justify-center 
                            gap-2 text-white"
                        >
                            <ThemeToggle />

                            {width! > 768 ? (
                                <>
                                    {!user?.id ? (
                                        <SignInButton xPadding={4} />
                                    ) : (
                                        <AccountButton user={user} />
                                    )}

                                    {user?.id ? (
                                        <DashboardButton />
                                    ) : (
                                        <GetStartedButton />
                                    )}
                                </>
                            ) : (
                                <Popover.Root>
                                    <Popover.Trigger>
                                        <button
                                            aria-label="Hamburger Menu"
                                            className="hamburger-button"
                                        >
                                            <HamburgerIcon />
                                        </button>
                                    </Popover.Trigger>
                                    <Popover.Content className="flex flex-col space-y-6">
                                        {!user?.id ? (
                                            <SignInButton xPadding={8} />
                                        ) : (
                                            <AccountButton user={user} />
                                        )}

                                        {user?.id ? (
                                            <DashboardButton />
                                        ) : (
                                            <GetStartedButton />
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
