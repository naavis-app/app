"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons"
import { Button, Card, DropdownMenu, Flex, Select, Text, TextField } from "@radix-ui/themes"
import { useAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from '@radix-ui/react-dialog';


const deviceTypes = [{
	name: "Phone",
	id: 'phone'
}, {
	name: "Tablet",
	id: 'tablet'
}, {
	name: "Laptop",
	id: 'laptop'
}, {
	name: "Smartwatch",
	id: 'smartwatch'
}];

import { api } from "~/trpc/react";

export default function AddDeviceDialog() {
	const [user, setUser] = useAtom(userAtom);
	const [addingDevice, setAddingDevice] = useState(false);

	const [deviceName, setDeviceName] = useState("");
	const [deviceType, setDeviceType] = useState("1");

	const createDevice = api.device.create.useMutation({
		onSuccess: () => {
			toast.success("Device has been added!");
			setDeviceName("");
			setDeviceType("");
			setAddingDevice(false);
		},
		onError: () => {
			toast.error("Failed to add device");
			setAddingDevice(false);
		},
	});

	const newDevice = () => {
		if (addingDevice) return;
		if (!user) return toast.error("You must be logged in to add a device");

		setAddingDevice(true);

		createDevice.mutate({
			name: deviceName,
			type: deviceType as 'phone' | 'tablet' | 'laptop' | 'smartwatch',
			userId: user.id
		});
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>
				<Button variant={"solid"}>
					<PlusCircledIcon />New Device
				</Button>
			</Dialog.Trigger>

			<Dialog.Overlay className="fixed inset-0 bg-black/60 blur-sm z-40" />
			<Dialog.Content className="fixed inset-0 flex justify-center items-center z-50">
				<Card variant="surface" className="min-w-[24rem]">
					<Flex direction={"column"} className="p-2" gap={"2"}>
						<Text size={"5"} weight={"bold"}>
							Add a new device
						</Text>

						<Flex direction={"column"} gap={"2"}>
							<Text size={"3"}>Device Name</Text>
							<TextField.Root placeholder="Device Name" onChange={(e) => setDeviceName(e.target.value)} />

							<Text size={"3"}>Device Type</Text>
							<Select.Root onValueChange={(e) => setDeviceType(e)}>
								<Select.Trigger

									variant="surface"

									className="z-10"
								/>
								<Select.Content>
									<Select.Group>
										{deviceTypes.map((type) => (
											<Select.Item value={type.id}>{type.name}</Select.Item>
										))}
									</Select.Group>
								</Select.Content>
							</Select.Root>

						</Flex>

						<Flex direction={"row"} className="mt-2" justify={"between"} align={"center"}>
							<Dialog.Close asChild>
								<Button variant="ghost">
									Cancel
								</Button>
							</Dialog.Close>

							<Button variant={"solid"} onClick={newDevice} disabled={addingDevice}>
								Add Device
							</Button>
						</Flex>

					</Flex>
				</Card>
			</Dialog.Content>
		</Dialog.Root>
	)
}