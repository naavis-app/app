import EditGroupDialog from "./EditGroupDialog";
import DeleteGroupDialog from "./DeleteGroupDialog";
import { useAtom } from "jotai";
import { userAtom } from "~/server/lib/stores";
import { api } from "~/trpc/react";

export default function GroupButtons({ groupId } : { groupId: string }) {
    const [user, setUser] = useAtom(userAtom);

    const groupQuery = api.device.list.useQuery({
        userId: user?.id || "",
    });

    return (
        <>
            <div className="mt-1 flex flex-row gap-5">
                <EditGroupDialog 
                refetch={
                    () => groupQuery.refetch()
                }
                groupId={groupId}
                />
                <DeleteGroupDialog />
            </div>
        </>
    )
}