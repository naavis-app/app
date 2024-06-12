import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import {
    GearIcon,
    Pencil1Icon,
    ReloadIcon,
    TrashIcon,
} from "@radix-ui/react-icons";
import {
    AspectRatio,
    Badge,
    Box,
    Button,
    Card,
    Flex,
    Table,
    Text,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import MiniMapPreview from "../MiniMapPreview";
import { Device } from "@prisma/client";

interface DeviceRowProps {
    device: Device;
    viewMode: string;
}

export default function DeviceRow({ device, viewMode }: DeviceRowProps) {
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

    if (viewMode == "list") {
        return (
            <>
                <Flex direction={"row"} justify={"between"} className="m-2 p-2">
                    <Box>
                        <Flex
                            direction={"row"}
                            justify={"center"}
                            align={"center"}
                            gap="3"
                        >
                            <Icon icon={icon} width={24} height={24} />
                            <Flex direction={"column"}>
                                <Text>{device.name}</Text>
                                <Text
                                    size={"2"}
                                    color={"gray"}
                                >{`Last updated a million years ago`}</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </>
        );
    } else {
        return (
            <>
                <Card className="h-fit w-fit p-2">
                    <AspectRatio
                        ratio={8 / 5}
                        className="mb-2 overflow-hidden rounded-md shadow-md"
                    >
                        <MiniMapPreview
                            name={device.name}
                            latitude={device.latitude}
                            longitude={device.longitude}
                        />
                    </AspectRatio>
                    <Flex direction={"column"}>
                        <Flex direction={"row"} gap={"2"} align={"center"}>
                            <Icon icon={icon} width={24} height={24} />
                            <Flex direction={"column"}>
                                <Text>{device.name}</Text>
                                <Text
                                    size={"2"}
                                    color={"gray"}
                                >{`Last updated a million years ago`}</Text>
                            </Flex>
                        </Flex>
                        <Flex
                            className="mt-2"
                            direction={"row"}
                            gap={"2"}
                            justify={"between"}
                        >
                            <Badge color={"green"}>{device.connection}</Badge>

                            <Button variant={"ghost"}>
                                <GearIcon />
                            </Button>
                        </Flex>
                    </Flex>
                </Card>
            </>
        );
    }
}
