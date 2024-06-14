"use client";

import { Link1Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import {
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
import { groupListAtom, userAtom } from "~/server/lib/stores";
import { api } from "~/trpc/react";

export default function GroupsPage() {
    const [user, setUser] = useAtom(userAtom);

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
            <Flex direction={"column"}>
                <div className="flex flex-row justify-between">
                    <Text size={"8"} weight={"bold"}>
                        Your Groups
                    </Text>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <CreateGroupDialog refetch={groupQuery.refetch} />
                        <Button variant="outline" id="join">
                            Join Group
                        </Button>
                    </div>
                </div>
                <Text size={"4"} color="gray">
                    Create and manage your groups
                </Text>
            </Flex>

            <Card className="mt-4">
                <Flex
                    direction={"row"}
                    gap={"2"}
                    justify={"between"}
                    className="w-full pb-4"
                >
                    <Table.Root className="w-full max-w-4xl">
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell>
                                    Name
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                    Members
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                    Actions
                                </Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <GroupRow
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
                            />
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
