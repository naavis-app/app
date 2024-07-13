import EditDeviceDialog from "./EditDeviceDialog";
import DeleteDeviceDialog from "./DeleteDeviceDialog";

export default function DeviceButtons() {
    return (
        <>
            <div className="mt-1 flex flex-row gap-5">
                <EditDeviceDialog />
                <DeleteDeviceDialog />
            </div>
        </>
    );
}
