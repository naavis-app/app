import { Button } from "@radix-ui/themes";
import React from "react";

export default function PlaceButtons({ name, groupId }: 
    { name: string, groupId: string }) {
	return (
		<>
			<div className="mt-1 flex flex-row gap-5">
				{/* TODO: Implement place CRUD */}
				<Button disabled>Edit {name}</Button>
			</div>
		</>
	);
}
