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
    DropdownMenu,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import MiniMapPreview from "../MiniMapPreview";
import { Device } from "@prisma/client";
import DeviceButtons from "./DeviceButtons";

interface DeviceRowProps {
    device: Device;
    viewMode: string;
}

const deviceIconMap: { [key: string]: string } = {
    phone: "mdi:cellphone",
    tablet: "mdi:tablet",
    laptop: "mdi:laptop",
    desktop: "ph:computer-tower",
    smartwatch: "mdi:watch",
};

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

    const time = [
        { value: diffYear, singular: 'year', plural: 'years' },
        { value: diffMonth, singular: 'month', plural: 'months' },
        { value: diffDays, singular: 'day', plural: 'days' },
        { value: diffHours, singular: 'hour', plural: 'hours' },
        { value: diffMinutes, singular: 'minute', plural: 'minutes' },
        { value: diffSeconds, singular: 'second', plural: 'seconds' },
    ];

    useEffect(() => {
        if (currentDate.getDate() >= 1 &&
            currentDate.getDate() <= 15 &&
            updateDate.getDate() >= 20 &&
            updateDate.getDate() <= 31 && diffMonth <= 1) {
                time[2]!.value = (updateDate.getDate() + 
                currentDate.getDate()) - updateDate.getDate();
                time[1]!.value = 0;
            }

        for (const { value, singular, plural } of time) {
            if (value !== 0) {
                setLastUpdated(`${value} ${value === 1 ? singular : plural}`);
                break;
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
                    <DeviceButtons />
                </Flex>
            </>
        );
    } else {
        return (
            <>
                <Card className="h-fit w-[260px] p-2">
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

                            <DeviceButtons />
                        </Flex>
                    </Flex>
                </Card>
            </>
        );
    }
}
