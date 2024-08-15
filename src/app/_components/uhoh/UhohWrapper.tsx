import { Box, Flex } from "@radix-ui/themes";
import React from "react";

interface UhohWrapperProps {
    children: React.ReactNode;
}

export default function UhohWrapper({ children }: UhohWrapperProps) {
    // TODO: Center this thing :D
    return (
        <div className="">
            <Flex direction="column" align="center" gap="10">
                {children}
            </Flex>
        </div>
    );
}