"use client";

import { Button, Card, Flex, Select, Text, TextField } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userAtom } from "~/server/lib/stores";
import * as Dialog from "@radix-ui/react-dialog";
import EditableInput from "../../edit-account/EditInput";
import { RxPencil1 } from "react-icons/rx";
import { deviceTypes } from "./AddDeviceDialog";

import { api } from "~/trpc/react";

export default function EditDeviceDialog() {
    const [user, setUser] = useAtom(userAtom);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [addingDevice, setAddingDevice] = useState<boolean>(false);

    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("1");

    const deviceQuery = api.device.list.useQuery({
        userId: user?.id || "",
    });

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger
                asChild
                onClick={() => setDialogOpen((prevOpen) => !prevOpen)}
            >
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
                <Dialog.Overlay className="DialogOverlay
                fixed inset-0 z-40 bg-black/60" />
                <Dialog.Content className="DialogContent
                fixed inset-0 z-50 flex items-center 
                justify-center p-4">
                    <Card variant="surface" className="Card min-w-[24rem]">
                        <Flex direction={"column"} className="p-2" gap={"2"}>
                            <Text size={"5"} weight={"bold"}>
                                Edit Your Device
                            </Text>

                            <Flex direction={"column"} gap={"2"}>
                                <Text size={"3"}
                                className="Label">Device Name</Text>
                                <TextField.Root
                                className="Input"
                                    placeholder="Name of Your Device"
                                    onChange={(e) => setDeviceName(e.target.value)}
                                    required
                                />

                                <Text size={"3"}
                                className="Label">Device Type</Text>
                                <Select.Root
                                    onValueChange={(e) => setDeviceType(e)}
                                >
                                    <Select.Trigger
                                        variant="surface"
                                        className="z-10"
                                    />
                                    <Select.Content>
                                        <Select.Group>
                                            {deviceTypes.map((type) => (
                                                <Select.Item value={type.id}>
                                                    {type.name}
                                                </Select.Item>
                                            ))}
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
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
                                    // onClick={newDevice}
                                    disabled={addingDevice}
                                >
                                    Save
                                </Button>
                            </Flex>
                        </Flex>
                    </Card>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

/* UNFINISHED. DO NOT EDIT */
