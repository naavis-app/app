/* to edit your account. this page is a little annoying,
it doesnt update immediately which is something that needs to be worked on later.
*/

"use client";

import {
    Box,
    Text,
    Flex,
    Button,
} from "@radix-ui/themes";
import NextLink from "next/link";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { userAtom } from "~/server/lib/stores";
import { useState } from "react";
import EditableInput from "../edit-account/EditInput";
import { edit } from "~/server/lib/auth";
import { useDropzone } from "react-dropzone";
import React from "react";

export default function EditAccount() {
    const [check, setCheck] = useState<boolean>(true);
    const [user, setUser] = useAtom(userAtom);
    const [file, setFile] = useState<File | null>(null);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            "image/jpeg": [".jpeg", ".jpg"],
            "image/png": [".png"],
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0] || null);
        },
    });

    const handleSubmit = async (e: FormData) => {
        e.append("userId", user?.id ?? "");
        const response = await edit(e);

        if (response.error) {
            toast.error(response.error);
        } else {
            toast.success("Account updated successfully!");
            setUser(response.user || null);
        }

        if (file) {
            const imageFormData = new FormData();
            imageFormData.append("file", file);
            imageFormData.append("userId", user?.id ?? "");

            try {
                const response = await fetch("/api/upload", {
                    method: "POST",
                    body: imageFormData,
                });

                const data = await response.json();

                if (data.success) {
                    toast.success("Account edited successfully!");
                } else {
                    toast.error("Account edit failed!");
                }
            } catch (error: any) {
                toast.error(error.message);
            }
        }
    };

    return (
        <form
            onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                setCheck(false);
                setTimeout(() => { // after the data is un-disabled, needs a moment
                    handleSubmit(new FormData(e.target as HTMLFormElement));
                }, 1000);
            }}
        >
            <Box mb={"5"}>
                <Text size={"2"} weight="medium" mb={"1"}>
                    First Name
                </Text>
                <EditableInput
                    name="firstname"
                    placeholder="first name"
                    check={check}
                />
            </Box>
            <Box mb={"5"}>
                <Text size={"2"} weight="medium" mb={"1"}>
                    Last Name
                </Text>
                <EditableInput
                    name="lastname"
                    placeholder="last name"
                    check={check}
                />
            </Box>
            <Box mb={"5"}>
                <Text size={"2"} weight="medium" mb={"1"}>
                    Email
                </Text>
                <EditableInput name="email" placeholder="email" check={check} />
            </Box>
            <Box mb={"5"}>
                <Text size={"2"} weight="medium" mb={"1"}>
                    Username
                </Text>
                <EditableInput
                    name="username"
                    placeholder="username"
                    check={check}
                />
            </Box>
            <Box mb={"5"} position="relative">
                <Text size={"2"} weight="medium" mb={"1"}>
                    Profile Picture
                </Text>
                {file ? (
                    <>
                        <img
                            src={URL.createObjectURL(file)}
                            alt="Selected"
                            className="h-32 w-32 object-cover"
                        />
                        <Button onClick={() => setFile(null)}>Try again</Button>
                    </>
                ) : (
                    <div
                        {...getRootProps()}
                        className="rounded-lg border-2 
                        border-dashed border-gray-300/50 
                        p-4 text-center"
                    >
                        <input {...getInputProps()} />
                        <p className="select-none text-gray-500">
                            Drag &apos;n&apos; drop or click to select
                        </p>
                    </div>
                )}
            </Box>
            <Flex justify="end" gap={"3"} mt={"6"}>
                <NextLink href="edit-password"></NextLink>
                <Button size={"2"} variant="solid" type="submit">
                    Save
                </Button>
            </Flex>
        </form>
    );
}
