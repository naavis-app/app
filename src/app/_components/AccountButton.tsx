"use client";

import { Avatar, Card, Flex, Box, Text, Popover, Button } from "@radix-ui/themes";
import { DatabaseUser, User } from "lucia";
import { signOut } from "~/server/lib/auth";

interface AccountButtonProps {
	user: User;
}

export default function AccountButton({ user }: AccountButtonProps) {
	return (
		<>
			<Popover.Root>
				<Popover.Trigger>
					<Avatar
						size="3"
						src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
						radius="full"
						fallback={"A"}
						className="shadow-md hover:cursor-pointer"
					/>
				</Popover.Trigger>
				<Popover.Content sideOffset={5} alignOffset={5}>
					<Flex gap={"4"} direction="column">
						<Text className="text-lg font-bold">{user.username}</Text>
						<Text className="text-sm text-gray-500">{user.id}</Text>
						<Box className="flex justify-end">
							<Button variant={"surface"} onClick={() => signOut()}>
								Sign out
							</Button>
						</Box>
					</Flex>
				</Popover.Content>
			</Popover.Root>
		</>
	);
}