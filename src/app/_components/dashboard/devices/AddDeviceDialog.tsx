"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
    Button,
    Card,
    DropdownMenu,
    Flex,
    Select,
    Text,
    TextField,
} from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from "@radix-ui/react-dialog";

const deviceTypes = [
    {
        name: "Phone",
        id: "phone",
    },
    {
        name: "Tablet",
        id: "tablet",
    },
    {
        name: "Laptop",
        id: "laptop",
    },
    {
        name: "Smartwatch",
        id: "smartwatch",
    },
];

import { api } from "~/trpc/react";

export default function AddDeviceDialog({ refetch }: { refetch: () => void }) {
    const [user, setUser] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [addingDevice, setAddingDevice] = useState<boolean>(false);

    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("1");

    const createDevice = api.device.create.useMutation({
        onSuccess: (device) => {
            refetch();

            toast.success(`${device.name} has been added!`);
            setDeviceName("");
            setDeviceType("");

            setAddingDevice(false);
            setDialogOpen(false);
        },
        onError: () => {
            toast.error(`Failed to add ${deviceName}`);

            setAddingDevice(false);
            setDialogOpen(false);
        },
    });

    const newDevice = () => {
        if (addingDevice) return;
        if (!user) return toast.error("You must be logged in to add a device");
        if (!deviceName.length) return toast.error("You must enter a name!");
        if (!deviceType) return toast.error("You must select a device type!");

        setAddingDevice(true);

        createDevice.mutate({
            name: deviceName,
            type: deviceType as "phone" | "tablet" | "laptop" | "smartwatch",
            userId: user.id,
        });
    };

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild onClick={() => setDialogOpen(!dialogOpen)}>
                <Button variant={"solid"}>New Device</Button>
            </Dialog.Trigger>

            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 blur-sm" />
            <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center">
                <Card variant="surface" className="min-w-[24rem]">
                    <Flex direction={"column"} className="p-2" gap={"2"}>
                        <Text size={"5"} weight={"bold"}>
                            Add A New Device
                        </Text>

                        <Flex direction={"column"} gap={"2"}>
                            <Text size={"3"}>Device Name</Text>
                            <TextField.Root
                                placeholder="Name of Your Device"
                                onChange={(e) => setDeviceName(e.target.value)}
                                required
                            />

                            <Text size={"3"}>Device Type</Text>
                            <Select.Root
                                onValueChange={(e) => setDeviceType(e)}
                            >
                                <Select.Trigger
                                    variant="surface"
                                    className="z-10"
                                />
                                <Select.Content>
                                    <Select.Group>
                                        {deviceTypes.map((type) => (
                                            <Select.Item value={type.id}>
                                                {type.name}
                                            </Select.Item>
                                        ))}
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </Flex>

                        <Flex
                            direction={"row"}
                            className="mt-2"
                            justify={"between"}
                            align={"center"}
                        >
                            <Dialog.Close
                                asChild
                                onClick={() => setDialogOpen(false)}
                            >
                                <Button variant="ghost">Cancel</Button>
                            </Dialog.Close>

                            <Button
                                variant={"solid"}
                                onClick={newDevice}
                                disabled={addingDevice}
                            >
                                Add Device
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
            </Dialog.Content>
        </Dialog.Root>
    );
}
