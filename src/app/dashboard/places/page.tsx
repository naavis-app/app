"use client";

import type { Place } from "@prisma/client";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Button, Card, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import AddPlaceDialog from "~/app/_components/dashboard/places/AddPlaceDialog";
import PlaceRow from "~/app/_components/dashboard/places/PlaceRow";
import UhohImage from "~/app/_components/uhoh/UhohImage";
import UhohWrapper from "~/app/_components/uhoh/UhohWrapper";
import { selectedGroupId, userAtom } from "~/server/lib/stores";
import { placeListAtom } from "~/server/lib/stores";
import { api } from "~/trpc/react";

// TODO: ADD PAGINATION TO AVOID TERRIBLE LOAD TIMES!

export default function DashboardDevices() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [user, setUser] = useAtom(userAtom);
	const [selGroupId] = useAtom(selectedGroupId);

	const placeQuery = api.place.list.useQuery({
		groupId: selGroupId || "",
	});

	// TODO: Transition from ohno to data smoothly
	// TODO: Remove mock data use actual live data pls ‼️
	const [places, setPlaces] = useAtom(placeListAtom);

	useEffect(() => {
		if (placeQuery.data) {
			setPlaces(placeQuery.data);
		}
	}, [placeQuery.data, setPlaces]);

	// const places = [
	// 	/*
	//     {
	//         id: "1",
	//         name: "Living Room",
	//         groupId: "1",
	//         latitude: 0,
	//         longitude: 0,
	//         address: "1234 Main St",
	//     }, {
	//         id: "2",
	//         name: "Kitchen",
	//         groupId: "1",
	//         latitude: 0,
	//         longitude: 0,
	//         address: "1234 Main St",
	//     }, {
	//         id: "3",
	//         name: "Bedroom",
	//         groupId: "1",
	//         latitude: 0,
	//         longitude: 0,
	//         address: "1234 Main St",
	//     },
	//     {
	//         id: "4",
	//         name: "CHINA",
	//         groupId: "1",
	//         latitude: 0,
	//         longitude: 0,
	//         address: "1234 Main St",
	//     }
	//  */
	// ] as Place[];
	return (
		<>
			<Flex className="w-full flex-col md:flex-row md:!justify-between">
				<Flex direction={"column"}>
					<Text size={"8"} weight={"bold"}>
						Place Manager
					</Text>
					<Text size={"4"} color="gray">
						Track and manage all the places connected to your group
					</Text>
				</Flex>

				<Box className="mb-4 mt-4">
					<AddPlaceDialog
						refetch={() => {
							placeQuery.refetch();
						}}
					/>
				</Box>
			</Flex>

			<Flex gap={"2"} justify={"end"} className="mt-4 flex-col sm:flex-row">
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
				</Flex>
			</Flex>

			{places.length === 0 ? (
				<>
					<UhohWrapper>
						<UhohImage />
						<Text className="font-bold">Uh oh! No places found!</Text>
						<Text>Create a place to get started.</Text>
					</UhohWrapper>
				</>
			) : (
				<>
					<Card className="mt-4 overflow-scroll">
						{places.map((place, _) => (
							<PlaceRow key={place.id} place={place} />
						))}
					</Card>
					{/* TODO: PAGINATION */}
					<Card className="mt-4" />
				</>
			)}
		</>
	);
}
