import {
    DropdownMenu,
    Button,
} from '@radix-ui/themes';
import { GearIcon } from '@radix-ui/react-icons';
import EditDeviceDialog from './EditDeviceDialog';
import DeleteDeviceDialog from './DeleteDeviceDialog';
import { 
    IoSettingsSharp, 
} from "react-icons/io5";

export default function DeviceDropdown() {
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button variant={"ghost"}>
                        <IoSettingsSharp />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Item>
                    <EditDeviceDialog />
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                    <DeleteDeviceDialog />
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}