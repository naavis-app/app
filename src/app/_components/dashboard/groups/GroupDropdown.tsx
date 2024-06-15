import {
    DropdownMenu,
    Button,
} from '@radix-ui/themes';
import { GearIcon } from '@radix-ui/react-icons';
import EditGroupDialog from './EditGroupDialog';
import DeleteGroupDialog from './DeleteGroupDialog';
import { 
    IoSettingsSharp, 
} from "react-icons/io5";

export default function GroupDropdown() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant={"ghost"}>
                        <IoSettingsSharp />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item>
                    <EditGroupDialog />
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    <DeleteGroupDialog />
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}