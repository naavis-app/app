"use client";

import {
    Card,
    Heading,
    Box,
    Text,
    Flex,
    TextField,
    Button
} from '@radix-ui/themes';
import NextLink from "next/link";
import toast from 'react-hot-toast';
import { useAtom } from 'jotai';
import { userAtom } from '~/server/lib/stores';
import { validateRequest } from '~/server/lib/auth';
import { RxPencil1 } from 'react-icons/rx';

export default function Page() {
    const [user, setUser] = useAtom(userAtom);

    return (
        <div className='mt-20 h-full w-full
        flex flex-1 items-center justify-center
        flex-col overflow-scroll'>
            <Card
                size={"4"}
                variant="surface"
                className="w-[300px] md:w-[400px]"
            >
                <Heading size={"6"} mb="6">
                    Edit Your Account
                </Heading>
                <form>
                    <Box mb={"5"}>
                        <Text size={"2"} weight="medium" mb={"1"}>
                            First Name
                        </Text>
                        <TextField.Root
                            size={"2"}
                            variant="surface"
                            name="firstname"
                            placeholder="Enter your first name"
                            value={user?.firstname}
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
                            value={user?.lastname}
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
                            value={user?.email}
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
                            value={user?.username}
                            required
                        />
                    </Box>
                    <Box mb={"5"} position="relative">
                        <Text size={"2"} weight="medium" mb={"1"}>
                            Profile Picture
                        </Text>
                        <input
                            type="file"
                            accept="image/*"
                        />
                    </Box>
                    <Flex justify="end" gap={"3"} mt={"6"}>
                        <NextLink href="/edit-password">
                            <Button size={"2"} variant="soft">
                                Edit Password
                            </Button>
                        </NextLink>
                        <Button size={"2"} variant="solid">
                            Save
                        </Button>
                    </Flex>
                </form>
            </Card>
        </div>
    )
}