"use client";

import React, { useState } from "react";
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
import { userAtom } from "~/server/lib/stores";
import SideNavItem from "./SideNavItem";
import ThemeToggle from "../ThemeToggle";
import { motion } from "framer-motion";


export default function SideNav() {
    const [user] = useAtom(userAtom);
    const [open, setOpen] = useState(true);

    // same thing below for the user id (check AccountButton.tsx).
    // can be commented out for debugging
    return (
        <>
            <motion.div
            animate={{
                width: open ? "350px" : "80px",
            }}
            className="box-border w-full max-w-[300px]">
                <Flex
                    direction={"column"}
                    style={{
                        height: "100%",
                        padding: "2",
                    }}
                    className="bg-[--color-panel] shadow-md h-full w-full"
                >
                    <Flex direction={"column"} height={"5rem"} className="p-4 pb-0 relative" justify={"center"}>
                        <Text>
                            ⛵️ WHEEEE
                        </Text>


                        <Flex className="p-4 w-full absolute" direction={"row"} justify={"end"}>
                            <motion.div
                                className="!-mr-4"
                                animate={{
                                    rotate: open ? 180 : 0
                                }}>
                                <Button className="!w-[2rem] !h-[2rem] !p-0" radius={"full"} onClick={() => setOpen(!open)}>
                                    <CaretLeftIcon height={"1.4rem"} width={"1.4em"} />
                                </Button>
                            </motion.div>
                        </Flex>
                    </Flex>


                    <Flex direction={"column"} gap={"2"} className="p-4">
                        <Card className="">
                            <Flex direction={"row"} align={"center"} gap={"2"}>
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
                                        {user ? user.username : "NO USER"}
                                    </Text>
                                    {/* <Text>{user ? user.id : "NO USER"}</Text> */}
                                </Flex>
                            </Flex>
                        </Card>

                        <SideNavItem
                            icon={<HomeIcon />}
                            url={"/dashboard"}
                            label={"Home"}
                        />
                        <SideNavItem
                            icon={<GlobeIcon />}
                            url={"/dashboard/map"}
                            label={"Map"}
                        />
                        <SideNavItem
                            icon={<Component1Icon />}
                            url={"/dashboard/groups"}
                            label={"Groups"}
                        />
                        <SideNavItem
                            icon={<CubeIcon />}
                            url={"/dashboard/devices"}
                            label={"Devices"}
                        />
                    </Flex>

                    <div className="h-[1px] w-full bg-[--accent-4]"></div>

                    <Flex direction={"column"} gap={"2"} className="p-4">
                        <SideNavItem
                            icon={<GearIcon />}
                            url={"/dashboard/settings"}
                            label={"Settings"}
                        />
                        <SideNavItem
                            icon={<ExitIcon />}
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
