import { GearIcon } from "@radix-ui/react-icons";
import { Avatar, Button, Table, Tooltip } from "@radix-ui/themes";
import { LuCrown } from "react-icons/lu";

interface GroupRowProps {
	name: string;
	isOwner: boolean;
	members: string[];
}

export default function GroupRow({ name, isOwner, members }: GroupRowProps) {
	members = ["1", "2", "3"];
	return (<>
		<Table.Row className="">
			<Table.RowHeaderCell className="flex flex-row items-center gap-2 h-full">
				{
					isOwner ? <Tooltip content="You own this group">
						<LuCrown className="text text-amber-400" />
					</Tooltip> : <LuCrown className="text text-transparent" />
				}
				{name}
			</Table.RowHeaderCell>
			<Table.Cell>
				{members.map((member) =>
					<Avatar radius={"full"} key={member} src="https://placehold.co/400x400" size="1" className=" -ml-3 border-2 border-white" fallback={""} />
				)}
			</Table.Cell>
			<Table.Cell className="h-full flex flex-col items-center">
				<Button variant="ghost" className="w-full">
					<GearIcon />
				</Button>
			</Table.Cell>
		</Table.Row>
	</>)
}