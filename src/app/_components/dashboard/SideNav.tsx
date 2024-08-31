"use client";

import React, { useEffect, useState } from "react";
// import classNames from "classnames";
import { FaHome, FaMapMarkedAlt } from "react-icons/fa";
import { FaCaretLeft, FaUserGroup } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import { MdDevices } from "react-icons/md";
import { TbLogout } from "react-icons/tb";

import { Avatar, Button, Card, Flex, Skeleton, Text } from "@radix-ui/themes";

import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import Link from "next/link";
import useWindowSize from "~/app/hooks/useWindowSize";
import { sidenavOpenAtom, userAtom } from "~/server/lib/stores";
import ThemeToggle from "../ThemeToggle";
import SideNavItem from "./SideNavItem";
import GroupSelector from "./groups/GroupSelector/GroupSelector";

export default function SideNav() {
	const [user] = useAtom(userAtom);
	const [sidenavOpen, setOpen] = useAtom(sidenavOpenAtom);
	const [togglerVisible, setTogglerVisible] = useState(true);
	const { width } = useWindowSize();

	useEffect(() => {
		if (width < 1024) {
			setOpen(false);
			setTogglerVisible(false);
		} else if (width >= 1024) {
			setOpen(true);
			setTogglerVisible(true);
		}

		if (width > 1440) {
			setTogglerVisible(false);
		}
	}, [width, setOpen]);
	/* 
    ^^^changes when the navbar is open and closed based on size
    also toggles if the button is visible or not.
    on small screens and very large screens, you cannot use the button
    (as keeping the navbar open is super ugly on small screens.
    keeping it closed also makes the page look very empty on super
    large screens)
    */

	// same thing below for the user id (check AccountButton.tsx).
	// can be commented out for debugging
	return (
		<>
			<motion.div
				animate={{
					width: sidenavOpen ? "350px" : "80px",
				}}
				className="box-border"
			>
				<Flex
					direction={"column"}
					style={{
						height: "100%",
					}}
					className="h-full w-full bg-[--color-panel] shadow-md"
				>
					<Flex
						direction={"column"}
						height={"5rem"}
						className="relative p-4 pb-0 "
						justify={"center"}
					>
						<Link className="!z-50 flex w-fit flex-row gap-2" href="/">
							<Text>⛵️</Text>
							<motion.div
								animate={{
									opacity: sidenavOpen ? 1 : 0,
									x: sidenavOpen ? 0 : 20,
								}}
							>
								<Text>Naavis</Text>
							</motion.div>
						</Link>

						{/* Sidebar Toggle Button */}
						<Flex
							className="absolute w-full p-4"
							direction={"row"}
							justify={"end"}
						>
							<motion.div
								className="!z-[100] !-mr-4"
								animate={{
									rotate: sidenavOpen ? 0 : 180,
								}}
							>
								{togglerVisible ? (
									<Button
										className="!h-[2rem] !w-[2rem] !p-0"
										radius={"full"}
										onClick={() => setOpen(!sidenavOpen)}
									>
										<FaCaretLeft height={"1.4rem"} width={"1.4em"} />
									</Button>
								) : null}
							</motion.div>
						</Flex>
					</Flex>

					<Flex direction={"column"} gap={"2"} className="p-4">
						<AnimatePresence>
							{sidenavOpen && (
								<Card>
									<Flex direction={"row"} align={"center"} gap={"2"}>
										<Skeleton loading={!user}>
											<Avatar
												size="3"
												src={user?.profile_pic || ""}
												radius="full"
												fallback={"A"}
												className="shadow-md"
											/>
										</Skeleton>
										<Flex direction={"column"} className="w-[12rem]">
											<Skeleton loading={!user}>
												<Text weight={"bold"}>
													{user?.firstname || `${user?.lastname}` || ""}
												</Text>
											</Skeleton>
											<Skeleton loading={!user} className="mt-1">
												<Text>{user?.username || "x"}</Text>
											</Skeleton>
										</Flex>
									</Flex>
								</Card>
							)}
							{!sidenavOpen && (
								<motion.div
									transition={{ duration: 0.2 }}
									animate={{
										opacity: sidenavOpen ? 0 : 1,
										x: sidenavOpen ? -20 : 0,
									}}
									className="flex items-center justify-center pb-2"
								>
									<Avatar
										size="3"
										src={user?.profile_pic || ""}
										radius="full"
										fallback={"A"}
										className="shadow-md"
									/>
								</motion.div>
							)}
						</AnimatePresence>

						<GroupSelector />

						<SideNavItem icon={<FaHome />} url={"/dashboard"} label={"Home"} />
						<SideNavItem
							icon={<FaMapMarkedAlt />}
							url={"/dashboard/map"}
							label={"Map"}
						/>
						<SideNavItem
							icon={<FaUserGroup />}
							url={"/dashboard/groups"}
							label={"Groups"}
						/>
						<SideNavItem
							icon={<MdDevices />}
							url={"/dashboard/devices"}
							label={"Devices"}
						/>
						<SideNavItem
							icon={<FaLocationDot />}
							url="/dashboard/places"
							label="Places"
						/>
					</Flex>

					<Flex direction={"column"} gap={"2"} className="mt-auto p-4">
						<SideNavItem
							icon={<IoSettingsSharp />}
							url={"/dashboard/settings"}
							label={"Settings"}
						/>
						<SideNavItem icon={<TbLogout />} url={"/logout"} label={"Logout"} />
						<ThemeToggle />
					</Flex>
				</Flex>
			</motion.div>
		</>
	);
}
