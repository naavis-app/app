"use client";

import { Card, Flex, Popover } from "@radix-ui/themes";
import ThemeToggle from "../ThemeToggle";

import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";
import { validateRequest } from "~/server/lib/authActions";
import { userAtom } from "~/server/lib/stores";
import useWindowSize from "../../hooks/useWindowSize";
import AccountButton from "../auth/AccountButton";
import DashboardButton from "./DashboardButton";
import GetStartedButton from "./GetStartedButton";
import HamburgerIcon from "./HamburgerIcon";
import Logo from "./Logo";
import SignInButton from "./SignInButton";

export default function Navbar() {
	const [user, setUser] = useAtom(userAtom);
	const width = useWindowSize().width;
	const [isMounted, setIsMounted] = useState(false);
	const pathName = usePathname();

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

	if (pathName.startsWith("/dashboard")) {
		return <></>;
	}

	if (!isMounted) {
		return (
			<nav className="fixed z-[100] flex w-full select-none p-4">
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
			<nav className="fixed z-[100] flex w-full select-none p-4">
				<Card className="w-full" variant={"classic"}>
					<Flex justify={"between"}>
						<Logo />

						<div
							className="flex flex-row items-center justify-center 
                            gap-2 text-white"
						>
							<ThemeToggle />

							{width && width > 768 ? (
								<>
									{!user?.id ? (
										<SignInButton xPaddingClass="px-4" />
									) : (
										<AccountButton user={user} />
									)}

									{user?.id ? <DashboardButton /> : <GetStartedButton />}
								</>
							) : (
								<Popover.Root>
									<Popover.Trigger>
										<button
											type="button"
											aria-label="Hamburger Menu"
											className="hamburger-button"
										>
											<HamburgerIcon />
										</button>
									</Popover.Trigger>
									<Popover.Content className="flex flex-col space-y-6">
										{!user?.id ? (
											<SignInButton xPaddingClass="px-8" />
										) : (
											<AccountButton user={user} />
										)}

										{user?.id ? <DashboardButton /> : <GetStartedButton />}
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
