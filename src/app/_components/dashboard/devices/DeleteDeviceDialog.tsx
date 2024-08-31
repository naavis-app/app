/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button, Dialog } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { selectedGroupId, userAtom } from "~/server/lib/stores";
import { themeAtom } from "~/server/lib/stores";
import EditableInput from "../../edit-account/EditInput";

import { api } from "~/trpc/react";

interface DeleteDeviceProps {
	refetch: () => void;
	deviceId: string;
}

export default function DeleteDeviceDialog({
	refetch,
	deviceId,
}: DeleteDeviceProps) {
	const [user] = useAtom(userAtom);

	const [dialogOpen, setDialogOpen] = useState<boolean>(false);
	const [deletingDevice, setDeletingDevice] = useState(false);

	const [deviceName, setDeviceName] = useState("");

	const { mutate, error } = api.device.read.useMutation({
		onSuccess: (device) => {
			setDeviceName(device.name);
			setDialogOpen(true);
		},
		onError: () => {
			toast.error("Failed to get device!");
			setDialogOpen(false);
			setDeviceName(deviceName);
		},
	});

	const deviceDeleteQuery = api.device.delete.useMutation({
		onSuccess: () => {
			toast.success(`${deviceName} has been deleted!`);
			setDeviceName("");

			setDeletingDevice(false);
			setDialogOpen(false);
			refetch();
		},
		onError: () => {
			toast.error(`Failed to update ${deviceName}!`);

			setDeletingDevice(false);
			setDialogOpen(false);
		},
	});

	useEffect(() => {
		if (deletingDevice) {
			readDevice();
		}
	}, [deletingDevice]);

	const deleteDevice = () => {
		if (deletingDevice) return;
		if (!user) {
			setDialogOpen(false);
			return toast.error("You must be logged in to delete a device!");
		}

		setDeletingDevice(true);

		deviceDeleteQuery.mutate({
			id: deviceId,
			userId: user.id,
		});
	};

	const readDevice = () => {
		if (!user) {
			return toast.error("You must be logged in to edit a device!");
		}
		mutate({ id: deviceId, userId: user.id });
	};

	if (error) {
		toast.error("Couldn't get the device!");
	}

	return (
		<Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
			<Dialog.Trigger onClick={() => setDialogOpen(!dialogOpen)}>
				<Button
					variant="ghost"
					color="red"
					className="flex h-full items-center gap-2"
				>
					<FiTrash2 />
				</Button>
			</Dialog.Trigger>
			<Dialog.Content maxWidth={"400px"}>
				<Dialog.Title align={"center"}>Delete Your Device</Dialog.Title>

				<div className="flex flex-col gap-2">
					<div className="flex flex-col text-center">
						<p className="text-red-400">This is a destructive action.</p>{" "}
						<p>
							All device data for this device will be deleted. Are you sure you
							want to delete this device?
						</p>
					</div>
					<div className="mt-2 flex items-center justify-between">
						<Button onClick={() => setDialogOpen(false)} variant="ghost">
							Cancel
						</Button>
						<Button
							onClick={deleteDevice}
							disabled={deletingDevice}
							variant="solid"
							color="red"
						>
							Yes, I&apos;m sure
						</Button>
					</div>
				</div>
			</Dialog.Content>
		</Dialog.Root>
	);
}

/* UNFINISHED. DO NOT EDIT */
