"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const API_URL = "https://windy-art-420311.uc.r.appspot.com/api/v1"; //git hub actionsの環境変数が動かないためハードコーディング
const PROJECT_ID = "1";

type RouteData = {
  id: number;
  agency_id: number;
  name: string;
  route_type: number;
};

function RoutesList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const agencyId = searchParams.get("agencyId");

  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [routeType, setRouteType] = useState("3");

  useEffect(() => {
    async function fetchRoutes() {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/agencies/${agencyId}/routes`);
        if (res.ok) {
          const json = await res.json();
          setRoutes(json.data || []);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }

    if (agencyId) fetchRoutes();
  }, [agencyId]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!agencyId) return;
    try {
      const res = await fetch(`${API_URL}/projects/${PROJECT_ID}/routes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agency_id: parseInt(agencyId), name, route_type: parseInt(routeType) })
      });
      if (res.ok) {
        const json = await res.json();
        const newRouteId = json.data.id;
        router.push(`/map?agencyId=${agencyId}&routeId=${newRouteId}`);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("本当に削除しますか？")) return;
    try {
      const res = await fetch(`${API_URL}/routes/${id}`, { method: "DELETE" });
      if (res.ok) {
        setRoutes(prev => prev.filter(r => r.id !== id));
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (!agencyId) {
    return <div className="text-gray-400">Error: No agency ID provided.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/agencies" className="text-gray-400 hover:text-white transition-colors">
          &larr; 戻る
        </Link>
        <h1 className="text-4xl font-bold text-blue-400">路線 (Route) 管理</h1>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-gray-200">新規追加</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input type="text" placeholder="路線名" required className="flex-1 bg-gray-900 border border-gray-700 rounded p-2 focus:border-blue-500 outline-none" value={name} onChange={e => setName(e.target.value)} />
            <select className="bg-gray-900 border border-gray-700 rounded p-2 focus:border-blue-500 outline-none" value={routeType} onChange={e => setRouteType(e.target.value)}>
              <option value="3">バス (3)</option>
              <option value="2">鉄道 (2)</option>
              <option value="0">トラム (0)</option>
            </select>
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors">追加してマップを開く</button>
        </form>
      </div>

      {loading ? (
        <p className="text-gray-400">読み込み中...</p>
      ) : (
        <div className="grid gap-4">
          {routes.length === 0 ? (
            <p className="text-gray-500">登録された路線はありません。</p>
          ) : (
            routes.map(r => (
              <div key={r.id} className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center justify-between border border-gray-700 hover:border-blue-500/50 transition-colors">
                <div>
                  <h3 className="text-2xl font-semibold text-blue-300 mb-1">{r.name}</h3>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-400">Type: {r.route_type}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Link href={`/map?agencyId=${agencyId}&routeId=${r.id}`} className="px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-sm font-semibold transition-colors">
                    編集マップへ
                  </Link>
                  <button onClick={() => handleDelete(r.id)} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-semibold transition-colors">
                    削除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <Suspense fallback={<div className="text-gray-400">Loading...</div>}>
        <RoutesList />
      </Suspense>
    </div>
  );
}
