"use client";

import { Button, Flex, Text, Dialog, TextField, Select } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import React from "react";

export const deviceTypes = [
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
    const [user] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [addingDevice, setAddingDevice] = useState<boolean>(false);

    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("phone");

    const createDevice = api.device.create.useMutation({
        onSuccess: (device) => {
            refetch();

            toast.success(`${device.name} has been added!`);
            setDeviceName("");
            setDeviceType("phone");

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
            <Dialog.Trigger onClick={() => setDialogOpen(!dialogOpen)}>
                <Button
                    variant="solid"
                >
                    New Device
                </Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth={"400px"}>
                <Dialog.Title>
                    Add A New Device
                </Dialog.Title>

                <Flex direction={"column"} gap={"2"}>
                    <Text size={"3"}>
                        Device Name
                    </Text>
                    <TextField.Root
                        value={deviceName}
                        placeholder="Your device name..."
                        onChange={(e) => 
                            setDeviceName(e.target.value)
                        }
                        required
                        className="w-full"
                    />
                    <Text size={"3"}>
                        Device Type
                    </Text>
                    <Select.Root
                        onValueChange={(e) => 
                            setDeviceType(e)
                        }
                    >
                        <Select.Trigger
                            variant="surface"
                            className="z-10"
                            value={deviceType || "Phone"}
                        >
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Group>

                                {deviceTypes.map((type, i) => (
                                    <Select.Item value={type.id} 
                                        key={i}>
                                        {type.name}
                                    </Select.Item>
                                ))}
                            </Select.Group>
                        </Select.Content>
                    </Select.Root>
                    <div
                        className="
                    mt-2 flex items-center
                    justify-between"
                    >
                        <Button
                            onClick={() => setDialogOpen(false)}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={newDevice}
                            disabled={addingDevice}
                            variant="solid"
                        >
                            Add Device
                        </Button>
                    </div>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
