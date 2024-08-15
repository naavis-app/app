"use client";

// edit device dialog

import { Button } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from "@radix-ui/react-dialog";
import { RxPencil1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import { deviceTypes } from "./AddDeviceDialog";
import { api } from "~/trpc/react";
import { themeAtom } from "~/server/lib/stores";
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
    const [startingEdit] = useState<boolean>(false);

    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("1");

    const [dialogStyle, setDialogStyle] = useState("");
    const [dialogTextStyle, setDialogTextStyle] = useState("");
    const [dialogButtonStyle, setDialogButtonStyle] = useState("");
    const [theme] = useAtom(themeAtom);

    const [nameToggle, setNameToggle] = useState<boolean>(false);

    const { mutate, error } = api.device.read.useMutation({
        onSuccess: (device) => {
            setDeviceName(device.name);
            setDeviceType(device.type);
            setDialogOpen(true);
        },
        onError: () => {
            toast.error("Failed to get device!");

            setDeviceName(deviceName);
            setDeviceType(deviceType);
        },
    });

    useEffect(() => {
        if (theme === "light") {
            setDialogStyle(
                "border-light-dialog-border bg-light-dialog-bg text-light-dialog-text",
            );
            setDialogTextStyle(
                "border-light-dialog-text-border bg-light-dialog-text-bg text-light-dialog-text",
            );
            setDialogButtonStyle(
                "text-light-txt-only-button hover:bg-light-txt-button-hover",
            );
        } else if (theme === "dark") {
            setDialogStyle("border-dark-dialog-border bg-dark-dialog-bg");
            setDialogTextStyle(
                "border-dark-dialog-text-border bg-dark-dialog-text-bg text-white",
            );
            setDialogButtonStyle(
                "text-dark-txt-only-button hover:bg-dark-txt-button-hover",
            );
        }
    }, [theme]);

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
            <Dialog.Trigger asChild onClick={() => readDevice()}>
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
                <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60" />
                <Dialog.Content
                    className="fixed inset-0 z-50 flex items-center 
                justify-center p-4"
                >
                    <div
                        className={`min-w-[24rem] rounded-lg
                    border ${dialogStyle} p-2 shadow`}
                    >
                        <div className="flex flex-col gap-2 p-2">
                            <div className={"text-xl font-bold"}>
                                Edit Your Device
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className={"text-md"}>Device Name</label>
                                <div
                                    className="relative flex w-full flex-row
                                items-center justify-end"
                                >
                                    <input
                                        type="text"
                                        value={deviceName}
                                        placeholder="Name of Your Device"
                                        onChange={(e) =>
                                            setDeviceName(e.target.value)
                                        }
                                        required
                                        disabled={!nameToggle}
                                        className={`w-full rounded-lg 
                                        border ${dialogTextStyle} p-2 pr-10
                                        focus:border-transparent
                                        focus:outline-none
                                        focus:ring-2 focus:ring-blue-500
                                        ${!nameToggle
            ? `${theme === "light"
                ? "text-light-disabled-text"
                : "text-dark-disabled-text"
            }`
            : `${theme === "light" ? "text-black" : "text-white"}`
        }`}
                                    />
                                    <button
                                        className="absolute right-4"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setNameToggle(!nameToggle);
                                        }}
                                    >
                                        {!nameToggle && <RxPencil1 />}
                                        {nameToggle && <FaCheck />}
                                    </button>
                                </div>
                                <label className={"text-md"}>Device Type</label>

                                <select
                                    onChange={(e) =>
                                        setDeviceType(e.target.value)
                                    }
                                    value={deviceType}
                                    className={`rounded-lg
                                    border ${dialogTextStyle} p-2 focus:border-transparent 
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-500`}
                                >
                                    {deviceTypes.map((type, index) => (
                                        <option key={index} value={type.id}>
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
                                    className={`
                                rounded
                                bg-transparent px-4
                                py-1 ${dialogButtonStyle}`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={editDevice}
                                    disabled={editingDevice}
                                    className="rounded bg-reg-button-bg
                                px-4 py-1 text-white hover:bg-blue-700 
                                disabled:bg-blue-500"
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

/* edit device dialog. inputs for text that toggle, dynamic updating
of name/type based on existing device. */
