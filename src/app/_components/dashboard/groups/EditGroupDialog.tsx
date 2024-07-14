"use client";

// edit group dialog

import { Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "~/trpc/react";
import { RxPencil1 } from "react-icons/rx";

interface EditGroupProps {
    refetch: () => void,
    groupId: string,
}

export default function EditGroupDialog({ 
    refetch, groupId
 } : EditGroupProps) {
    const [user, setUser] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState(false);

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const groupQuery = api.group.update.useMutation({
        onSuccess: (device) => {
            refetch();

            toast.success(`Group has been updated!`);
            setGroupName("");
            setGroupDescription("");

            setEditingGroup(false);
            setDialogOpen(false);
        },
        onError: () => {
            toast.error(`Failed to updated ${groupName}`);

            setEditingGroup(false);
            setDialogOpen(false);
        }
    })

    const editGroup = () => {
        if (editingGroup) return;
        if (!user) {
            setDialogOpen(false);
            return toast.error("You must be logged in to edit a group!");
        }
        if (!groupName.length) {
            setDialogOpen(false);
            return toast.error("You must enter a name!");
        }
        if (!groupDescription) {
            setDialogOpen(false);
            return toast.error("You must enter a description!");
        }

        setEditingGroup(true);

        groupQuery.mutate({
            id: groupId,
            name: groupName,
            description: groupDescription,
        })
    };

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild onClick={() => setDialogOpen(!dialogOpen)}>
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
                className="fixed inset-0 z-40 bg-black/60"/>
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
                                Edit Your Group
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-md">Group Name</label>
                                <input
                                    type="text"
                                    placeholder="Name of Your Device"
                                    onChange={(e) =>
                                        setGroupName(e.target.value)
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
                                <label className="text-md">Group Description</label>
                            </div>
                            <input
                                    type="text"
                                    placeholder="Your Group Description"
                                    onChange={(e) =>
                                        setGroupDescription(e.target.value)
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
                                    onClick={editGroup}
                                    disabled={editingGroup}
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
