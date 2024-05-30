"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { 
    Card, 
    Heading, 
    Box, 
    Text,
    Flex,
    Button,
} from '@radix-ui/themes';
import { useAtom } from "jotai";
import { userAtom } from "~/server/lib/stores";
import { validateRequest } from "~/server/lib/auth";
import { redirect } from "next/navigation";

export default function Page() {
    const [user, setUser] = useAtom(userAtom);
    const [file, setFile] = useState(null);

    async function fetchUser() {
        const data = await validateRequest();
        setUser(data.user);
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e: any) => {
        if(!file) {
            toast.error("You must upload a file!");
        }

        const imageFormData = new FormData();
        imageFormData.append("file", file!);
        imageFormData.append("userId", user!.id);

        try {
            const response = await fetch('/api/upload', {
                method: "POST",
                body: imageFormData
            });

            const data = await response.json();
            console.log(data.status);

            if(data.success) {
                toast.success('Image file uploaded successfully!');
                return redirect('/sign-in');
            } else {
                toast.error('Image file upload failed!');
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const handleSubmitDefault = async (e: any) => {
        const imageFormData = new FormData();
        imageFormData.append("userId", user!.id);

        try {
            const response = await fetch('/api/upload-d', {
                method: "POST",
                body: imageFormData
            });

            const data = await response.json();
            console.log(data.status);

            if(data.success) {
                toast.success('Default file uploaded successfully!');
                return redirect('/sign-in');
            } else {
                toast.error('Default file upload failed!');
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div className="mt-20 flex h-full w-full flex-1 flex-col 
        items-center justify-center overflow-scroll">
            <Card
                size={"4"}
                variant="surface"
                className="w-[300px] md:w-[400px]"
            >
                <Heading size={"6"} mb="6">
                    Upload a Profile Picture
                </Heading>
                <form action={handleSubmit}>
                    <Box mb={"5"} position="relative">
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                    </Box>
                    <Flex justify="end" gap={"3"} mt={"6"}>
                            <Button type="button" size={"2"} variant="soft" onClick={handleSubmitDefault}>
                                Keep Default
                            </Button>
                            <Button size={"2"} variant="solid" >
                                Continue
                            </Button>
                    </Flex>
                </form>
            </Card>
        </div>
    );
}