import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Pencil1Icon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Table, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface Device {
    name: string;
    id: string;
    type: string;
    lastUpdated: Date;
    latitude: number;
    longitude: number;
}

interface DeviceRowProps {
    device: Device;
}

export default function deviceRow({ device }: DeviceRowProps) {
    const [icon, setIcon] = useState("");

    useEffect(() => {
        if (device.type === "Phone") {
            setIcon("mdi:cellphone");
        } else if (device.type === "Tablet") {
            setIcon("mdi:tablet");
        } else if (device.type === "Laptop") {
            setIcon("mdi:laptop");
        } else if (device.type === "Desktop") {
            setIcon("ph:computer-tower");
        } else if (device.type === "Smartwatch") {
            setIcon("mdi:watch");
        }
    }, []);

    return (
        <>
            <Flex direction={"row"} justify={"between"} className="m-2 p-2">
                <Box>
                    <Flex direction={"row"} justify={"center"} align={"center"} gap="3">
                        <Icon icon={icon} width={24} height={24} />
                        <Flex direction={"column"}>
                            <Text>{device.name}</Text>
                            <Text size={"2"}>{`Last updated a million years ago`}</Text>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}
