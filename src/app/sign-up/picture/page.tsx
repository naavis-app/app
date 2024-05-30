"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Card, Heading, Box, Text } from '@radix-ui/themes';

export default function Page() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = async (e: any) => {
        if(!file) {
            toast.error("You must upload a file!");
        }

        setUploading(true);
        const imageFormData = new FormData();
        imageFormData.append("file", file!);

        try {
            const response = await fetch('/api/upload', {
                method: "POST",
                body: imageFormData
            });

            const data = await response.json();
            console.log(data.status);
            setUploading(false);
        } catch (error: any) {
            toast.error(error);
            setUploading(false);
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
                <Box mb={"5"} position="relative">
                    <Text size={"2"} weight="medium" mb={"1"}>
                        Profile Picture
                    </Text>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                </Box>
            </Card>

        </div>
    );
}