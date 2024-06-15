import {
    DropdownMenu,
    Button,
} from '@radix-ui/themes';
import { RxPencil1 } from "react-icons/rx";
import { GearIcon } from '@radix-ui/react-icons';
import { FiTrash2 } from "react-icons/fi";

export default function DeviceDropdown() {
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
                    Edit Device
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    <div className='flex items-center gap-2 h-full text-red-500'>
                        <FiTrash2 />
                        Delete Device
                    </div>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}