import { Popover, Button } from "@radix-ui/themes";
import { GearIcon } from "@radix-ui/react-icons";
import EditDeviceDialog from "./EditDeviceDialog";
import DeleteDeviceDialog from "./DeleteDeviceDialog";
import { IoSettingsSharp } from "react-icons/io5";
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from "react";

export default function DeviceDropdown() {
    return (
        <>
            <Popover.Root>
                <Popover.Trigger>
                    <Button variant={"ghost"}>
                        <IoSettingsSharp />
                    </Button>
                </Popover.Trigger>
                <Popover.Content>
                    <div className="flex flex-col gap-3">
                        <EditDeviceDialog />
                        <DeleteDeviceDialog />
                    </div>
                </Popover.Content>
            </Popover.Root>
        </>
    );
}
