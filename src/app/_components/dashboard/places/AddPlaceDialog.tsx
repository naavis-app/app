"use client";

import { Button, Flex, Text, Dialog, TextField, SegmentedControl, Separator, Slider, CheckboxGroup } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { selectedGroupId, userAtom } from "~/server/lib/stores";
import React from "react";

import { api } from "~/trpc/react";

export default function AddPlaceDialog({ refetch }: { refetch: () => void }) {
    const [user] = useAtom(userAtom);
    const [selGroupId] = useAtom(selectedGroupId);

    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [addingPlace, setAddingPlace] = useState<boolean>(false);

    const [placeName, setPlaceName] = useState("");

    const [locationInputMode, setLocationInputMode] = useState("address");

    const createPlace = api.place.create.useMutation({
        onSuccess: (place) => {
            refetch();

            toast.success(`${place.name} has been created!`);
            setPlaceName("");

            setAddingPlace(false);
            setDialogOpen(false);
        },
        onError: () => {
            toast.error(`Failed to add ${placeName}`);

            setAddingPlace(false);
            setDialogOpen(false);
        },
    });

    const newPlace = () => {
        if (addingPlace) return;
        if (!user) return toast.error("You must be logged in to create a place!");
        if (!placeName.length) return toast.error("You must enter a name!");
        if (!selGroupId) return toast.error("You must select a group!");

        setAddingPlace(true);

        createPlace.mutate({
            name: placeName,
            groupId: selGroupId,
        });
    };

    return (
        <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
            <Dialog.Trigger onClick={() => setDialogOpen(!dialogOpen)}>
                <Button variant={"solid"}>New Place</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth={"500px"}>
                <Dialog.Title>
                    Add A New Place
                </Dialog.Title>

                <Flex direction={"column"} gap={"2"}>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Name
                        </Text>
                        <TextField.Root value={placeName} onChange={event => setPlaceName(event.target.value)} />
                    </label>
                    <label>
                        <Flex justify="between" className="pb-2" align="center">
                            <Text as="div" size="2" weight="bold">
                                Location
                            </Text>
                            <SegmentedControl.Root size="1" defaultValue="address" onValueChange={(e) => setLocationInputMode(e)}>
                                <SegmentedControl.Item value="address">
                                    Address
                                </SegmentedControl.Item>
                                <SegmentedControl.Item value="pin">
                                    Exact
                                </SegmentedControl.Item>
                            </SegmentedControl.Root>
                        </Flex>

                        {/* TODO: Need address based location selector and exact map pinpoint input */}
                        {
                            locationInputMode === "address" ? (
                                <TextField.Root value={placeName} onChange={event => setPlaceName(event.target.value)} />
                            ) : (
                                <TextField.Root value={placeName} disabled onChange={event => setPlaceName(event.target.value)} />
                            )
                        }
                    </label>
                </Flex>
                <Separator my="3" size="4" />
                <Text className="font-bold" size="2">
                    Alert Options
                </Text>
                <Flex className="flex-col gap-2 sm:flex-row sm:gap-4">
                    <label className="flex-1">
                        <Text as="div" size="2" weight="bold">
                            Radius (ft)
                        </Text>
                        <Slider my="2" defaultValue={[500]} min={10} max={5000} step={1} />
                    </label>
                    <label className="flex-1">
                        <Text as="div" size="2" weight="bold">
                            Alert Types
                        </Text>
                        <CheckboxGroup.Root defaultValue={["arrive", "leave"]} name="example">
                            <CheckboxGroup.Item value="arrive">Arrive</CheckboxGroup.Item>
                            <CheckboxGroup.Item value="leave">Leave</CheckboxGroup.Item>
                            <CheckboxGroup.Item disabled value="hover">Hover</CheckboxGroup.Item>
                        </CheckboxGroup.Root>
                    </label>
                </Flex>
                <Flex gap="2" mt="4" justify="end" >
                    <Dialog.Close>
                        <Button variant={"surface"} onClick={() => setDialogOpen(false)}>Cancel</Button>
                    </Dialog.Close>
                    <Button variant={"solid"} onClick={newPlace} disabled={addingPlace}>Add Place</Button>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
}
