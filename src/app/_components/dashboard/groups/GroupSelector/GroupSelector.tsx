"use client";

import { Select, Button, Flex } from "@radix-ui/themes";
import { useAtom } from "jotai";
// import { Icon } from "@iconify-icon/react";
// import { PlusCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useEffect } from "react";
import { groupListAtom, selectedGroupId } from "~/server/lib/stores";
import GroupName from "./GroupName";
import toast from "react-hot-toast";

export default function GroupSelector() {
    const [groups] = useAtom(groupListAtom);
    const [selGroupId, setSelectedGroupId] = useAtom(selectedGroupId);

    useEffect(() => {
        console.log(groups);
    }, [groups]);

    function setSelected(id: string) {
        setSelectedGroupId(id);

        toast.success(
            `Selected group: ${groups.find((g) => g.id == id)?.name || ""}`,
        );
    }

    return (
        <>
            {groups.length == 0 ? (
                <Button variant="solid" className="w-full">
                    <Link
                        href="/dashboard/groups/#create"
                        className="flex w-full items-center justify-center"
                    >
                        Create a group
                    </Link>
                </Button>
            ) : (
                <Select.Root
                    onValueChange={setSelected}
                    defaultValue={selGroupId || ""}
                >
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
                        {
                            <Select.Group className="flex flex-col justify-center">
                                {groups.map((group) => (
                                    <GroupName key={group.id} group={group} />
                                ))}
                                <Select.Separator />
                                <Flex gap={"4"} className="m-1 mx-auto">
                                    <Button
                                        variant={"ghost"}
                                        className="w-full"
                                    >
                                        <Link
                                            href="/dashboard/groups/#create"
                                            className="flex w-full items-center justify-center"
                                        >
                                            Create
                                        </Link>
                                    </Button>
                                    <Button
                                        variant={"ghost"}
                                        className="w-full"
                                    >
                                        <Link
                                            href="/dashboard/groups/#join"
                                            className="flex w-full items-center justify-center"
                                        >
                                            Join
                                        </Link>
                                    </Button>
                                </Flex>
                            </Select.Group>
                        }
                    </Select.Content>
                </Select.Root>
            )}
        </>
    );
}
