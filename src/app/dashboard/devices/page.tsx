"use client";

import type { Device } from "@prisma/client";
import {
	CaretSortIcon,
	GridIcon,
	ListBulletIcon,
	MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import {
	Box,
	Button,
	Card,
	DropdownMenu,
	Flex,
	SegmentedControl,
	Text,
	TextField,
} from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import React from "react";
import AddDeviceDialog from "~/app/_components/dashboard/devices/AddDeviceDialog";
import DeviceRow from "~/app/_components/dashboard/devices/DeviceRow";
import { deviceListAtom, userAtom } from "~/server/lib/stores";
import { api } from "~/trpc/react";

// TODO: ADD PAGINATION TO AVOID TERRIBLE LOAD TIMES!

export default function DashboardDevices() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [user, setUser] = useAtom(userAtom);

	const deviceQuery = api.device.list.useQuery({
		userId: user?.id || "",
	});

	const [devices, setDevices] = useAtom(deviceListAtom);

	// const [page, setPage] = useState(1);
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
				return device.name.toLowerCase().includes(searchQuery.toLowerCase());
			}),
		);
	}, [searchQuery]);

	return (
		<>
			<Flex className="w-full flex-col md:flex-row md:!justify-between">
				<Flex direction={"column"}>
					<Text size={"8"} weight={"bold"}>
						Device Manager
					</Text>
					<Text size={"4"} color="gray">
						Track and manage all the devices connected to your account
					</Text>
				</Flex>

				<Box className="mb-4 mt-4">
					<AddDeviceDialog
						refetch={() => {
							deviceQuery.refetch();
						}}
					/>
				</Box>
			</Flex>

			<Flex gap={"2"} justify={"between"} className="mt-4 flex-col sm:flex-row">
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
							<DropdownMenu.Item>By Last Updated</DropdownMenu.Item>
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
							<DropdownMenu.Item>By Last Updated</DropdownMenu.Item>
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
				<Flex className="mt-4 !p-0" direction={"row"} wrap={"wrap"} gap={"4"}>
					{searchedDevices.map((device, index) => (
						<DeviceRow
							key={device.id}
							device={device}
							deviceId={device.id}
							viewMode={viewMode}
						/>
					))}
				</Flex>
			) : (
				<Card className="mt-4 overflow-scroll">
					{searchedDevices.map((device, index) => (
						<DeviceRow
							key={device.id}
							device={device}
							deviceId={device.id}
							viewMode={viewMode}
						/>
					))}
				</Card>
			)}

			{/* TODO: PAGINATION */}
			<Card className="mt-4" />
		</>
	);
}
