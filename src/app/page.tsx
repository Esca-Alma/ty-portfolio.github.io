import Link from "next/link";
import { Monitor, Layout, Clock, LayoutDashboard, Terminal, Building2, FileText, BookOpen, PenTool, LayoutTemplate } from "lucide-react";

export default function Home() {


  const jpThemes = [
    {
      path: "/agencies",
      name: "GTFS Maker",
      description: "GTFSデータを作成するアプリケーション　※出力機能は現在オミット",
      icon: <Building2 className="w-8 h-8 mb-4 text-blue-700" />,
      color: "from-blue-50 to-white border-2 border-blue-100",
      textColor: "text-gray-900"
    }
  ];

  const renderCard = (theme: any, index: number) => (
    <Link
      key={index}
      href={theme.path}
      className={`block p-8 rounded-2xl bg-gradient-to-br ${theme.color} transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group relative overflow-hidden`}
    >
      <div className="relative z-10">
        {theme.icon}
        <h2 className={`text-2xl font-bold mb-3 ${theme.textColor}`}>
          {theme.name}
        </h2>
        <p className={`${theme.textColor === 'text-white' ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-sm`}>
          {theme.description}
        </p>
      </div>
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-16 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            System Engineer Portfolio Page
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-2">
            システムエンジニアT.Y.のポートフォリオページ
          </p>
        </div>

        {/* 新規 職務経歴書記載） */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-l-8 border-emerald-500 pl-3">プロフィール・職務経歴書</h2>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full animate-pulse">datas</span>
          </div>
          <div className="grid grid-cols-1">
            {renderCard({
              path: "/theme-integrated",
              name: "プロフィール・職務経歴書",
              description: "",
              icon: <LayoutTemplate className="w-8 h-8 mb-4 text-emerald-600" />,
              color: "bg-white border-2 border-emerald-200 shadow-[0_4px_20px_rgba(16,185,129,0.1)]",
              textColor: "text-gray-900"
            }, 99)}
          </div>
        </div>

        {/* 新規 日本語レイアウト */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 border-l-8 border-blue-600 pl-3">構築したサンプルアプリ</h2>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">New</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jpThemes.map((theme, i) => renderCard(theme, i))}
          </div>
        </div>

      </div>
    </div>
  );
}
