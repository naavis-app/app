"use client";

import { CaretSortIcon } from "@radix-ui/react-icons";
import {
    Box,
    Button,
    Card,
    DropdownMenu,
    Flex,
    Table,
    Text,
    TextField,
} from "@radix-ui/themes";
import DeviceRow from "~/app/_components/dashboard/DeviceRow";

export default function DashboardDevices() {
    return (
        <>
            <Flex direction={"column"}>
                <Card size={"3"}>
                    <Flex direction={"column"}>
                        <Text size={"8"} weight={"bold"}>
                            Profile
                        </Text>
                        <Text size={"4"}>Update your profile information.</Text>

                        <Flex direction={"row"} justify={"end"}>
                            <Button>Save changes</Button>
                        </Flex>
                    </Flex>
                </Card>

                <Card className="mt-4" size={"3"}>
                    <Flex direction={"column"}>
                        <Text size={"8"} weight={"bold"}>
                            Devices
                        </Text>
                        <Text size={"4"}>Manage your device settings.</Text>

                        <Flex
                            direction={"row"}
                            justify={"between"}
                            className="mt-4"
                        >
                            <Button variant="outline">Add device</Button>
                            <Button>Save changes</Button>
                        </Flex>
                    </Flex>
                </Card>

                <Card className="mt-4" size={"3"}>
                    <Flex direction={"column"}>
                        <Text size={"8"} weight={"bold"}>
                            Emergency Contacts
                        </Text>
                        <Text size={"4"}>Manage your emergency contacts.</Text>

                        <Flex
                            direction={"row"}
                            justify={"between"}
                            className="mt-4"
                        >
                            <Button variant="outline">Add contact</Button>
                            <Button>Save changes</Button>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </>
    );
}
