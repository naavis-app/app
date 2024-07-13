"use client";

import { Button, Card, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from "@radix-ui/react-dialog";
import EditableInput from "../../edit-account/EditInput";
import { RxPencil1 } from "react-icons/rx";
import { deviceTypes } from "./AddDeviceDialog";

import { api } from "~/trpc/react";

export default function EditDeviceDialog() {
    const [user, setUser] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [editingDevice, setEditingDevice] = useState<boolean>(false);

    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("1");

    const deviceQuery = api.device.list.useQuery({
        userId: user?.id || "",
    });

    const editDevice = () => {
        if (editingDevice) return;
        if (!user)
            return toast.error("You must be logged in to edit a device!");
        if (!deviceName.length) return toast.error("You must enter a name!");
        if (!deviceType) return toast.error("You must select a device type!");

        setEditingDevice(true);
    };

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger
                asChild
                onClick={() => setDialogOpen((prevOpen) => !prevOpen)}
            >
                <Button
                    variant="ghost"
                    color="gray"
                    className="flex h-full items-center gap-2"
                    highContrast
                >
                    <RxPencil1 />
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay
                    className="DialogOverlay
                fixed inset-0 z-40 bg-black/60"
                />
                <Dialog.Content
                    className="DialogContent
                fixed inset-0 z-50 flex items-center 
                justify-center p-4"
                >
                    <div
                        className="bg-surface min-w-[24rem]
                    rounded-lg shadow"
                    >
                        <div className="flex flex-col gap-2 p-2">
                            <div className="text-xl font-bold">
                                Edit Your Device
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
                                    className="rounded-lg border border-[#4a5065] 
                                    bg-[#111525]
                                    p-2 
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
                                    border-[#4a5065] p-2 focus:border-transparent 
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
                                py-1 text-[#98abf6]"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={editDevice}
                                    disabled={editingDevice}
                                    className="rounded bg-[#3e63de] 
                                px-4 py-1 text-white hover:bg-blue-700 
                                disabled:bg-blue-300"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

/* UNFINISHED. DO NOT EDIT */
