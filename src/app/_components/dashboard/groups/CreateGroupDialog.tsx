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
    const [addingDevice, setAddingDevice] = useState(false);

    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");

    const createGroup = api.group.create.useMutation({
        onSuccess: (device) => {
            refetch();

            toast.success(`${device.name} has been created!`);
            setGroupName("");
            setGroupDescription("");

            setAddingDevice(false);
            setDialogOpen(false);
        },
        onError: () => {
            toast.error(`Failed to create ${groupName}`);

            setAddingDevice(false);
            setDialogOpen(false);
        },
    });

    const newDevice = (e: FormData) => {
        if (addingDevice) return;
        if (!user)
            return toast.error("You must be logged in to create a group");

        setAddingDevice(true);

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
            <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center">
                <Card className="min-w-[24rem]">
                    <Flex direction={"column"} className="p-2" gap={"2"}>
                        <form action={newDevice}>
                            <Text size={"5"} weight={"bold"}>
                                Create A New Group
                            </Text>

                            <Flex direction={"column"} gap={"2"}>
                                <Text size={"3"}>Group Name</Text>
                                <TextField.Root
                                    placeholder="Your group's name..."
                                    onChange={(e) =>
                                        setGroupName(e.target.value)
                                    }
                                    required
                                />

                                <Text size={"3"}>Description</Text>
                                <TextField.Root
                                    placeholder="Your group's description..."
                                    onChange={(e) =>
                                        setGroupDescription(e.target.value)
                                    }
                                    required
                                />
                            </Flex>

                            <Flex
                                direction={"row"}
                                className="mt-2"
                                justify={"between"}
                                align={"center"}
                            >
                                <Dialog.Close
                                    asChild
                                    onClick={() => setDialogOpen(false)}
                                >
                                    <Button variant="ghost">Cancel</Button>
                                </Dialog.Close>

                                <Button
                                    variant={"solid"}
                                    disabled={addingDevice}
                                    type="submit"
                                >
                                    Create Group
                                </Button>
                            </Flex>
                        </form>
                    </Flex>
                </Card>
            </Dialog.Content>
        </Dialog.Root>
    );
}
