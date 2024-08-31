/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button, Dialog } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import React from "react";
import toast from "react-hot-toast";
import { FiTrash2 } from "react-icons/fi";
import { selectedGroupId, userAtom } from "~/server/lib/stores";
import { api } from "~/trpc/react";

interface DeleteGroupProps {
	refetch: () => void;
	groupId: string;
}

export default function DeleteGroupDialog({
	refetch,
	groupId,
}: DeleteGroupProps) {
	const [user, setUser] = useAtom(userAtom);

	const [dialogOpen, setDialogOpen] = useState(false);
	const [deletingGroup, setDeletingGroup] = useState(false);

	const [groupName, setGroupName] = useState("");

	const { mutate, error } = api.group.read.useMutation({
		onSuccess: (group) => {
			setGroupName(group.name);
			setDialogOpen(true);
		},
		onError: () => {
			toast.error("Failed to get group!");

			setGroupName(groupName);
		},
	});

	const groupDeleteQuery = api.group.delete.useMutation({
		onSuccess: () => {
			toast.success(`${groupName} has been deleted!`);
			setGroupName("");

			setDeletingGroup(false);
			setDialogOpen(false);
			refetch();
		},
		onError: () => {
			toast.error(`Failed to update ${groupName}!`);

			setDeletingGroup(false);
			setDialogOpen(false);
		},
	});

	useEffect(() => {
		if (deletingGroup) {
			readGroup();
		}
	}, [deletingGroup]);

	const deleteGroup = () => {
		if (deletingGroup) return;
		if (!user) {
			setDialogOpen(false);
			return toast.error("You must be logged in to delete a group!");
		}

		setDeletingGroup(true);

		groupDeleteQuery.mutate({
			id: groupId,
			userId: user.id,
		});
	};

	const readGroup = () => {
		if (!user) {
			return toast.error("You must be logged in to edit a group!");
		}

		mutate({ id: groupId, userId: user.id });
	};

	if (error) {
		toast.error("Couldn't get the group!");
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
				<Dialog.Title align={"center"}>Delete Your Group</Dialog.Title>

				<div className="flex flex-col gap-2">
					<div className="flex flex-col text-center">
						<p className="text-red-400">This is a destructive action.</p>{" "}
						<p>
							All group data for this group, including places and connected
							members, &#40;not member data&#41; will be deleted. Are you sure
							you want to delete this group?
						</p>
					</div>
					<div className="mt-2 flex items-center justify-between">
						<Button onClick={() => setDialogOpen(false)} variant="ghost">
							Cancel
						</Button>
						<Button
							onClick={deleteGroup}
							disabled={deletingGroup}
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
