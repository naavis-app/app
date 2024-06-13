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

const deviceIconMap: { [key: string]: string } = {
    phone: 'mdi:cellphone',
    tablet: 'mdi:tablet',
    laptop: 'mdi:laptop',
    desktop: 'ph:computer-tower',
    smartwatch: 'mdi:watch',
}

export default function DeviceRow({ device, viewMode }: DeviceRowProps) {
    const [lastUpdated, setLastUpdated] = useState("...");
    const icon = deviceIconMap[device.type];
    const updateDate = new Date(device.lastLocationUpdate);
    const currentDate = new Date();

    const diffYear = currentDate.getFullYear() - updateDate.getFullYear();
    const diffMonth = currentDate.getMonth() - updateDate.getMonth();
    const diffDays = currentDate.getDate() - updateDate.getDate();
    const diffHours = currentDate.getHours() - updateDate.getHours();
    const diffMinutes = currentDate.getMinutes() - updateDate.getMinutes();
    const diffSeconds = currentDate.getSeconds() - updateDate.getSeconds();

    useEffect(() => {
        if (diffYear !== 0) {
            if(diffYear === 1) {
                setLastUpdated(`${diffYear} year`);
            } else {
                setLastUpdated(`${diffYear} years`);
            }
        } else if (diffMonth !== 0) {
            if(diffMonth === 1) {
                setLastUpdated(`${diffMonth} month`);
            } else {
                setLastUpdated(`${diffMonth} months`);
            }
        } else if (diffDays !== 0) {
            if(diffDays === 1) {
                setLastUpdated(`${diffDays} day`);
            } else {
                setLastUpdated(`${diffDays} days`);
            }
        } else if (diffHours !== 0) {
            if(diffHours === 1) {
                setLastUpdated(`${diffHours} hour`);
            } else {
                setLastUpdated(`${diffHours} hours`);
            }
        } else if (diffMinutes !== 0) {
            if(diffMinutes === 1) {
                setLastUpdated(`${diffMinutes} minute`);
            } else {
                setLastUpdated(`${diffMinutes} minutes`);
            }
        } else if (diffSeconds !== 0) {
            if(diffSeconds === 1) {
                setLastUpdated(`${diffSeconds} second`);
            } else {
                setLastUpdated(`${diffSeconds} seconds`);
            }
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
                            <Icon icon={icon!} width={24} height={24} />
                            <Flex direction={"column"}>
                                <Text>{device.name}</Text>
                                <Text
                                    size={"2"}
                                    color={"gray"}
                                >{`Last updated ${lastUpdated} ago`}</Text>
                            </Flex>
                        </Flex>
                    </Box>
                </Flex>
            </>
        );
    } else {
        return (
            <>
                <Card className="h-fit p-2 w-[260px]">
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
                            <Icon icon={icon!} width={24} height={24} />
                            <Flex direction={"column"}>
                                <Text>{device.name}</Text>
                                <Text
                                    size={"2"}
                                    color={"gray"}
                                >{`Last updated ${lastUpdated} ago`}</Text>
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
