import Link from "next/link";
import { personalData } from "@/data/personal";
import { ChevronRight, ExternalLink, Code2, Layers, Cpu, Server, Database } from "lucide-react";

export default function ThemeIntegrated() {
  const { profile, skills, projects } = personalData;

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#37352f] font-sans selection:bg-[#bae3ff] pb-24">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FDFDFD]/90 backdrop-blur border-b border-[#e9e9e7]">
        <div className="max-w-[1000px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm font-semibold text-[#37352f]/60 hover:text-[#37352f] transition-colors flex items-center gap-1">
            ← ホームに戻る
          </Link>
          <div className="text-xs text-[#37352f]/40 font-mono tracking-wider">
            PORTFOLIO_CV.VER_1.0
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-[1000px] mx-auto px-6 pt-16 space-y-20">

        {/* Header Section (Notion Style) */}
        <header className="space-y-6">
          <div className="text-[80px] leading-none select-none mb-6">🧑‍💻</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#37352f]">
            {profile.name} の職務経歴
          </h1>
          <div className="flex flex-wrap gap-2 pb-6 border-b border-[#e9e9e7]">
            <span className="px-2 py-1 bg-[#f1f1ef] text-[#37352f] text-sm rounded font-medium border border-[#e9e9e7]">
              希望職種: {profile.role}
            </span>
            <span className="px-2 py-1 bg-[#e8f3eb] text-[#294c36] text-sm rounded font-medium border border-[#cce6d2]">
              ステータス: 副業稼働できる案件を探しています
            </span>
          </div>
          <p className="text-xl text-[#37352f]/80 font-medium leading-relaxed max-w-3xl">
            {profile.catchphrase}
          </p>
        </header>

        {/* About Section */}
        <section className="bg-white p-8 rounded-xl border border-[#e9e9e7] shadow-sm">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-blue-500">■</span> 職務要約
          </h2>
          <p className="leading-loose text-[#37352f]/80 mb-8 whitespace-pre-wrap">
            {profile.about}
          </p>

          <div className="bg-[#f7f6f3] p-6 rounded-lg">
            <h3 className="font-bold text-[#37352f] mb-4 text-sm flex items-center gap-2">
              💡 活かせる経験・強み
            </h3>
            <ul className="space-y-3">
              {profile.strengths.map((s, i) => (
                <li key={i} className="flex gap-3 text-[#37352f]/80 text-sm">
                  <ChevronRight className="w-5 h-5 shrink-0 text-[#37352f]/40" />
                  <span className="pt-0.5 leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Skills Section (Standard Grid + Notion Cleanliness) */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-emerald-500">■</span> 技術スタック・保有資格
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "バックエンド", items: skills.backend, icon: <Server className="w-5 h-5" /> },
              { title: "フロントエンド", items: skills.frontend, icon: <Cpu className="w-5 h-5" /> },
              { title: "インフラ", items: skills.infrastructure, icon: <Layers className="w-5 h-5" /> },
              { title: "データベース", items: skills.database, icon: <Database className="w-5 h-5" /> },
            ].map((group, idx) => (
              <div key={idx} className="bg-white p-5 rounded-xl border border-[#e9e9e7] shadow-sm flex flex-col h-full">
                <div className="flex items-center gap-2 text-[#37352f] mb-4 pb-3 border-b border-[#e9e9e7]">
                  {group.icon}
                  <h3 className="font-bold text-sm text-center">{group.title}</h3>
                </div>
                <ul className="space-y-3 flex-1">
                  {group.items.map((skill, j) => (
                    <li key={j} className="flex justify-between items-center group/item hover:bg-[#f7f6f3] px-2 py-1 rounded transition-colors -mx-2 text-sm">
                      <span className="font-medium text-[#37352f]/90">{skill.name}</span>
                      <span className="text-[#37352f]/50 font-mono">{skill.years}年</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-white border border-[#e9e9e7] rounded-xl shadow-sm text-sm">
            <strong className="text-[#37352f] mr-4">保有資格:</strong>
            <span className="text-[#37352f]/80">{skills.qualifications.join(" / ")}</span>
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-purple-500">■</span> 職務経歴・実績詳細
          </h2>
          <div className="space-y-6">
            {projects.map((project, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#e9e9e7] shadow-sm overflow-hidden flex flex-col md:flex-row">
                {/* Timeline / Overview Side */}
                <div className="bg-[#fbfbfa] p-6 md:w-1/3 border-b md:border-b-0 md:border-r border-[#e9e9e7]">
                  <div className="text-xs font-mono text-[#37352f]/50 mb-2">{project.period}</div>
                  <h3 className="text-lg font-bold text-[#37352f] mb-2 leading-tight">{project.company}</h3>
                  <div className="text-sm font-medium text-blue-600 mb-4">{project.title}</div>
                  <p className="text-xs text-[#37352f]/70 leading-relaxed">{project.summary}</p>
                </div>

                {/* Details Side */}
                <div className="p-6 md:w-2/3 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-bold text-[#37352f]/50 uppercase tracking-widest mb-2">背景・課題</h4>
                      <p className="text-sm text-[#37352f]/90 leading-relaxed">{project.background}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#37352f]/50 uppercase tracking-widest mb-2">担当業務</h4>
                      <p className="text-sm text-[#37352f]/90 leading-relaxed">{project.role}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#37352f]/50 uppercase tracking-widest mb-3">主な実績・取り組み</h4>
                    <ul className="space-y-2">
                      {project.results.map((res, j) => (
                        <li key={j} className="flex gap-2 text-sm text-[#37352f]/90">
                          <span className="text-[#37352f]/30">-</span>
                          <span className="leading-relaxed">{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#e9e9e7]">
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, j) => (
                        <span key={j} className="px-2 py-1 bg-[#f1f1ef] text-[#37352f]/80 text-xs rounded border border-[#e9e9e7]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio Tech Stack Section */}
        <section className="mt-20 p-8 border-2 border-dashed border-[#e9e9e7] rounded-2xl bg-white/50 relative">
          <div className="absolute -top-3 left-8 bg-[#FDFDFD] px-2 text-xs font-bold text-[#37352f]/50 tracking-widest uppercase">
            Appendix: Architecture
          </div>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-gray-700" />
            このポートフォリオの構成技術
          </h2>
          <p className="text-sm text-[#37352f]/80 leading-relaxed mb-6">
            本ポートフォリオサイトは、モダンなフロントエンド技術を用いて構築し、GitHub Pagesにて静的ホスティングを行っています。高いパフォーマンスでの配信と、コンポーネント指向による保守性の高いコードベースを意識して作成しました。
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <strong className="block text-sm mb-1 text-[#37352f]">Next.js (App Router)</strong>
              <p className="text-xs text-[#37352f]/60 leading-relaxed">
                Reactフレームワークとして採用。ルーティングと静的サイト生成(SSG)機能である `output: "export"` を活用し、高速な描画を実現しています。
              </p>
            </div>
            <div>
              <strong className="block text-sm mb-1 text-[#37352f]">Tailwind CSS</strong>
              <p className="text-xs text-[#37352f]/60 leading-relaxed">
                ユーティリティファーストなCSSフレームワーク。柔軟なレスポンシブデザインと、保守性の高いスタイリングを定義しています。
              </p>
            </div>
            <div>
              <strong className="block text-sm mb-1 text-[#37352f]">Docker & GitHub Pages</strong>
              <p className="text-xs text-[#37352f]/60 leading-relaxed">
                ローカル環境の差異をなくすためDockerコンテナ化。静的リソースはGitHub Pagesにデプロイし、低コストかつスケーラブルなインフラ構成としています。
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
