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
import { userAtom } from "~/server/lib/stores";
import * as Dialog from '@radix-ui/react-dialog';
import AddDeviceDialog from "~/app/_components/dashboard/devices/AddDeviceDialog";


const devices = [
    {
        name: "Device 1",
        type: "Phone",
        id: "1",
        lastUpdated: new Date(),
        connection: "Offline",
        latitude: 0,
        longitude: 0,
    },
    {
        name: "Device 2",
        type: "Tablet",
        id: "2",
        lastUpdated: new Date(),
        connection: "Online",
        latitude: 10,
        longitude: 20,
    },
    {
        name: "Device 3",
        type: "Laptop",
        id: "3",
        lastUpdated: new Date(),
        connection: "Offline",
        latitude: 30,
        longitude: 40,
    },
    {
        name: "Device 4",
        type: "Smartwatch",
        id: "4",
        lastUpdated: new Date(),
        connection: "Online",
        latitude: 50,
        longitude: 60,
    },
    {
        name: "Device 5",
        type: "Phone",
        id: "5",
        lastUpdated: new Date(),
        connection: "Online",
        latitude: 70,
        longitude: 80,
    },
    {
        name: "Device 6",
        type: "Tablet",
        id: "6",
        lastUpdated: new Date(),
        connection: "Online",
        latitude: 90,
        longitude: 100,
    },
    {
        name: "Device 7",
        type: "Laptop",
        id: "7",
        lastUpdated: new Date(),
        connection: "Offline",
        latitude: 110,
        longitude: 120,
    },
    {
        name: "Device 8",
        type: "Desktop",
        id: "8",
        lastUpdated: new Date(),
        connection: "Offline",
        latitude: 130,
        longitude: 140,
    },
];

export default function DashboardDevices() {
    const [user, setUser] = useAtom(userAtom);

    const [viewMode, setViewMode] = useState("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedDevices, setSearchedDevices] = useState(devices);

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

                    <AddDeviceDialog />
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
