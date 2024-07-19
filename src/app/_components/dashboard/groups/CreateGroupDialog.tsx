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
        if (!user) return toast.error("You must be logged in to add a device!");
        if (!groupName.length) return toast.error("You must enter a name!");
        if (!user)
            return toast.error("You must be logged in to create a group");

        setAddingGroup(true);

        createGroup.mutate({
            name: groupName,
            description: groupDescription,
            ownerId: user.id,
        });
    };

    const dialogStyle = "border-dark-dialog-border bg-dark-dialog-bg";
    const dialogTextStyle = "border-dialog-text-border bg-dialog-text-bg ";
    // bg-[#d0d0d1] 
    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild onClick={() => setDialogOpen(!dialogOpen)}>
                <Button variant={"solid"}>Create Group</Button>
            </Dialog.Trigger>
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
                        <div className="text-xl font-bold">
                            Create A New Group
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-md">Group Name</label>
                            <input
                                type="text"
                                placeholder="Name of Your Device"
                                onChange={(e) => setGroupName(e.target.value)}
                                required
                                className={`rounded-lg border ${dialogTextStyle} p-2 
                                    focus:border-transparent
                                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                            <label className="text-md">Description</label>
                        </div>
                        <input
                            type="text"
                            placeholder="Your group's description..."
                            onChange={(e) => setGroupDescription(e.target.value)}
                            required
                            className={`rounded-lg border ${dialogTextStyle} p-2 
                                    focus:border-transparent
                                    focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                                py-1 text-txt-only-button
                                hover:bg-txt-button-hover"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={newGroup}
                                disabled={addingGroup}
                                className="rounded bg-reg-button-bg
                                px-4 py-1 text-white hover:bg-blue-700 
                                disabled:bg-blue-500"
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
