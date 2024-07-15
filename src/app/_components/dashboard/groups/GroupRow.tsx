import { GearIcon } from "@radix-ui/react-icons";
import { Avatar, Button, Table, Tooltip } from "@radix-ui/themes";
import { LuCrown } from "react-icons/lu";
import useWindowSize from "~/app/hooks/useWindowSize";
import GroupButtons from "./GroupButtons";
import { Group } from "@radix-ui/react-dropdown-menu";

interface GroupRowProps {
    groupId: string;
    name: string;
    isOwner: boolean;
    members: string[];
}

export default function GroupRow({
    groupId,
    name,
    isOwner,
    members,
}: GroupRowProps) {
    const { width, height } = useWindowSize();

    if (name.length >= 15 && width! < 600) {
        name = name.slice(0, 10) + "..."
    }

    members = ["1", "2", "3"];
    return (
        <>
            <Table.Row className="h-full">
                <Table.RowHeaderCell
                    className={`flex h-full flex-row items-center gap-2
                    ${width! <= 640 && isOwner ? `text-amber-400` : ""}`}
                    p="5"
                >
                    {isOwner && width! >= 640 ? (
                        <Tooltip content="You own this group">
                            <LuCrown className="text text-amber-400" />
                        </Tooltip>
                    ) : // <LuCrown className="text text-transparent" />
                    null}
                    {name}
                </Table.RowHeaderCell>
                <Table.Cell className="h-full">
                    {members.map((member, index) => (
                        <Avatar
                            radius={"full"}
                            key={member}
                            src="https://placehold.co/400x400"
                            size="1"
                            className={`${
                                index !== 0 ? "-ml-3" : ""
                            } border-2 border-white`}
                            fallback={""}
                        />
                    ))}
                </Table.Cell>
                <Table.Cell className="">
                    <GroupButtons groupId={groupId} />
                </Table.Cell>
            </Table.Row>
        </>
    );
}
