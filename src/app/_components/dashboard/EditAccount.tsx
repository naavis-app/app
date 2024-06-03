/* to edit your account. this page is a little annoying,
it doesnt update immediately which is something that needs to be worked on later.
*/

"use client";

import {
    Card,
    Heading,
    Box,
    Text,
    Flex,
    TextField,
    Button,
    Container
} from '@radix-ui/themes';
import NextLink from "next/link";
import toast from 'react-hot-toast';
import { useAtom } from 'jotai';
import { userAtom } from '~/server/lib/stores';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import EditableInput from '../edit-account/EditInput';
import { edit } from '~/server/lib/auth';

export default function EditAccount() {
    const [user, setUser] = useAtom(userAtom);
    const [file, setFile] = useState(null);
    const [check, setCheck] = useState(true);
    const router = useRouter();

    const handleSubmit = async (e: FormData) => {
        e.append('userId', user?.id ?? "");
        let response = await edit(e);

        if (response.error) {
            toast.error(response.error);
        } else {
            toast.success("Account updated successfully!");
            setUser(response.user || null);
        }

        if (file) {
            const imageFormData = new FormData();
            imageFormData.append('file', file);
            imageFormData.append('userId', user?.id ?? "");

            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: imageFormData,
                });

                const data = await response.json();
                console.log(data.status);

                if (data.success) {
                    toast.success("Image file uploaded successfully!");
                } else {
                    toast.error("Image file upload failed!");
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    };

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    }

    return (

        <form action={(e: FormData) => {
            setCheck(false);
            handleSubmit(e);
        }}>
            <Box mb={"5"}>
                <Text size={"2"} weight="medium" mb={"1"}>
                    First Name
                </Text>
                <EditableInput name="firstname"
                    placeholder="first name" check={check} />
            </Box>
            <Box mb={"5"}>
                <Text size={"2"} weight="medium" mb={"1"}>
                    Last Name
                </Text>
                <EditableInput name="lastname"
                    placeholder="last name" check={check} />
            </Box>
            <Box mb={"5"}>
                <Text size={"2"} weight="medium" mb={"1"}>
                    Email
                </Text>
                <EditableInput name="email"
                    placeholder="email" check={check} />
            </Box>
            <Box mb={"5"}>
                <Text size={"2"} weight="medium" mb={"1"}>
                    Username
                </Text>
                <EditableInput name="username"
                    placeholder="username" check={check} />
            </Box>
            <Box mb={"5"} position="relative">
                <Text size={"2"} weight="medium" mb={"1"}>
                    Profile Picture
                </Text>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </Box>
            <Flex justify="end" gap={"3"} mt={"6"}>
                <NextLink href="edit-password">
                    <Button size={"2"} variant="soft" type="button">
                        Edit Password
                    </Button>
                </NextLink>
                <Button size={"2"} variant="solid" type="submit">
                    Save
                </Button>
            </Flex>
        </form>
    )
}