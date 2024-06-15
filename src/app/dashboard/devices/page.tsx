"use client";

import {
    CaretSortIcon,
    GridIcon,
    ListBulletIcon,
    MagnifyingGlassIcon,
    PlusCircledIcon,
} from "@radix-ui/react-icons";
import {
    Box,
    Button,
    Card,
    Container,
    DropdownMenu,
    Flex,
    Grid,
    Section,
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
import * as Dialog from "@radix-ui/react-dialog";
import AddDeviceDialog from "~/app/_components/dashboard/devices/AddDeviceDialog";
import { api } from "~/trpc/react";
import { Device } from "@prisma/client";
import useWindowSize from "~/app/hooks/useWindowSize";

export default function DashboardDevices() {
    const [user, setUser] = useAtom(userAtom);
    const { width, height } = useWindowSize();

    const deviceQuery = api.device.list.useQuery({
        userId: user?.id || "",
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
        setSearchedDevices(
            devices.filter((device) => {
                return device.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            }),
        );
    }, [searchQuery]);

    return (
        <>
            <Flex direction={"column"}>
                <Flex justify={"between"} align={"center"}>
                    <Text size={"8"} weight={"bold"}>
                        Device Manager
                    </Text>
                    {
                        width! >= 768 ?
                        <AddDeviceDialog
                        refetch={() => {
                            deviceQuery.refetch();
                        }}
                        />
                        :
                        null
                    }
                </Flex>

                <Text size={"4"} color="gray">
                    Track and manage all the devices connected to your account
                </Text>

                {
                    width! >= 768 ?
                    null
                    :
                    <div className="mt-2">
                        <AddDeviceDialog
                        refetch={() => {
                            deviceQuery.refetch();
                        }}
                        />
                    </div>
                }
            </Flex>

            <Flex
                direction={width! >= 640 ? "row" : "column"}
                gap={"2"}
                justify={"between"}
                className="mt-4"
            >
                <Box maxWidth={"300px"}>
                    <TextField.Root
                        placeholder={"Search devices..."}
                        size={"3"}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    >
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
                </Flex>
            </Flex>

            {viewMode === "grid" ? (
                <Flex
                    className="mt-4"
                    direction={"row"}
                    wrap={"wrap"}
                    gap={"4"}
                    overflow={"scroll"}
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
                <Card className="mt-4 overflow-scroll">
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
