import EditDeviceDialog from "./EditDeviceDialog";
import DeleteDeviceDialog from "./DeleteDeviceDialog";
import { api } from "~/trpc/react";
import { useAtom } from "jotai";
import { userAtom } from "~/server/lib/stores";

export default function DeviceButtons({ deviceId }: { deviceId: string }) {
    const [user, setUser] = useAtom(userAtom);

    const deviceQuery = api.device.list.useQuery({
        userId: user?.id || "",
    });

    return (
        <>
            <div className="mt-1 flex flex-row gap-5">
                <EditDeviceDialog 
                refetch={
                    () => deviceQuery.refetch()
                }
                deviceId={deviceId} 
                />
                <DeleteDeviceDialog />
            </div>
        </>
    );
}
