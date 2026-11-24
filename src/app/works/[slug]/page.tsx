import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works, getWork } from "@/data/portfolio";

type Props = {
  params: Promise<{ slug: string }>;
};

// output: "export"（静的サイト生成）のために全実績のパスを事前生成する
export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) {
    return { title: "開発実績 | T.Y. Portfolio" };
  }
  return {
    title: `${work.title} | T.Y. Portfolio`,
    description: work.summary,
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-12">
      {/* 戻り導線 */}
      <div>
        <Link
          href="/#works"
          className="inline-flex items-center text-sm font-bold text-[#12795A] hover:underline"
        >
          開発実績一覧に戻る
        </Link>
      </div>

      {/* 実績ヘッダー */}
      <header className="space-y-4 pb-8 border-b border-[#D3DADC]">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-2.5 py-1 rounded bg-[#E5F1ED] text-[#12795A] font-bold">
            {work.kind}
          </span>
          {work.period && (
            <span className="font-display text-[#58656C]">
              期間：{work.period}
            </span>
          )}
          {work.scale && (
            <span className="text-[#58656C]">チーム規模：{work.scale}</span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-[#1E2A30] tracking-tight">
          {work.title}
        </h1>

        <p className="text-base sm:text-lg text-[#1E2A30] leading-relaxed">
          {work.summary}
        </p>

        {/* デモや外部リンクがある場合 */}
        {work.links.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-2">
            {work.links.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded bg-[#12795A] hover:bg-[#0E6047] text-white text-sm font-bold transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded bg-[#12795A] hover:bg-[#0E6047] text-white text-sm font-bold transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        )}
      </header>

      {/* 課題・目的・担当範囲 */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#D3DADC] rounded-lg p-5 space-y-2">
          <h2 className="text-sm font-bold text-[#12795A]">背景・解決する課題</h2>
          <p className="text-sm text-[#1E2A30] leading-relaxed">
            {work.problem}
          </p>
        </div>
        <div className="bg-white border border-[#D3DADC] rounded-lg p-5 space-y-2">
          <h2 className="text-sm font-bold text-[#12795A]">開発目的</h2>
          <p className="text-sm text-[#1E2A30] leading-relaxed">
            {work.purpose}
          </p>
        </div>
        <div className="bg-white border border-[#D3DADC] rounded-lg p-5 space-y-2">
          <h2 className="text-sm font-bold text-[#12795A]">担当範囲</h2>
          <p className="text-sm text-[#1E2A30] leading-relaxed">
            {work.scope}
          </p>
        </div>
      </section>

      {/* 使用技術 */}
      <section className="bg-white border border-[#D3DADC] rounded-lg p-6 space-y-3">
        <h2 className="text-base font-bold text-[#1E2A30]">使用技術</h2>
        <ul className="flex flex-wrap gap-2">
          {work.tech.map((t) => (
            <li
              key={t}
              className="font-display text-xs sm:text-sm font-semibold px-3 py-1 rounded bg-[#F4F6F6] text-[#1E2A30] border border-[#D3DADC]"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* 実装した機能 */}
      <section className="bg-white border border-[#D3DADC] rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#1E2A30]">
          実装した機能・担当した内容
        </h2>
        <ul className="space-y-2.5 text-sm sm:text-base text-[#1E2A30]">
          {work.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="inline-block w-2 h-2 rounded-full bg-[#12795A] mt-2.5 shrink-0"
              />
              <span className="leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 技術的な工夫・設計上の判断 */}
      <section className="bg-white border border-[#D3DADC] rounded-lg p-6 space-y-4">
        <h2 className="text-lg font-bold text-[#1E2A30]">
          技術的な工夫・設計上の判断
        </h2>
        <ul className="space-y-3 text-sm sm:text-base text-[#1E2A30]">
          {work.decisions.map((d) => (
            <li key={d} className="border-l-4 border-[#12795A] pl-4 leading-relaxed">
              {d}
            </li>
          ))}
        </ul>
      </section>

      {/* 苦労した点と解決方法（該当がある実績のみ） */}
      {work.challenges && work.challenges.length > 0 && (
        <section className="bg-white border border-[#D3DADC] rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-bold text-[#1E2A30]">
            課題となった点と解決方法
          </h2>
          <div className="space-y-4">
            {work.challenges.map((c, idx) => (
              <div
                key={idx}
                className="p-4 rounded bg-[#F4F6F6] border border-[#D3DADC] space-y-2 text-sm"
              >
                <p className="text-[#1E2A30]">
                  <strong className="font-bold text-[#58656C] mr-2">課題：</strong>
                  {c.problem}
                </p>
                <p className="text-[#1E2A30]">
                  <strong className="font-bold text-[#12795A] mr-2">対応：</strong>
                  {c.solution}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 時系列の主な案件（前職など複数案件がある場合） */}
      {work.timeline && work.timeline.length > 0 && (
        <section className="bg-white border border-[#D3DADC] rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-bold text-[#1E2A30]">
            担当した主な案件（時系列）
          </h2>
          <ol className="space-y-4">
            {work.timeline.map((item) => (
              <li
                key={`${item.period}-${item.name}`}
                className="border-l-2 border-[#D3DADC] pl-4 space-y-1"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-bold text-base text-[#1E2A30]">
                    {item.name}
                  </p>
                  <span className="font-display text-xs text-[#58656C]">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm text-[#1E2A30] leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 補足・注意事項 */}
      {work.notes && work.notes.length > 0 && (
        <section className="p-5 rounded bg-white border border-[#D3DADC] text-xs sm:text-sm text-[#58656C] space-y-1.5">
          {work.notes.map((n) => (
            <p key={n}>※ {n}</p>
          ))}
        </section>
      )}

      {/* ほかの開発実績への導線 */}
      <nav aria-label="その他の開発実績" className="pt-6 border-t border-[#D3DADC] space-y-4">
        <h2 className="text-base font-bold text-[#1E2A30]">その他の開発実績</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {works
            .filter((w) => w.slug !== work.slug)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/works/${other.slug}`}
                className="p-4 rounded bg-white border border-[#D3DADC] hover:border-[#12795A] transition-colors block space-y-1"
              >
                <span className="text-xs text-[#12795A] font-bold">
                  {other.kind}
                </span>
                <p className="text-sm font-bold text-[#1E2A30] leading-snug">
                  {other.title}
                </p>
              </Link>
            ))}
        </div>
      </nav>
    </main>
  );
}
