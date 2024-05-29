/* dashboard page where we currently have our map set up. 
will be updated heavily in the future */

"use client";

import SideNav from "../_components/dashboard/SideNav";
import { Box, Card } from "@radix-ui/themes";

export default function Dashboard({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <div className="relative flex grow gap-4 px-4 pb-4 pt-[6rem]">
                <SideNav />
                <Box className="w-full rounded-md p-4">
                    {children}
                </Box>
            </div>
        </>
    );
}
