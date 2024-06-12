"use client";

import { CaretSortIcon, GridIcon, ListBulletIcon, MagnifyingGlassIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
    Box,
    Button,
    Card,
    Container,
    DropdownMenu,
    Flex,
    Grid,
    SegmentedControl,
    Table,
    Text,
    TextField,
} from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeviceRow from "~/app/_components/dashboard/devices/DeviceRow";
import { deviceListAtom, userAtom } from "~/server/lib/stores";
import * as Dialog from '@radix-ui/react-dialog';
import AddDeviceDialog from "~/app/_components/dashboard/devices/AddDeviceDialog";
import { api } from "~/trpc/react";
import { Device } from "@prisma/client";

export default function DashboardDevices() {
    const [user, setUser] = useAtom(userAtom);

    const deviceQuery = api.device.list.useQuery({
        userId: user?.id || ""
    });

    const [devices, setDevices] = useAtom(deviceListAtom);

    const [page, setPage] = useState(1);
    const [viewMode, setViewMode] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedDevices, setSearchedDevices] = useState<Device[]>([]);

    useEffect(() => {
        if (deviceQuery.data) {
            setDevices(deviceQuery.data);
            setSearchedDevices(deviceQuery.data);
        }
    }, [deviceQuery.data]);

    useEffect(() => {
        setSearchedDevices(devices.filter((device) => {
            return device.name.toLowerCase()
                .includes(searchQuery.toLowerCase());
        }));
    }, [searchQuery]);

    return (
        <>
            <Flex direction={"column"}>
                <Text size={"8"} weight={"bold"}>
                    Device Manager
                </Text>
                <Text size={"4"} color="gray">
                    Track and manage all the
                    devices connected to your account
                </Text>
            </Flex>

            <Flex
                direction={"row"}
                gap={"2"}
                justify={"between"}
                className="mt-4"
            >
                <Box maxWidth={"300px"}>
                    <TextField.Root placeholder={"Search devices..."}
                        size={"3"}
                        onChange={(e) => setSearchQuery(e.target.value)}>
                        <TextField.Slot>
                            <MagnifyingGlassIcon />
                        </TextField.Slot>
                    </TextField.Root>
                </Box>

                <Flex gap={"2"}>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant={"outline"}>Filter</Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item>By Name</DropdownMenu.Item>
                            <DropdownMenu.Item>By Type</DropdownMenu.Item>
                            <DropdownMenu.Item>
                                By Last Updated
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant={"outline"}>
                                <CaretSortIcon />
                                Sort
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item>By Name</DropdownMenu.Item>
                            <DropdownMenu.Item>By Type</DropdownMenu.Item>
                            <DropdownMenu.Item>
                                By Last Updated
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>

                    <SegmentedControl.Root
                        defaultValue="grid"
                        onValueChange={(e) => setViewMode(e)}
                    >
                        <SegmentedControl.Item value="grid">
                            <GridIcon />
                        </SegmentedControl.Item>
                        <SegmentedControl.Item value="list">
                            <ListBulletIcon />
                        </SegmentedControl.Item>
                    </SegmentedControl.Root>

                    <AddDeviceDialog refetch={() => { deviceQuery.refetch() }} />
                </Flex>
            </Flex>

            {viewMode === "grid" ? (
                <Flex
                    className="mt-4"
                    direction={"row"}
                    wrap={"wrap"}
                    gap={"4"}
                >
                    {searchedDevices.map((device) => (
                        <DeviceRow
                            device={device}
                            key={device.id}
                            viewMode={viewMode}
                        />
                    ))}
                </Flex>
            ) : (
                <Card className="mt-4">
                    {searchedDevices.map((device) => (
                        <DeviceRow
                            device={device}
                            key={device.id}
                            viewMode={viewMode}
                        />
                    ))}
                </Card>
            )}

            {/* TODO: PAGINATION */}
            <Card className="mt-4"></Card>
        </>
    );
}
