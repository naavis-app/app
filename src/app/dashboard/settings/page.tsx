"use client";

// import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button, Card, Flex, Text } from "@radix-ui/themes";
import React from "react";
import EditAccount from "~/app/_components/dashboard/EditAccount";
import EditPassword from "~/app/_components/dashboard/EditPassword";

// type Inputs = {
//     username: string;
//     firstname: string;
//     lastname: string;
// };

export default function DashboardDevices() {
	return (
		<>
			<Flex direction={"column"} className="max-w-xl">
				<Card size={"3"}>
					<Flex direction={"column"}>
						<Text size={"8"} weight={"bold"}>
							Profile
						</Text>
						<Text size={"4"} className="mb-4">
							Update your profile information.
						</Text>

						<EditAccount />
					</Flex>
				</Card>

				<Card className="mt-4" size={"3"}>
					<Flex direction={"column"}>
						<Text size={"8"} weight={"bold"}>
							Password
						</Text>
						<Text size={"4"} className="mb-4">
							Update your password.
						</Text>

						<EditPassword />
					</Flex>
				</Card>

				<Card className="mt-4" size={"3"}>
					<Flex direction={"column"}>
						<Text size={"8"} weight={"bold"}>
							Devices
						</Text>
						<Text size={"4"}>Manage your device settings.</Text>

						<Flex direction={"row"} justify={"between"} className="mt-4">
							<Button variant="outline">Add device</Button>
							<Button>Save changes</Button>
						</Flex>
					</Flex>
				</Card>

				<Card className="mt-4" size={"3"}>
					<Flex direction={"column"}>
						<Text size={"8"} weight={"bold"}>
							Emergency Contacts
						</Text>
						<Text size={"4"}>Manage your emergency contacts.</Text>

						<Flex direction={"row"} justify={"between"} className="mt-4">
							<Button variant="outline">Add contact</Button>
							<Button>Save changes</Button>
						</Flex>
					</Flex>
				</Card>
			</Flex>
		</>
	);
}
