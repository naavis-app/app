"use client";

import {
    Select,
    Button,
    Flex,
} from "@radix-ui/themes";
// import { Icon } from "@iconify-icon/react";
// import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

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
                            <Flex gap={"4"} className="m-1 mx-auto">
                                <Button variant={"ghost"} className="w-full">
                                    <Link
                                        href="/dashboard/groups/#create"
                                        className="flex w-full items-center justify-center"
                                    >
                                        Create
                                    </Link>
                                </Button>
                                <Button variant={"ghost"} className="w-full">
                                    <Link
                                        href="/dashboard/groups/#join"
                                        className="flex w-full items-center justify-center"
                                    >
                                        Join
                                    </Link>
                                </Button>
                            </Flex>
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </div>
        </>
    );
}
