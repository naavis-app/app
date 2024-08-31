import { useAtom } from "jotai";
import React from "react";
import { userAtom } from "~/server/lib/stores";
import { api } from "~/trpc/react";
import DeleteDeviceDialog from "./DeleteDeviceDialog";
import EditDeviceDialog from "./EditDeviceDialog";

export default function DeviceButtons({ deviceId }: { deviceId: string }) {
	const [user] = useAtom(userAtom);

	const deviceQuery = api.device.list.useQuery({
		userId: user?.id || "",
	});

	return (
		<>
			<div className="mt-1 flex flex-row gap-5">
				<EditDeviceDialog
					refetch={() => deviceQuery.refetch()}
					deviceId={deviceId}
				/>
				<DeleteDeviceDialog
					refetch={() => deviceQuery.refetch()}
					deviceId={deviceId}
				/>
			</div>
		</>
	);
}
