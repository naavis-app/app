"use client";

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { env } from '~/env';

export default function Dashboard() {
  const position = { lat: 53.54992, lng: 10.00678 };

  return (
    <>
      <div className="relative flex-1 grow w-full h-full">
        <div className='absolute w-full h-full'>
          <APIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
            <Map mapId={"7342a481321c1609"} defaultCenter={position} defaultZoom={10} streetViewControl={false}>
              <AdvancedMarker position={position} title={"test"} />
            </Map>
          </APIProvider>
        </div>
      </div>
    </>
  );
}
