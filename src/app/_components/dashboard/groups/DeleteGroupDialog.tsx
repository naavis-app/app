/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "~/trpc/react";
import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function DeleteGroupDialog() {
    const [user, setUser] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [addingDevice, setAddingDevice] = useState(false);

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const groupQuery = api.device.list.useQuery({
        userId: user?.id || "",
    });

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild onClick={() => setDialogOpen(!dialogOpen)}>
                <Button
                    variant="ghost"
                    color="red"
                    className="flex h-full items-center gap-2"
                >
                    <FiTrash2 />
                </Button>
            </Dialog.Trigger>
        </Dialog.Root>
    );
}

/* UNFINISHED. DO NOT EDIT */
