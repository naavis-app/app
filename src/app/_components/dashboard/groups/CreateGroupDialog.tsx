"use client";

import { Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { FormEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "~/trpc/react";

export default function CreateGroupDialog({
    refetch,
}: {
    refetch: () => void;
}) {
    const [user, setUser] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [addingGroup, setAddingGroup] = useState(false);

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const createGroup = api.group.create.useMutation({
        onSuccess: (group) => {
            refetch();

            toast.success(`${group.name} has been created!`);
            setGroupName("");
            setGroupDescription("");

            setAddingGroup(false);
            setDialogOpen(false);
        },
        onError: () => {
            toast.error(`Failed to create ${groupName}`);

            setAddingGroup(false);
            setDialogOpen(false);
        },
    });

    const newGroup = () => {
        if (addingGroup) return;
        if (!user)
            return toast.error("You must be logged in to create a group");

        setAddingGroup(true);

        createGroup.mutate({
            name: groupName,
            description: groupDescription,
            ownerId: user.id,
        });
    };

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild onClick={() => setDialogOpen(!dialogOpen)}>
                <Button variant={"solid"}>Create Group</Button>
            </Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 z-40 bg-black/20" />
                <Dialog.Content
                    className="DialogContent
                fixed inset-0 z-50 flex items-center 
                justify-center p-4"
                >
                    <div
                        className="bg-[#141B30] min-w-[24rem]
                    rounded-lg shadow p-2 border border-[#293040]"
                    >
                        <div className="flex flex-col gap-2 p-2">
                            <div className="text-xl font-bold">
                                Create A New Group
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
                                <label className="text-md">Description</label>
                            </div>
                            <input
                                    type="text"
                                    placeholder="Your group's description..."
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
                                    onClick={newGroup}
                                    disabled={addingGroup}
                                    className="rounded bg-[#3e63de] 
                                px-4 py-1 text-white hover:bg-blue-700 
                                disabled:bg-blue-300"
                                >
                                    Create Group
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
        </Dialog.Root>
    );
}
