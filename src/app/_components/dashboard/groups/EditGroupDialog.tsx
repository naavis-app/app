"use client";

import { Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "~/trpc/react";
import { RxPencil1 } from "react-icons/rx";

export default function EditGroupDialog() {
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
                <div className="flex h-full items-center gap-2">
                    <RxPencil1 />
                    Edit Group
                </div>
            </Dialog.Trigger>
        </Dialog.Root>
    );
}

/* UNFINISHED. DO NOT EDIT */
