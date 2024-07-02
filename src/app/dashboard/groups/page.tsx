"use client";

import { Link1Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
    Box,
    Button,
    Card,
    Flex,
    Popover,
    Table,
    Text,
    Tooltip,
} from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import { LuCrown } from "react-icons/lu";
import CreateGroupDialog from "~/app/_components/dashboard/groups/CreateGroupDialog";
import GroupRow from "~/app/_components/dashboard/groups/GroupRow";
import useWindowSize from "~/app/hooks/useWindowSize";
import { groupListAtom, userAtom } from "~/server/lib/stores";
import { api } from "~/trpc/react";

export default function GroupsPage() {
    const [user, setUser] = useAtom(userAtom);
    const { width, height } = useWindowSize();
    /* used to dynamically move the create
    and join group buttons based on screen size*/

    const groupQuery = api.group.list.useQuery({
        userId: user?.id || "",
    });

    const [groups, setGroups] = useAtom(groupListAtom);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (groupQuery.data) {
            setGroups(groupQuery.data);
        }
    }, [groupQuery.data]);

    return (
        <>
            <Flex className="flex-col md:flex-row md:!justify-between w-full">
                <Flex direction={"column"}>
                    <Text size={"8"} weight={"bold"}>
                        Your Groups
                    </Text>
                    <Text size={"4"} color="gray">
                        Create and manage your groups
                    </Text>
                </Flex>

                <Flex direction={"row"} className="mt-4" gap={"2"}>
                    <CreateGroupDialog refetch={groupQuery.refetch} />
                    <Button variant="outline" id="join">
                        Join Group
                    </Button>
                </Flex>
            </Flex>

            <Card className="mt-4">
                <Flex
                    direction={"row"}
                    gap={"2"}
                    justify={"between"}
                    className="w-full pb-4"
                >
                    <Table.Root className="w-full max-w-4xl min-h-[8rem]">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell className="w-1/3">
                                    Name
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell className="w-1/3">
                                    Members
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell className="w-1/3 text-center">
                                    Actions
                                </Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {/* <GroupRow
                                name="Your Group"
                                isOwner={true}
                                members={["1", "2", "3"]}
                            />
                            <GroupRow
                                name="Red Rangers"
                                isOwner={true}
                                members={["1", "2", "3"]}
                            />
                            <GroupRow
                                name="Blue Rangers"
                                isOwner={false}
                                members={["1", "2", "3"]}
                            />
                            <GroupRow
                                name="Green Rangers"
                                isOwner={false}
                                members={["1", "2", "3"]}
                            /> */}
                            {/* TODO: Group members preview system */}
                            {groups.map((group) => (
                                <GroupRow
                                    key={group.id}
                                    name={group.name}
                                    isOwner={group.ownerId === user?.id}
                                    members={[""]}
                                />
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Flex>
            </Card>
        </>
    );
}
// fix scrolling horizontally issue in table
