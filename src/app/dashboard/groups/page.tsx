import { Link1Icon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Button, Flex, Popover, Table, Text, Tooltip } from "@radix-ui/themes";
import { FaCrown } from "react-icons/fa";
import { LuCrown } from "react-icons/lu";
import GroupRow from "~/app/_components/dashboard/groups/GroupRow";

export default function GroupsPage() {
    return (
        <>
            <Flex direction={"column"}>
                <div className="flex flex-row justify-between">
                    <Text size={"8"} weight={"bold"}>
                        Your Groups
                    </Text>
                    <div className="flex flex-row gap-2 justify-center items-center">
                        <Button variant="solid" id="create">
                            Create Group
                        </Button>
                        <Button variant="outline" id="join">
                            Join Group
                        </Button>
                    </div>
                </div>
                <Text size={"4"} color="gray">
                    Create and manage your groups
                </Text>
            </Flex>

            <Flex
                direction={"row"}
                gap={"2"}
                justify={"between"}
                className="mt-4 w-full"
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
                        <GroupRow name="Family" isOwner={true} members={["1", "2", "3"]} />
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
                    </Table.Body>
                </Table.Root>
            </Flex>
        </>
    );
}
