"use client";

import { Button, Flex, Text, TextField, Dialog } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import { api } from "~/trpc/react";
import React from "react";

export default function CreateGroupDialog({
    refetch,
}: {
    refetch: () => void;
}) {
    const [user] = useAtom(userAtom);

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
        if (!user) return toast.error("You must be logged in to add a group!");
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

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger onClick={() => setDialogOpen(!dialogOpen)}>
                <Button variant="solid">New Group</Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth={"400px"}>
                <Dialog.Title>Add A New Group</Dialog.Title>

                <Flex direction={"column"} gap={"2"}>
                    <Text size={"3"}>Group Name</Text>
                    <TextField.Root
                        value={groupName}
                        placeholder="Your group name..."
                        onChange={(e) => setGroupName(e.target.value)}
                        required
                        className="w-full"
                    />
                    <Text size={"3"}>Group Description</Text>
                    <TextField.Root
                        value={groupDescription}
                        placeholder="Your group description..."
                        onChange={(e) => setGroupDescription(e.target.value)}
                        required
                        className="w-full"
                    />
                    <div
                        className="
                    mt-2 flex items-center
                    justify-between"
                    >
                        <Button
                            onClick={() => setDialogOpen(false)}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={newGroup}
                            disabled={addingGroup}
                            variant="solid"
                        >
                            Add Group
                        </Button>
                    </div>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
