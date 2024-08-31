import { useAtom } from "jotai";
import React from "react";
import { userAtom } from "~/server/lib/stores";
import { api } from "~/trpc/react";
import DeleteGroupDialog from "./DeleteGroupDialog";
import EditGroupDialog from "./EditGroupDialog";

export default function GroupButtons({ groupId }: { groupId: string }) {
	const [user] = useAtom(userAtom);

	const groupQuery = api.device.list.useQuery({
		userId: user?.id || "",
	});

	return (
		<>
			<div className="mt-1 flex flex-row gap-5">
				<EditGroupDialog
					refetch={() => groupQuery.refetch()}
					groupId={groupId}
				/>
				<DeleteGroupDialog
					refetch={() => groupQuery.refetch()}
					groupId={groupId}
				/>
			</div>
		</>
	);
}
