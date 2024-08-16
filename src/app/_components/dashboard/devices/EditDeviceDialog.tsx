"use client";

// edit device dialog
// TODO: update select so it shows current device type on open

import { Button, Flex, Dialog, Text, TextField, Select } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import { RxPencil1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { deviceTypes } from "./AddDeviceDialog";
import { api } from "~/trpc/react";
import React from "react";
interface EditDeviceProps {
    refetch: () => void;
    deviceId: string;
}

export default function EditDeviceDialog({
    refetch,
    deviceId,
}: EditDeviceProps) {
    const [user] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [editingDevice, setEditingDevice] = useState<boolean>(false);
    const [startingEdit, setStartingEdit] = useState<boolean>(false);

    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");

    const [nameToggle, setNameToggle] = useState<boolean>(false);

    const { mutate, error } = api.device.read.useMutation({
        onSuccess: (device) => {
            setDeviceName(device.name);
            setDeviceType(device.type);
            setDialogOpen(true);
            setStartingEdit(false);
        },
        onError: () => {
            toast.error("Failed to get device!");

            setDeviceName(deviceName);
            setDeviceType(deviceType);

            setDialogOpen(false);
        },
    });

    const readDevice = () => {
        mutate({ id: deviceId, userId: user!.id });
    };

    useEffect(() => {
        if (startingEdit) {
            readDevice();
        }
    }, [startingEdit]);

    if (error) {
        toast.error("Couldn't get the device!");
    }

    const deviceQuery = api.device.update.useMutation({
        onSuccess: () => {
            refetch();

            toast.success(`${deviceName} has been updated!`);
            setDeviceName("");
            setDeviceType("");

            setEditingDevice(false);
            setDialogOpen(false);
        },
        onError: () => {
            toast.error(`Failed to update ${deviceName}`);

            setEditingDevice(false);
            setDialogOpen(false);
        },
    });

    const editDevice = () => {
        setNameToggle(true);
        if (editingDevice) return;
        if (!user) {
            setDialogOpen(false);
            return toast.error("You must be logged in to edit a device!");
        }
        if (!deviceName.length) {
            setDialogOpen(false);
            return toast.error("You must enter a name!");
        }
        if (!deviceType) {
            setDialogOpen(false);
            return toast.error("You must select a device type!");
        }

        setEditingDevice(true);

        deviceQuery.mutate({
            id: deviceId,
            name: deviceName,
            type: deviceType as "phone" | "tablet" | "laptop" | "smartwatch",
            userId: user.id,
        });

        setNameToggle(false);
    };

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger onClick={() => readDevice()}>
                <Button
                    variant="ghost"
                    color="gray"
                    className="flex h-full items-center gap-2"
                    highContrast
                >
                    <RxPencil1 />
                </Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth={"400px"}>
                <Dialog.Title>
                Edit Your Group
                </Dialog.Title>

                <Flex direction={"column"} gap={"3"}>
                    <Text size={"3"}>
                                Device Name
                    </Text>
                    <div className="relative flex w-full 
                    flex-row items-center justify-end">
                        <TextField.Root
                            value={deviceName}
                            placeholder="Name of Your Device"
                            onChange={(e) => 
                                setDeviceName(e.target.value)
                            }
                            required
                            disabled={!nameToggle}
                            className="w-full"
                        />
                        <button
                            className="absolute right-4"
                            onClick={(e) => {
                                e.preventDefault();
                                setNameToggle(!nameToggle);
                            }}
                        >
                            {!nameToggle && <RxPencil1/>}
                            {nameToggle && <FaCheck/>}
                        </button>
                    </div>

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
                            onClick={editDevice}
                            disabled={editingDevice}
                            variant="solid"
                        >
                        Save
                        </Button>
                    </div>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}

/* edit device dialog. inputs for text that toggle, dynamic updating
of name/type based on existing device. */
