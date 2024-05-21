import { Text } from "@radix-ui/themes";
import Clerk from "./Clerk";

export default function Navbar() {
    return (
        <>
            <div className="bg-slate-100 p-4 flex flex-row justify-between items-center">
                <Text className="text-2xl font-bold text-slate-900">Location App</Text>
                <div className="flex flex-row justify-center items-center gap-2">
                    <Clerk />
                </div>
            </div>
        </>
    );
}