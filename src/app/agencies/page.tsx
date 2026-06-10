"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";
const API_URL = "https://windy-art-420311.uc.r.appspot.com/api/v1"; //git hub actionsの環境変数が動かないためハードコーディング
const PROJECT_ID = "1";

type Agency = {
  id: number;
  agency_name: string;
  agency_url: string;
  agency_timezone: string;
};

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [timezone, setTimezone] = useState("Asia/Tokyo");

  async function fetchAgencies() {
    setLoading(true);
    try {
      console.log(`FETCH START : ${API_URL}/projects/${PROJECT_ID}/agencies`)
      const res = await fetch(`${API_URL}/projects/${PROJECT_ID}/agencies`);
      if (res.ok) {
        const json = await res.json();
        setAgencies(json.data || []);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchAgencies();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/projects/${PROJECT_ID}/agencies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agency_name: name, agency_url: url, agency_timezone: timezone })
      });
      if (res.ok) {
        setName("");
        setUrl("");
        fetchAgencies();
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("本当に削除しますか？")) return;
    try {
      const res = await fetch(`${API_URL}/agencies/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAgencies();
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-teal-400 mb-8">バス会社 (Agency) 管理</h1>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">新規追加</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" placeholder="会社名" required className="flex-1 bg-gray-900 border border-gray-700 rounded p-2 focus:border-teal-500 outline-none" value={name} onChange={e => setName(e.target.value)} />
              <input type="url" placeholder="URL" required className="flex-1 bg-gray-900 border border-gray-700 rounded p-2 focus:border-teal-500 outline-none" value={url} onChange={e => setUrl(e.target.value)} />
              <input type="text" placeholder="タイムゾーン" required className="flex-1 bg-gray-900 border border-gray-700 rounded p-2 focus:border-teal-500 outline-none" value={timezone} onChange={e => setTimezone(e.target.value)} />
            </div>
            <button type="submit" className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-gray-900 font-bold rounded-lg transition-colors">追加する</button>
          </form>
        </div>

        {loading ? (
          <p className="text-gray-400">読み込み中...</p>
        ) : (
          <div className="grid gap-4">
            {agencies.length === 0 ? (
              <p className="text-gray-500">登録されたバス会社はありません。</p>
            ) : (
              agencies.map(a => (
                <div key={a.id} className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center justify-between border border-gray-700 hover:border-teal-500/50 transition-colors">
                  <div>
                    <h3 className="text-2xl font-semibold text-teal-300 mb-2">{a.agency_name}</h3>
                    <p className="text-sm text-gray-400 break-all">{a.agency_url}</p>
                    <p className="text-xs text-gray-500">{a.agency_timezone}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link href={`/routes?agencyId=${a.id}`} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-colors">
                      路線一覧へ
                    </Link>
                    <button onClick={() => handleDelete(a.id)} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-semibold transition-colors">
                      削除
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
