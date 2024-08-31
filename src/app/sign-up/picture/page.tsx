"use client";

import { Box, Button, Card, Flex, Heading } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { validateRequest } from "~/server/lib/auth";
import { userAtom } from "~/server/lib/stores";

export default function Page() {
	const router = useRouter();
	const [user, setUser] = useAtom(userAtom);
	const [file, setFile] = useState<Blob | null>(null);

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

	const handleSubmit = async () => {
		if (!file) {
			toast.error("You must upload a file!");
		}

		const imageFormData = new FormData();
		if (file) {
			imageFormData.append("file", file);
		}
		imageFormData.append("userId", user?.id ?? "");

		try {
			const response = await fetch("/api/upload", {
				method: "POST",
				body: imageFormData,
			});

			const data = await response.json();

			if (data.success) {
				toast.success("Image file uploaded successfully!");
				router.push("/dashboard");
			} else {
				toast.error("Image file upload failed!");
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const handleSubmitDefault = async () => {
		const imageFormData = new FormData();
		imageFormData.append("userId", user?.id ?? "");

		try {
			const response = await fetch("/api/upload-d", {
				method: "POST",
				body: imageFormData,
			});

			const data = await response.json();

			if (data.success) {
				toast.success("Default file uploaded successfully!");
				router.push("/dashboard");
			} else {
				toast.error("Default file upload failed!");
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	return (
		<div
			className="mt-20 flex h-full w-full flex-1 flex-col 
        items-center justify-center overflow-scroll"
		>
			<Card size={"4"} variant="surface" className="w-[300px] md:w-[400px]">
				<Heading size={"6"} mb="6">
					Upload a Profile Picture
				</Heading>
				<form action={handleSubmit}>
					<Box mb={"5"} position="relative">
						<input type="file" accept="image/*" onChange={handleFileChange} />
					</Box>
					<Flex justify="end" gap={"3"} mt={"6"}>
						<Button
							type="button"
							size={"2"}
							variant="soft"
							onClick={handleSubmitDefault}
						>
							Keep Default
						</Button>
						<Button size={"2"} variant="solid" type="submit">
							Continue
						</Button>
					</Flex>
				</form>
			</Card>
		</div>
	);
}
