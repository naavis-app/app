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

            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60" />
                <Dialog.Content
                    className="fixed inset-0 z-50 flex items-center 
                justify-center p-4"
                >
                    <div
                        className="bg-[#141B30] min-w-[24rem]
                    rounded-lg shadow p-2 border border-[#293040]"
                    >
                        <div className="flex flex-col gap-2 p-2">
                            <div className="text-xl font-bold">
                                Add A New Device
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-md">Device Name</label>
                                <input
                                    type="text"
                                    placeholder="Name of Your Device"
                                    onChange={(e) =>
                                        setDeviceName(e.target.value)
                                    }
                                    required
                                    className="rounded-lg border 
                                    border-[#4a5065] 
                                    bg-[#111525] p-2 
                                    focus:border-transparent
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500"
                                />
                                <label className="text-md">Device Type</label>

                                <select
                                    onChange={(e) =>
                                        setDeviceType(e.target.value)
                                    }
                                    className="rounded-lg border
                                    border-[#4a5065] p-2 
                                    focus:border-transparent 
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500"
                                >
                                    {deviceTypes.map((type) => (
                                        <option value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div
                                className="
                            mt-2 flex items-center
                            justify-between"
                            >
                                <button
                                    onClick={() => setDialogOpen(false)}
                                    className="
                                rounded
                                bg-transparent px-4
                                py-1 text-[#98abf6]
                                hover:bg-[#1A2B60]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={newDevice}
                                    disabled={addingDevice}
                                    className="rounded bg-[#3e63de] 
                                px-4 py-1 text-white hover:bg-blue-700 
                                disabled:bg-blue-300"
                                >
                                    Add Device
                                </button>
                            </div>
                        </div>
                    </div>
            </Dialog.Content>
        </Dialog.Root>
    );
}
