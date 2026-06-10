"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Link from "next/link";

// Fix Leaflet's default icon path issues in environments like Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Stop = {
  id?: number;
  name?: string;
  lat: number;
  lng: number;
};

type Mode = "view" | "add_stop" | "edit_route";

//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const API_URL = "https://windy-art-420311.uc.r.appspot.com/api/v1"; //git hub actionsの環境変数が動かないためハードコーディング
export default function MapApp({ projectId, agencyId, routeId }: { projectId: string, agencyId?: string, routeId?: string }) {
  const [stops, setStops] = useState<Stop[]>([]);
  const [route, setRoute] = useState<[number, number][]>([]);
  const [mode, setMode] = useState<Mode>("view");
  const [loading, setLoading] = useState(true);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const urlToFetch = routeId ? `${API_URL}/routes/${routeId}/stops_detail` : `${API_URL}/projects/${projectId}/stops`;
        const stopRes = await fetch(urlToFetch);
        if (stopRes.ok) {
          const json = await stopRes.json();
          if (json.data) {
            const formatted = json.data.map((s: any) => ({
              id: s.stop_id ?? s.id,
              name: s.name,
              lat: s.lat,
              lng: s.lng,
            }));
            setStops(formatted);
            setRoute(formatted.map((s: any) => [s.lat, s.lng]));
          }
        }
      } catch (err) {
        console.error("Failed to load stops", err);
      }
      setLoading(false);
    }
    loadData();
  }, [projectId, routeId]);

  async function createStop(lat: number, lng: number) {
    try {
      const res = await fetch(`${API_URL}/projects/${projectId}/stops`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `バス停_${Date.now().toString().slice(-4)}`, lat, lng }),
      });
      if (res.ok) {
        const json = await res.json();
        const newStop = { ...json.data };
        setStops((prev) => [...prev, newStop]);
        setRoute((prev) => [...prev, [newStop.lat, newStop.lng]]);
      } else {
        // Fallback for optimistic UI without API success (if DB is disconnected)
        fallbackAddStop(lat, lng);
      }
    } catch (err) {
      console.error("Error creating stop API, dropping back to UI render only.", err);
      fallbackAddStop(lat, lng);
    }
  }

  function fallbackAddStop(lat: number, lng: number) {
    const newStop = { lat, lng, name: `バス停_${Date.now().toString().slice(-4)}` };
    setStops((prev) => [...prev, newStop]);
    setRoute((prev) => [...prev, [lat, lng]]);
  }

  async function saveRoute() {
    try {
      const targetRouteId = routeId || 1;
      await fetch(`${API_URL}/routes/${targetRouteId}/stops`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stops: stops.map((s, i) => ({
            stop_id: s.id || Math.floor(Math.random() * 1000), // Defaulting for fallback mode
            order: i + 1,
          })),
        }),
      });
      alert("路線順序を保存しました！");
    } catch (err) {
      console.error("Error saving route", err);
      alert("API連携エラー（UI上は保存されました）");
    }
  }

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        if (mode !== "add_stop") return;
        const { lat, lng } = e.latlng;
        createStop(lat, lng);
      },
    });
    return null;
  }

  function handleDragEnd(e: L.LeafletEvent, idx: number) {
    const marker = e.target as L.Marker;
    const pos = marker.getLatLng();
    const newStops = [...stops];
    newStops[idx].lat = pos.lat;
    newStops[idx].lng = pos.lng;
    setStops(newStops);

    const newRoute = newStops.map(s => [s.lat, s.lng] as [number, number]);
    setRoute(newRoute);
  }

  // --- List Drag & Drop Handlers ---
  const onListDragStart = (idx: number) => {
    if (mode !== "edit_route") return;
    setDraggedIndex(idx);
  };

  const onListDragEnter = (idx: number) => {
    if (mode !== "edit_route" || draggedIndex === null) return;
    setDragOverIndex(idx);
  };

  const onListDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const onListDrop = (idx: number) => {
    if (mode !== "edit_route" || draggedIndex === null) return;
    const newStops = [...stops];
    const [draggedStop] = newStops.splice(draggedIndex, 1);
    newStops.splice(idx, 0, draggedStop);
    setStops(newStops);
    setRoute(newStops.map((s) => [s.lat, s.lng]));
    onListDragEnd();
  };

  // --- Stop Name Edit Handlers ---
  const handleNameChange = (idx: number, newName: string) => {
    const newStops = [...stops];
    newStops[idx].name = newName;
    setStops(newStops);
  };

  async function updateStopName(stopId: number | undefined, newName: string, lat: number, lng: number) {
    if (!stopId) return;
    try {
      await fetch(`${API_URL}/stops/${stopId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, lat, lng }),
      });
    } catch (err) {
      console.error("Error updating stop name", err);
    }
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-900 text-white shadow-2xl">
      {/* Sidebar Area */}
      <aside className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col z-[1000] shadow-lg relative">
        <div className="p-6 border-b border-gray-700 bg-gray-800/80 backdrop-blur-md">
          <div className="mb-2">
            <Link href={agencyId ? `/routes?agencyId=${agencyId}` : "/agencies"} className="inline-block text-gray-400 hover:text-white transition-colors text-sm">
              &larr; 戻る
            </Link>
          </div>
          <h2 className="text-2xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400 drop-shadow-sm">
            GTFS Creator
          </h2>
          <p className="text-xs text-gray-400 mt-2 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            Project ID: {projectId}
          </p>
        </div>

        <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Mode Select</h3>
          <div className="space-y-3 mb-8">
            <label className={`flex items-center p-3 rounded-xl cursor-pointer border transition-all duration-300 ${mode === "view" ? "border-teal-500 bg-teal-500/10 text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.2)]" : "border-gray-700 hover:bg-gray-700/50"}`}>
              <input type="radio" value="view" checked={mode === "view"} onChange={(e) => setMode(e.target.value as Mode)} className="hidden" />
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              View Only
            </label>
            <label className={`flex items-center p-3 rounded-xl cursor-pointer border transition-all duration-300 ${mode === "add_stop" ? "border-teal-500 bg-teal-500/10 text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.2)]" : "border-gray-700 hover:bg-gray-700/50"}`}>
              <input type="radio" value="add_stop" checked={mode === "add_stop"} onChange={(e) => setMode(e.target.value as Mode)} className="hidden" />
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add Stop
            </label>
            <label className={`flex items-center p-3 rounded-xl cursor-pointer border transition-all duration-300 ${mode === "edit_route" ? "border-teal-500 bg-teal-500/10 text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.2)]" : "border-gray-700 hover:bg-gray-700/50"}`}>
              <input type="radio" value="edit_route" checked={mode === "edit_route"} onChange={(e) => setMode(e.target.value as Mode)} className="hidden" />
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              Edit Route
            </label>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Stops ({stops.length})</h3>
            {mode === "add_stop" && (
              <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/40">Click Map</span>
            )}
          </div>

          {loading ? (
            <div className="text-gray-400 text-sm italic py-4">Syncing with server...</div>
          ) : (
            <div className="space-y-3 pb-8">
              {stops.map((s, i) => (
                <div 
                  key={s.id || i} 
                  draggable={mode === "edit_route"}
                  onDragStart={() => onListDragStart(i)}
                  onDragEnter={() => onListDragEnter(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => onListDrop(i)}
                  onDragEnd={onListDragEnd}
                  className={`p-3 rounded-xl text-sm flex items-center border transition-colors ${dragOverIndex === i ? 'border-teal-500 bg-teal-500/20' : 'bg-gray-900/40 border-white/5 hover:border-white/10'} ${mode === 'edit_route' ? 'cursor-move' : ''}`}
                >
                  {mode === "edit_route" && (
                    <div className="mr-2 text-gray-600 flex-shrink-0 cursor-grab active:cursor-grabbing">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" /></svg>
                    </div>
                  )}
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 text-white flex items-center justify-center text-xs font-bold shadow-md mr-3 ring-2 ring-gray-900">
                    {i + 1}
                  </span>
                  <div className="overflow-hidden flex-grow flex flex-col justify-center">
                    <input 
                      type="text"
                      value={s.name || ""}
                      onChange={(e) => handleNameChange(i, e.target.value)}
                      onBlur={() => updateStopName(s.id, s.name || `バス停 ${i+1}`, s.lat, s.lng)}
                      className="font-semibold text-gray-200 bg-transparent border-b border-transparent hover:border-gray-600 focus:border-teal-500 focus:outline-none w-full truncate py-0.5"
                      placeholder={`バス停 ${i + 1}`}
                    />
                    <p className="text-[11px] text-gray-500 font-mono truncate mt-0.5 leading-none">{s.lat.toFixed(5)}, {s.lng.toFixed(5)}</p>
                  </div>
                </div>
              ))}
              {stops.length === 0 && (
                <div className="p-4 border border-dashed border-gray-700 rounded-xl text-center text-gray-500 text-sm">
                  No stops created yet.<br />Switch to "Add Stop" mode logic.
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-700 bg-gray-800 relative z-[1001]">
          <button
            onClick={saveRoute}
            disabled={stops.length < 2 || mode !== "edit_route"}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-400 hover:to-teal-300 disabled:opacity-30 disabled:from-gray-600 disabled:to-gray-700 disabled:text-gray-400 disabled:shadow-none text-black font-extrabold tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:shadow-[0_0_25px_rgba(20,184,166,0.6)] flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            路線を保存 (Save Route)
          </button>
        </div>
      </aside>

      {/* Map Content View */}
      <main className="flex-grow relative h-full">
        {mode === "add_stop" && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[1000] bg-black/70 backdrop-blur-md px-6 py-2.5 rounded-full border border-teal-500/40 text-teal-300 text-sm font-medium animate-pulse shadow-lg flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
            マップをクリックしてバス停を追加
          </div>
        )}
        {mode === "edit_route" && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-[1000] bg-black/70 backdrop-blur-md px-6 py-2.5 rounded-full border border-blue-500/40 text-blue-300 text-sm font-medium shadow-lg flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" /></svg>
            マーカーをドラッグして位置を調整
          </div>
        )}
        <MapContainer
          center={[35.68, 139.7]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler />

          {stops.map((s, i) => (
            <Marker
              key={s.id || i}
              position={[s.lat, s.lng]}
              draggable={mode === "edit_route"}
              eventHandlers={{
                dragend: (e) => handleDragEnd(e, i)
              }}
            />
          ))}

          {route.length > 1 && (
            <Polyline positions={route} color="#14b8a6" weight={5} opacity={0.8} dashArray="10, 10" lineCap="round" lineJoin="round" />
          )}
        </MapContainer>
      </main>
    </div>
  );
}
