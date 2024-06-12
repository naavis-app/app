import { Flex, Popover, Table, Text, Tooltip } from "@radix-ui/themes";
import { FaCrown } from "react-icons/fa";
import { LuCrown } from "react-icons/lu";
import GroupRow from "~/app/_components/dashboard/groups/GroupRow";

export default function GroupsPage() {
	return (<>
		<Flex direction={"column"}>
			<Text size={"8"} weight={"bold"}>
				Your Groups
			</Text>
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
						<Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Members</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<GroupRow name="Family" isOwner={true} members="" />
					<GroupRow name="Red Rangers" isOwner={true} members="" />
					<GroupRow name="Blue Rangers" isOwner={false} members="" />
					<GroupRow name="Green Rangers" isOwner={false} members="" />
				</Table.Body>
			</Table.Root>
		</Flex>

	</>)
}