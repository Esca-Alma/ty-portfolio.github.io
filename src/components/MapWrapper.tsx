"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

// React-Leaflet requires the window object which causes errors during SSR.
// We dynamically import the MapApp component here with SSR disabled.
const MapApp = dynamic(() => import("@/components/MapApp"), {
  ssr: false,
  loading: () => <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-teal-500">Loading Map Engine...</div>
});

export default function MapWrapper({ projectId }: { projectId: string }) {
  const searchParams = useSearchParams();
  const agencyId = searchParams.get("agencyId") || undefined;
  const routeId = searchParams.get("routeId") || undefined;
  return <MapApp projectId={projectId} agencyId={agencyId} routeId={routeId} />;
}
