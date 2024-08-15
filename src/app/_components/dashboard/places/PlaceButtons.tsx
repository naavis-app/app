import React from "react";
import { Button } from "@radix-ui/themes";

export default function PlaceButtons({ groupId }: { groupId: string }) {
    return (
        <>
            <div className="mt-1 flex flex-row gap-5">
                {/* TODO: Implement place CRUD */}
                <Button disabled>Edit {groupId}</Button>
            </div>
        </>
    );
}
