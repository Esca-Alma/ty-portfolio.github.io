import MapWrapper from "@/components/MapWrapper";
import "leaflet/dist/leaflet.css";
import { Suspense } from "react";

export const metadata = {
  title: "GTFS Route Editor Map",
};

export default function RouteMapPage() {
  return (
    <div className="bg-gray-900 min-h-screen text-white font-sans">
      <Suspense fallback={<div className="text-gray-500 p-8">Loading map parameters...</div>}>
        <MapWrapper projectId="1" />
      </Suspense>
    </div>
  );
}
