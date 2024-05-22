"use client";

import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Text,
    TextField,
} from "@radix-ui/themes";

import NextLink from "next/link";
import { signup } from "~/server/lib/auth";

export default function Page() {
    return (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
            <div className="w-[400px]">
                <Card size={"4"} variant="surface" style={{ width: "400px" }}>
                    <Heading size={"6"} mb="6">
                        Create an Account
                    </Heading>
                    <form action={signup}>
                        <Box mb={"5"}>
                            <Text size={"2"} weight="medium" mb={"1"}>
                                First Name
                            </Text>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="firstname"
                                placeholder="Enter your first name"
                                required
                            />
                        </Box>
                        <Box mb={"5"}>
                            <Text size={"2"} weight="medium" mb={"1"}>
                                Last Name
                            </Text>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="lastname"
                                placeholder="Enter your last name"
                                required
                            />
                        </Box>
                        <Box mb={"5"}>
                            <Text size={"2"} weight="medium" mb={"1"}>
                                Email
                            </Text>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="email"
                                placeholder="Enter your email"
                                required
                            />
                        </Box>
                        <Box mb={"5"}>
                            <Text size={"2"} weight="medium" mb={"1"}>
                                Username
                            </Text>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="username"
                                placeholder="Enter your username"
                                required
                            />
                        </Box>
                        <Box mb={"5"} position="relative">
                            <Text size={"2"} weight="medium" mb={"1"}>
                                Password
                            </Text>
                            <TextField.Root
                                size={"2"}
                                variant="surface"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                required
                            />
                        </Box>
                        <Flex justify="end" gap={"3"} mt={"6"}>
                            <NextLink href="/sign-in">
                                <Button size={"2"} variant="soft">
                                    I already have an account
                                </Button>
                            </NextLink>
                            <Button size={"2"} variant="solid">
                                Continue
                            </Button>
                        </Flex>
                    </form>
                </Card>
            </div>
        </div>
    );
}
