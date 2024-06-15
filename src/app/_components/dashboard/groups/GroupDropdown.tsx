import {
    DropdownMenu,
    Button,
} from '@radix-ui/themes';
import { GearIcon } from '@radix-ui/react-icons';
import EditGroupDialog from './EditGroupDialog';
import DeleteGroupDialog from './DeleteGroupDialog';

export default function GroupDropdown() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant={"ghost"}>
                        <GearIcon />
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