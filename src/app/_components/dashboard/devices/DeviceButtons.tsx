import { Popover, Button } from "@radix-ui/themes";
import { GearIcon } from "@radix-ui/react-icons";
import EditDeviceDialog from "./EditDeviceDialog";
import DeleteDeviceDialog from "./DeleteDeviceDialog";
import { IoSettingsSharp } from "react-icons/io5";
import * as Dialog from '@radix-ui/react-dialog';
import { useState } from "react";

export default function DeviceButtons() {
    return (
        <>
            <div className="flex flex-row gap-5 mt-1">
                <EditDeviceDialog />
                <DeleteDeviceDialog />
            </div>
        </>
    );
}
