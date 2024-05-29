"use client";

import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { env } from "~/env";

export default function DashboardHome() {
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
            <p>Dashboard home!!!</p>
        </>
    );
}
