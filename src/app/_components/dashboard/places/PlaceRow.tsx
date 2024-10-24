import { Table } from "@radix-ui/themes";
import React from "react";

import type { Place } from "@prisma/client";
import PlaceButtons from "./PlaceButtons";

interface PlaceRowProps {
	place: Place;
}

export default function PlaceRow({ place }: PlaceRowProps) {
	return (
		<>
			<Table.Row className="h-full">
				<Table.RowHeaderCell
					className="flex h-full flex-row items-center gap-2"
					p="5"
				>
					{place.name}
				</Table.RowHeaderCell>
				<Table.Cell className="h-full">{place.address}</Table.Cell>
				<Table.Cell className="">
					<PlaceButtons name={place.name} groupId={place.id} />
				</Table.Cell>
			</Table.Row>
		</>
	);
}
