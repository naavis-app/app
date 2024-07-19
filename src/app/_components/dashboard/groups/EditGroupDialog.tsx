"use client";

// edit group dialog

import { Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from "@radix-ui/react-dialog";
import { api } from "~/trpc/react";
import { RxPencil1 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa";

interface EditGroupProps {
    refetch: () => void;
    groupId: string;
}

export default function EditGroupDialog({ refetch, groupId }: EditGroupProps) {
    const [user, setUser] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState(false);
    const [startingEdit, setStartingEdit] = useState<boolean>(false);

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
            toast.error(`Failed to get group!`);

            setGroupName(groupName);
            setGroupDescription(groupDescription);
        }
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
        });

        setNameToggle(false);
        setDescToggle(false);
    };

    const dialogStyle = "border-dark-dialog-border bg-dark-dialog-bg";
    const dialogTextStyle = "border-dialog-text-border bg-dialog-text-bg ";

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger asChild onClick={() => readGroup()}>
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
                            <div className="text-xl font-bold">
                                Edit Your Group
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-md">Group Name</label>
                                <div
                                className="relative flex w-full
                                flex-row items-center justify-end">
                                    <input
                                        type="text"
                                        value={groupName}
                                        placeholder="Name of Your Device"
                                        onChange={(e) =>
                                            setGroupName(e.target.value)
                                        }
                                        required
                                        disabled={!nameToggle}
                                        className={`w-full
                                        rounded-lg border ${dialogTextStyle} p-2 
                                        focus:border-transparent
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                        ${
                                            !nameToggle
                                            ? "text-disabled-text"
                                            : "text-white"
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
                                <label className="text-md">
                                    Group Description
                                </label>
                            </div>
                            <div
                            className="relative flex w-full flex-row
                            items-center justify-ends">
                                <input
                                    type="text"
                                    value={groupDescription}
                                    placeholder="Your Group Description"
                                    onChange={(e) =>
                                        setGroupDescription(e.target.value)
                                    }
                                    required
                                    disabled={!descToggle}
                                    className={`w-full
                                        rounded-lg 
                                        border ${dialogTextStyle} p-2 
                                        focus:border-transparent
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                        ${
                                            !descToggle
                                            ? "text-disabled-text"
                                            : "text-white"
                                        }`}
                                />
                                <button
                                className="absolute right-4"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setDescToggle(!descToggle);
                                }}>
                                    {!descToggle && <RxPencil1 />}
                                    {descToggle && <FaCheck />}
                                </button>
                            </div>
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
                                    onClick={editGroup}
                                    disabled={editingGroup}
                                    className="rounded bg-reg-button-bg
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
