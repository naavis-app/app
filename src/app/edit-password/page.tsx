"use client";

import {
    Card,
    Heading,
    Box,
    Button,
    Flex,
    TextField
} from '@radix-ui/themes';
import NextLink from 'next/link';

export default function Page() {
    return (
        <div className="mt-20 flex h-full w-full flex-1 flex-col 
        items-center justify-center overflow-scroll">
            <Card
                size={"4"}
                variant="surface"
                className="w-[300px] md:w-[400px]"
            >
                <Heading size={"6"} mb="6">
                    Edit Your Password
                </Heading>
                <form>
                    <Box mb={"5"}>
                        <TextField.Root
                            size={"2"}
                            variant="surface"
                            name="password"
                            placeholder="Enter a new password"
                        >
                        </TextField.Root>
                    </Box>
                    <Flex gap={"2"}>
                        <NextLink href="/edit-account">
                            <Button size={"3"} variant="surface">
                                Back
                            </Button>
                        </NextLink>
                        <Button size={"3"} variant="solid">
                            Save
                        </Button>
                    </Flex>
                </form>
            </Card>
        </div>
    )   
}