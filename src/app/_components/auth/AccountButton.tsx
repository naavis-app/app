// button that allows a user to see their account username/userid

"use client";

import {
    Avatar,
    Card,
    Flex,
    Box,
    Text,
    Popover,
    Button,
} from "@radix-ui/themes";
import { DatabaseUser, User } from "lucia";
import Link from "next/link";
import { signOut } from "~/server/lib/auth";
interface AccountButtonProps {
    user: User;
}

export default function AccountButton({ user }: AccountButtonProps) {
    return (
        <>
            <Popover.Root>
                <Popover.Trigger>
                    <div>
                        <Avatar
                            size="3"
                            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                            radius="full"
                            fallback={"A"}
                            className="border-2 border-blue-400 p-[2px] shadow-md hover:cursor-pointer dark:border-red-400"
                        />
                    </div>
                </Popover.Trigger>
                <Popover.Content sideOffset={5} alignOffset={5}>
                    <Flex gap={"4"} direction="column">
                        <Text className="text-lg font-bold">
                            {user.username}
                        </Text>
                        <Text className="text-sm text-gray-500">{user.id}</Text>
                        <Box className="flex justify-end">
                            <Link href="/logout">
                                <Button
                                    variant={"surface"}
                                >
                                    Log out
                                </Button>
                            </Link>
                        </Box>
                    </Flex>
                </Popover.Content>
            </Popover.Root>
        </>
    );
}
