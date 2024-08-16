"use client";

// edit group dialog

import { Button, Flex, Text, TextField, Dialog } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
// import * as Dialog from "@radix-ui/react-dialog";
import { api } from "~/trpc/react";
import { RxPencil1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";
import React from "react";

interface EditGroupProps {
    refetch: () => void;
    groupId: string;
}

export default function EditGroupDialog({ refetch, groupId }: EditGroupProps) {
    const [user] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState(false);
    const [startingEdit] = useState<boolean>(false);

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const [nameToggle, setNameToggle] = useState<boolean>(false);
    const [descToggle, setDescToggle] = useState<boolean>(false);

    const { mutate, error } = api.group.read.useMutation({
        onSuccess: (group) => {
            setGroupName(group.name);
            setGroupDescription(group.description || "");
            setDialogOpen(true);
        },
        onError: () => {
            toast.error("Failed to get group!");

            setGroupName(groupName);
            setGroupDescription(groupDescription);
        },
    });

    const readGroup = () => {
        mutate({ id: groupId, userId: user!.id });
    };

    useEffect(() => {
        if (startingEdit) {
            readGroup();
        }
    }, [startingEdit]);

    if (error) {
        toast.error("Couldn't get the group!");
    }

    const groupQuery = api.group.update.useMutation({
        onSuccess: (group) => {
            refetch();

            toast.success(`${group.name} has been updated!`);
            setGroupName("");
            setGroupDescription("");

            setEditingGroup(false);
            setDialogOpen(false);
        },
        onError: () => {
            toast.error(`Failed to updated ${groupName}`);

            setEditingGroup(false);
            setDialogOpen(false);
        },
    });

    const editGroup = () => {
        setNameToggle(true);
        setDescToggle(true);
        if (editingGroup) return;
        if (!user) {
            setDialogOpen(false);
            return toast.error("You must be logged in to edit a group!");
        }
        if (!groupName.length) {
            setDialogOpen(false);
            return toast.error("You must enter a name!");
        }

        setEditingGroup(true);

        groupQuery.mutate({
            id: groupId,
            name: groupName,
            description: groupDescription,
            userId: user.id,
        });

        setNameToggle(false);
        setDescToggle(false);
    };

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger onClick={() => readGroup()}>
                <Button
                    variant="ghost"
                    color="gray"
                    className="flex h-full items-center gap-2"
                    highContrast
                >
                    <RxPencil1 />
                </Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth={"400px"}>
                <Dialog.Title>
                    Edit Your Group
                </Dialog.Title>

                <Flex direction={"column"} gap={"2"}>
                    <Text size={"3"}>
                        Group Name
                    </Text>
                    <div className="relative flex w-full 
                    flex-row items-center justify-end">
                        <TextField.Root
                            value={groupName}
                            placeholder="Your device name..."
                            onChange={(e) => 
                                setGroupName(e.target.value)
                            }
                            required
                            disabled={!nameToggle}
                            className="w-full"
                        />
                        <button
                            className="absolute right-4"
                            onClick={(e) => {
                                e.preventDefault();
                                setNameToggle(!nameToggle);
                            }}
                        >
                            {!nameToggle && <RxPencil1/>}
                            {nameToggle && <FaCheck/>}
                        </button>
                    </div>

                    <Text size={"3"}>
                        Group Description
                    </Text>
                    <div className="relative flex w-full 
                    flex-row items-center justify-end">
                        <TextField.Root
                            value={groupDescription}
                            placeholder="Your device description..."
                            onChange={(e) => 
                                setGroupDescription(e.target.value)
                            }
                            required
                            disabled={!descToggle}
                            className="w-full"
                        />
                        <button
                            className="absolute right-4"
                            onClick={(e) => {
                                e.preventDefault();
                                setDescToggle(!descToggle);
                            }}
                        >
                            {!descToggle && <RxPencil1/>}
                            {descToggle && <FaCheck/>}
                        </button>
                    </div>
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
                            onClick={editGroup}
                            disabled={editingGroup}
                            variant="solid"
                        >
                            Save
                        </Button>
                    </div>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}

/* UNFINISHED. DO NOT EDIT */
