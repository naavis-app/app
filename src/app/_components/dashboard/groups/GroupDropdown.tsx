import { Popover, Button } from "@radix-ui/themes";
import { GearIcon } from "@radix-ui/react-icons";
import EditGroupDialog from "./EditGroupDialog";
import DeleteGroupDialog from "./DeleteGroupDialog";
import { IoSettingsSharp } from "react-icons/io5";

export default function GroupDropdown() {
    return (
        <Popover.Root>
            <Popover.Trigger>
                <Button variant={"ghost"}>
                    <IoSettingsSharp />
                </Button>
            </Popover.Trigger>
            <Popover.Content>
                <div className="flex flex-col gap-3">
                    <EditGroupDialog />
                    <DeleteGroupDialog />
                </div>
            </Popover.Content>
        </Popover.Root>
    );
}
