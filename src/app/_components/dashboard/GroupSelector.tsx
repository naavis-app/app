"use client";

import { Card, Box, DropdownMenu, Select, Button } from "@radix-ui/themes";
import { Icon } from "@iconify-icon/react";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export default function GroupSelector() {
    return (
        <>
            <div className="absolute left-0 right-0 z-10 mx-auto mt-4 w-fit">
                <Select.Root defaultValue="2">
                    <Select.Trigger
                        radius="full"
                        variant="classic"
                        className="z-10"
                    />
                    <Select.Content
                        className="z-10"
                        position="popper"
                        variant="solid"
                    >
                        <Select.Group className="flex flex-col justify-center">
                            <Select.Item value="1">Family Group 1</Select.Item>
                            <Select.Item value="2">Family Group 2</Select.Item>
                            <Select.Item value="3" disabled>
                                Family Group 3
                            </Select.Item>
                            <Select.Item value="4">Family Group 4</Select.Item>
                            <Select.Item value="5">Family Group 5</Select.Item>
                            <Select.Separator />
                            <Button variant={"outline"} className="w-full justify-center items-center mx-auto">
                                <PlusCircledIcon />New Group
                            </Button>
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </div>
        </>
    );
}
