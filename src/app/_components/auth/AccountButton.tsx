// button that allows a user to see their account username/userid

"use client";

import { Avatar, Button, Flex, Popover, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import type { DatabaseUserAttributes } from "~/server/lib/lucia";

interface AccountButtonProps {
	user: DatabaseUserAttributes;
}

export default function AccountButton({ user }: AccountButtonProps) {
	// const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

	return (
		<>
			<Popover.Root>
				<Popover.Trigger>
					<div>
						<Avatar
							size="3"
							src={user.profile_pic || "https://i.imgur.com/NgKWNj3.jpg"} // when the user has yet to upload a profile picture
							radius="full"
							fallback={"A"}
							className={
								"border-2 border-blue-500 p-[2px] shadow-md hover:cursor-pointer"
							}
						/>
					</div>
				</Popover.Trigger>
				<Popover.Content sideOffset={5} alignOffset={5}>
					<Flex gap={"4"} direction="column">
						<Text className="text-lg font-bold">
							{user.firstname} {user.lastname}
						</Text>
						<Text className="text-md">{user.username}</Text>
						{/* <Text className="text-sm text-gray-500">{user.id}</Text> */}
						<div className="flex flex-row justify-end gap-2">
							<Link href="/dashboard/settings">
								<Button variant={"surface"}>Edit Profile</Button>
							</Link>
							<Link href="/logout">
								<Button variant={"solid"}>Log Out</Button>
							</Link>
						</div>
					</Flex>
				</Popover.Content>
			</Popover.Root>
		</>
	);
}
