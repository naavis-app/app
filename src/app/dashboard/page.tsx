/* dashboard page where we currently have our map set up. 
will be updated heavily in the future */

"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { env } from "~/env";
import SideNav from "../_components/dashboard/SideNav";
import { Box, Card } from "@radix-ui/themes";

export default function Dashboard() {
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
            <div className="relative flex grow gap-4 px-4 pb-4 pt-[6rem]">
                <SideNav />
                <Box className="w-full rounded-md">
                    <div className="h-full w-full rounded-md bg-slate-300">
                        test
                    </div>
                    {/* <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                        <Map
                            mapId={"7342a481321c1609"}
                            defaultCenter={position}
                            center={position}
                            defaultZoom={8}
                            streetViewControl={false}
                        >
                            <AdvancedMarker
                                position={position}
                                title={"test"}
                            />
                        </Map>
                    </APIProvider> */}
                </Box>
            </div>
        </>
    );
}
