"use client";

import PageTransitionEffect from "../_components/PageTransitionEffect";
import SideNav from "../_components/dashboard/SideNav";
import { Box } from "@radix-ui/themes";
import React from "react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="relative flex grow gap-4 bg-[--accent-4]">
                <SideNav />

                <Box className="relative max-h-[100vh] w-full overflow-y-scroll rounded-md p-8">
                    <PageTransitionEffect>{children}</PageTransitionEffect>
                </Box>
            </div>
        </>
    );
}
