"use client";

import { Card, Flex } from "@radix-ui/themes";
// import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
// import { env } from "~/env";
import React from "react";

export default function DashboardHome() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [position, setPosition] = useState<google.maps.LatLngLiteral>({
        lat: 0,
        lng: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const t = performance.now();
            const lat = Math.sin(t / 2000) * 5;
            const lng = Math.cos(t / 3000) * 5;

            setPosition({ lat, lng });
        }, 1000 / 60);

        return () => clearInterval(interval);
    });

    return (
        <>
            <Flex direction={"column"} gap={"4"} className="h-full">
                <Card className="flex-grow">
                    <p>Top</p>
                </Card>
                <Flex direction={"row"}>
                    <Card className="flex-grow">
                        <p>Left</p>
                    </Card>
                    <Card className=" flex-grow">
                        <p>Right</p>
                    </Card>
                </Flex>
            </Flex>
        </>
    );
}
