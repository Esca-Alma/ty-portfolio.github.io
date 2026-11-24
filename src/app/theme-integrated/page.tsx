import type { Metadata } from "next";
import Link from "next/link";
import RouteLine from "@/components/RouteLine";
import {
  profile,
  careerSummary,
  strengths,
  skillGroups,
  levelLabel,
  qualifications,
  careers,
  PHASES,
  type SkillLevel,
} from "@/data/personal";

export const metadata: Metadata = {
  title: "職務経歴 | T.Y. Portfolio",
  description:
    "システムエンジニア T.Y. の職務要約、技術スタック、2017年からの開発経歴の詳細です。",
};

const levelBadgeStyle: Record<SkillLevel, string> = {
  current: "bg-[#E5F1ED] text-[#12795A] border-[#12795A]/40 font-bold",
  work: "bg-[#F4F6F6] text-[#1E2A30] border-[#D3DADC] font-medium",
  learning: "bg-white text-[#58656C] border-[#D3DADC] font-normal",
};

export default function ThemeIntegrated() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-16">
      {/* パンくず導線 */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center text-sm font-bold text-[#12795A] hover:underline"
        >
          トップページに戻る
        </Link>
      </div>

      {/* ページ見出し */}
      <header className="space-y-4 pb-8 border-b border-[#D3DADC]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-display font-bold text-sm text-[#12795A]">
            Curriculum Vitae
          </span>
          <span className="text-xs px-2.5 py-1 rounded bg-white border border-[#D3DADC] text-[#1E2A30]">
            {profile.status}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1E2A30] tracking-tight">
          {profile.initials} の職務経歴
        </h1>
        <p className="text-base text-[#1E2A30] leading-relaxed max-w-3xl">
          {profile.lead}
        </p>
      </header>

      {/* キャリア路線図 */}
      <RouteLine />

      {/* 職務要約 */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1E2A30]">
          職務要約
        </h2>
        <div className="bg-white border border-[#D3DADC] rounded-lg p-6 space-y-4 text-base text-[#1E2A30] leading-[1.9]">
          {careerSummary.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </section>

      {/* 活かせる経験・得意分野 */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1E2A30]">
          活かせる経験・強み
        </h2>
        <dl className="grid md:grid-cols-2 gap-6 bg-white border border-[#D3DADC] rounded-lg p-6">
          {strengths.map((s) => (
            <div key={s.title} className="border-l-4 border-[#12795A] pl-4 space-y-1">
              <dt className="font-bold text-base text-[#1E2A30]">{s.title}</dt>
              <dd className="text-sm text-[#1E2A30] leading-relaxed">{s.body}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 開発経歴（会社・契約ごと） */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1E2A30]">
            開発経歴
          </h2>
          <p className="text-xs text-[#58656C]">
            ※公開サイトのため、所属企業名および顧客名は一般化して記載しています
          </p>
        </div>

        <div className="space-y-8">
          {careers.map((c) => (
            <article
              key={c.id}
              className="bg-white border border-[#D3DADC] rounded-lg overflow-hidden"
            >
              {/* 所属ヘッダー */}
              <div className="bg-[#F4F6F6] px-6 py-4 border-b border-[#D3DADC] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg sm:text-xl font-bold text-[#1E2A30]">
                      {c.org}
                    </h3>
                    <span className="text-xs px-2 py-0.5 rounded bg-white border border-[#D3DADC] text-[#1E2A30]">
                      {c.employment}
                    </span>
                  </div>
                  <p className="text-sm text-[#58656C] mt-1">{c.summary}</p>
                </div>
                <div className="font-display font-bold text-sm text-[#12795A] shrink-0">
                  {c.period}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* 役割・規模・担当工程・使用技術 */}
                <div className="grid sm:grid-cols-3 gap-4 pb-5 border-b border-[#D3DADC] text-sm">
                  <div>
                    <p className="text-xs font-bold text-[#58656C]">役割・規模</p>
                    <p className="text-[#1E2A30] mt-1">
                      役割：{c.role} ／ チーム規模：{c.scale}
                    </p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs font-bold text-[#58656C] mb-1.5">
                      担当工程
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {PHASES.map((phase) => {
                        const active = c.phases.includes(phase);
                        return (
                          <li
                            key={phase}
                            className={`text-xs px-2.5 py-0.5 rounded border ${
                              active
                                ? "bg-[#E5F1ED] text-[#12795A] border-[#12795A]/40 font-bold"
                                : "bg-[#F4F6F6] text-[#58656C]/60 border-[#D3DADC]"
                            }`}
                          >
                            {phase}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* プロジェクト一覧 */}
                <div className="space-y-5">
                  <h4 className="text-xs font-bold text-[#58656C]">
                    担当プロジェクト・取り組み
                  </h4>
                  <ol className="space-y-4">
                    {c.projects.map((proj) => (
                      <li
                        key={`${proj.period}-${proj.name}`}
                        className="border-l-2 border-[#D3DADC] pl-4 space-y-1"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className="font-bold text-base text-[#1E2A30]">
                            {proj.name}
                          </p>
                          <span className="font-display text-xs text-[#58656C]">
                            {proj.period}
                          </span>
                        </div>
                        <p className="text-sm text-[#1E2A30] leading-relaxed">
                          {proj.body}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* 環境・技術 */}
                <div className="pt-4 border-t border-[#D3DADC]">
                  <p className="text-xs font-bold text-[#58656C] mb-2">
                    使用言語・フレームワーク・環境
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {c.tech.map((t) => (
                      <li
                        key={t}
                        className="font-display text-xs px-2.5 py-1 rounded bg-[#F4F6F6] text-[#1E2A30] border border-[#D3DADC]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 技術スタック・保有資格 */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1E2A30]">
          技術スタック・保有資格
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="bg-white border border-[#D3DADC] rounded-lg p-5 space-y-3"
            >
              <h3 className="font-bold text-base text-[#1E2A30] pb-2 border-b border-[#D3DADC]">
                {group.title}
              </h3>
              <ul className="space-y-2.5 text-sm">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex flex-wrap items-center justify-between gap-2"
                  >
                    <span className="font-display font-bold text-[#1E2A30]">
                      {item.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded border ${
                        levelBadgeStyle[item.level]
                      }`}
                    >
                      {levelLabel[item.level]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white border border-[#D3DADC] rounded-lg p-5">
          <h3 className="text-sm font-bold text-[#1E2A30] mb-2">保有資格</h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-[#1E2A30]">
            {qualifications.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* このポートフォリオサイトの構成技術 */}
      <section className="bg-white border border-[#D3DADC] rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#1E2A30]">
          このポートフォリオサイトの構成技術
        </h2>
        <p className="text-sm text-[#1E2A30] leading-relaxed">
          Next.js（App Router）の静的エクスポート（<code className="font-mono text-xs bg-[#F4F6F6] px-1.5 py-0.5 rounded">output: &quot;export&quot;</code>）と Tailwind CSS で構築し、GitHub Actions から GitHub Pages へ自動デプロイしています。
        </p>
      </section>
    </main>
  );
}
