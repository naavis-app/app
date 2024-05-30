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
import getConfig from "next/config";
interface AccountButtonProps {
    user: DatabaseUserAttributes;
}

export default function AccountButton({ user }: AccountButtonProps) {
    const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

    return (
        <>
            <Popover.Root>
                <Popover.Trigger>
                    <div>
                        <Avatar
                            size="3"
                            src={user.profile_pic || 
                                "https://i.imgur.com/NgKWNj3.jpg" } // when the user has yet to upload a profile picture
                            radius="full"
                            fallback={'A'}
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
                                <Button variant={"surface"}>Log Out</Button>
                            </Link>
                        </Box>
                    </Flex>
                </Popover.Content>
            </Popover.Root>
        </>
    );
}

interface DatabaseUserAttributes {
    id?: string,
    username?: string,
    profile_pic?: string,
}