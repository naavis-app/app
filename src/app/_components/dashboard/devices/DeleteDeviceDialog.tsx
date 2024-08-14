/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from "@radix-ui/react-dialog";
import EditableInput from "../../edit-account/EditInput";
import { FiTrash2 } from "react-icons/fi";
import React from "react";
import { themeAtom } from "~/server/lib/stores";

import { api } from "~/trpc/react";

export default function DeleteDeviceDialog() {
    const [user] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [deletingDevice, setDeletingDevice] = useState<boolean>(false);

    const [theme] = useAtom(themeAtom);

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
