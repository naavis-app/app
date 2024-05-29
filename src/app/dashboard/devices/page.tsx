"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, DropdownMenu, Flex, Table, Text, TextField } from "@radix-ui/themes";
import DeviceRow from "~/app/_components/dashboard/DeviceRow";

const devices = [
	{
		name: "Device 1",
		type: "Phone",
		id: "1",
		lastUpdated: new Date(),
		latitude: 0,
		longitude: 0,
	},
	{
		name: "Device 2",
		type: "Tablet",
		id: "2",
		lastUpdated: new Date(),
		latitude: 10,
		longitude: 20,
	},
	{
		name: "Device 3",
		type: "Laptop",
		id: "3",
		lastUpdated: new Date(),
		latitude: 30,
		longitude: 40,
	},
	{
		name: "Device 4",
		type: "Desktop",
		id: "4",
		lastUpdated: new Date(),
		latitude: 50,
		longitude: 60,
	},
	{
		name: "Device 5",
		type: "Phone",
		id: "5",
		lastUpdated: new Date(),
		latitude: 70,
		longitude: 80,
	},
	{
		name: "Device 6",
		type: "Tablet",
		id: "6",
		lastUpdated: new Date(),
		latitude: 90,
		longitude: 100,
	},
	{
		name: "Device 7",
		type: "Laptop",
		id: "7",
		lastUpdated: new Date(),
		latitude: 110,
		longitude: 120,
	},
	{
		name: "Device 8",
		type: "Desktop",
		id: "8",
		lastUpdated: new Date(),
		latitude: 130,
		longitude: 140,
	}
];

export default function DashboardDevices() {
	return (<>
		<Flex direction={"column"}>
			<Text size={"8"} weight={"bold"}>Device Manager</Text>
			<Text size={"4"}>Track and manage all your devices</Text>
		</Flex>

		<Flex direction={"row"} gap={"2"} justify={"between"} className="mt-4">
			<TextField.Root placeholder={"Search"} />

			<Flex gap={"2"}>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						<Button variant={"outline"}>
							Filter
						</Button>
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
			</Flex>
		</Flex>


		<Card className="mt-4">
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Last Updated</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{devices.map(device => <DeviceRow device={device} key={device.id} />)}
				</Table.Body>
			</Table.Root>
		</Card>
	</>)
}