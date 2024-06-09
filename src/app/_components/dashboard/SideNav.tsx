"use client";

import React, { useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import classNames from "classnames";
import {
    AvatarIcon,
    ButtonIcon,
    CardStackIcon,
    CaretDownIcon,
    CubeIcon,
    ExitIcon,
    GearIcon,
    GlobeIcon,
    HomeIcon,
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

export default function SideNav() {
    const [user] = useAtom(userAtom);

    // same thing below for the user id (check AccountButton.tsx).
    // can be commented out for debugging
    return (
        <>
            <Box className="box-border w-full max-w-[300px]">
                <Flex
                    direction={"column"}
                    gap={"2"}
                    style={{
                        height: "100%",
                        justifyContent: "space-between",
                        padding: "2",
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <Card>
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
                                        {user ? user.firstname + " " + 
                                            user.lastname : "NO USER"}
                                    </Text>
                                    <Text>{user ? user.username : "NO USER"}</Text>
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
                            icon={<CubeIcon />}
                            url={"/dashboard/devices"}
                            label={"Devices"}
                        />
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
                    </div>
                </Flex>
            </Box>
        </>
    );
}
