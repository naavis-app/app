import {
	APIProvider,
	AdvancedMarker,
	Map as GMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import React from "react";
import { env } from "~/env";

interface MiniMapProps {
	name: string;
	longitude: number;
	latitude: number;
}

export default function MiniMapPreview({
	name,
	longitude,
	latitude,
}: MiniMapProps) {
	const [position, setPosition] = useState({ lat: latitude, lng: longitude });

	useEffect(() => {
		const interval = setInterval(() => {
			const t = performance.now() * latitude * longitude;
			const lat = Math.sin(t / 90000) / 100;
			const lng = Math.cos(t / 90000) / 100;

			setPosition({ lat: lat + latitude, lng: lng + longitude });
		}, 1000 / 1);

		return () => clearInterval(interval);
	});

	return (
		<>
			<APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
				<GMap
					mapId={"7342a481321c1609"}
					defaultCenter={position}
					center={position}
					defaultZoom={8}
					streetViewControl={false}
				>
					<AdvancedMarker position={position} title={name} />
				</GMap>
			</APIProvider>
		</>
	);
}
