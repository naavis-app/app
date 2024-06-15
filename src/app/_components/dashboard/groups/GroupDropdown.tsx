import {
    DropdownMenu,
    Button,
} from '@radix-ui/themes';
import { RxPencil1 } from "react-icons/rx";
import { GearIcon } from '@radix-ui/react-icons';
import { FiTrash2 } from "react-icons/fi";

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
                    <RxPencil1 />
                    Edit Group
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    <div className='flex items-center gap-2 h-full text-red-500'>
                        <FiTrash2 />
                        Delete Group
                    </div>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}