"use client";

import React, { useEffect, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import {
    ArrowLeftIcon,
    AvatarIcon,
    ButtonIcon,
    CardStackIcon,
    CaretDownIcon,
    CaretLeftIcon,
    Component1Icon,
    CubeIcon,
    DoubleArrowLeftIcon,
    ExitIcon,
    GearIcon,
    GlobeIcon,
    HomeIcon,
    PinLeftIcon,
    PinRightIcon,
    SewingPinIcon,
} from "@radix-ui/react-icons";
import { FaHome, FaMapMarkedAlt } from "react-icons/fa";
import { FaUserGroup, FaCaretLeft } from "react-icons/fa6";
import { MdDevices } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

import { clsx } from "clsx";
import {
    Avatar,
    Box,
    Button,
    Card,
    DropdownMenu,
    Flex,
    IconButton,
    Text,
} from "@radix-ui/themes";

import { useAtom } from "jotai";
import { sidenavOpenAtom, userAtom } from "~/server/lib/stores";
import SideNavItem from "./SideNavItem";
import ThemeToggle from "../ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import useWindowSize from "~/app/hooks/useWindowSize";

export default function SideNav() {
    const [user] = useAtom(userAtom);
    const [sidenavOpen, setOpen] = useAtom(sidenavOpenAtom);
    const [togglerVisible, setTogglerVisible] = useState(true);
    const { width, height } = useWindowSize();

    useEffect(() => {
        if (width! < 1024) {
            setOpen(false);
            setTogglerVisible(false);
        } else if (width! >= 1024) {
            setOpen(true);
            setTogglerVisible(true);
        }

        if (width! > 1440) {
            setTogglerVisible(false);
        }
    }, [width]);
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
                        className="relative p-4 pb-0"
                        justify={"center"}
                    >
                        <div className="flex flex-row gap-2">
                            <Text>⛵️</Text>
                            <motion.div
                                animate={{
                                    opacity: sidenavOpen ? 1 : 0,
                                    x: sidenavOpen ? 0 : 20,
                                }}
                            >
                                <Text>WHEEEE</Text>
                            </motion.div>
                        </div>

                        <Flex
                            className="absolute w-full p-4"
                            direction={"row"}
                            justify={"end"}
                        >
                            <motion.div
                                className="!-mr-4"
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
                                        <FaCaretLeft
                                            height={"1.4rem"}
                                            width={"1.4em"}
                                        />
                                    </Button>
                                ) : null}
                            </motion.div>
                        </Flex>
                    </Flex>

                    <Flex direction={"column"} gap={"2"} className="p-4">
                        <AnimatePresence>
                            {sidenavOpen && (
                                <Card>
                                    <Flex
                                        direction={"row"}
                                        align={"center"}
                                        gap={"2"}
                                    >
                                        {user ? (
                                            <Avatar
                                                size="3"
                                                src={user.profile_pic!}
                                                radius="full"
                                                fallback={"A"}
                                                className="shadow-md"
                                            />
                                        ) : (
                                            <></>
                                        )}
                                        <Flex direction={"column"}>
                                            <Text weight={"bold"}>
                                                {user
                                                    ? user.firstname +
                                                      " " +
                                                      user.lastname
                                                    : "NO USER"}
                                            </Text>
                                            <Text>
                                                {user
                                                    ? user.username
                                                    : "NO USER"}
                                            </Text>
                                            {/* <Text>{user ? user.id : "NO USER"}</Text> */}
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
                                        src={user?.profile_pic!}
                                        radius="full"
                                        fallback={"A"}
                                        className="shadow-md"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <SideNavItem
                            icon={<FaHome />}
                            url={"/dashboard"}
                            label={"Home"}
                        />
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
                    </Flex>

                    <div className="h-[1px] w-full bg-[--accent-4]"></div>

                    <Flex direction={"column"} gap={"2"} className="p-4">
                        <SideNavItem
                            icon={<IoSettingsSharp />}
                            url={"/dashboard/settings"}
                            label={"Settings"}
                        />
                        <SideNavItem
                            icon={<TbLogout />}
                            url={"/logout"}
                            label={"Logout"}
                        />
                        <ThemeToggle />
                    </Flex>
                </Flex>
            </motion.div>
        </>
    );
}
