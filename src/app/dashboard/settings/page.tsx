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
                <Text size={"8"} weight={"bold"}>
                    Account Settings
                </Text>
                <Text size={"4"}>Change your account settings</Text>
            </Flex>
        </>
    );
}
