"use client";

import { AspectRatio } from "@radix-ui/themes";
import {
	APIProvider,
	AdvancedMarker,
	Map as GMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import React from "react";
import { env } from "~/env";

export default function DashboardMap() {
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
	}, []);

	return (
		<>
			<AspectRatio>
				<APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
					<GMap
						mapId={"7342a481321c1609"}
						defaultCenter={position}
						center={position}
						defaultZoom={8}
						streetViewControl={false}
					>
						<AdvancedMarker position={position} title={"test"} />
					</GMap>
				</APIProvider>
			</AspectRatio>
		</>
	);
}
