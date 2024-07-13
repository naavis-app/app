import EditGroupDialog from "./EditGroupDialog";
import DeleteGroupDialog from "./DeleteGroupDialog";

export default function GroupButtons() {
    return (
        <>
            <div className="mt-1 flex flex-row gap-5">
                <EditGroupDialog />
                <DeleteGroupDialog />
            </div>
        </>
    )
}