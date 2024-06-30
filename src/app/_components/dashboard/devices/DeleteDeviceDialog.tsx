"use client";

import { Button, Card, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from "@radix-ui/react-dialog";
import EditableInput from "../../edit-account/EditInput";
import { FiTrash2 } from "react-icons/fi";

import { api } from "~/trpc/react";

export default function DeleteDeviceDialog() {
    const [user, setUser] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [addingDevice, setAddingDevice] = useState<boolean>(false);

    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("1");

    const deviceQuery = api.device.list.useQuery({
        userId: user?.id || "",
    });

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild onClick={() => setDialogOpen(!dialogOpen)}>
                <Button variant="ghost" color="red"
                className="flex h-full items-center gap-2">
                    <FiTrash2 />
                </Button>
            </Dialog.Trigger>
        </Dialog.Root>
    );
}

/* UNFINISHED. DO NOT EDIT */
