/* dashboard page where we currently have our map set up. 
will be updated heavily in the future */

"use client";

import SideNav from "../_components/dashboard/SideNav";
import { Box, Card } from "@radix-ui/themes";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="relative flex grow gap-4 bg-[--accent-4]">
                <SideNav />
                <Box className="relative max-h-[100vh] w-full overflow-y-scroll rounded-md p-8">
                    {children}
                </Box>
            </div>
        </>
    );
}
