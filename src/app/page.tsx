import Link from "next/link";
import RouteLine from "@/components/RouteLine";
import {
  profile,
  facts,
  strengths,
  skillGroups,
  levelLabel,
  qualifications,
  PHASES,
  type SkillLevel,
} from "@/data/personal";
import { works } from "@/data/portfolio";

// 経験区分のバッジ配色
const levelBadgeStyle: Record<SkillLevel, string> = {
  current: "bg-[#E5F1ED] text-[#12795A] border-[#12795A]/40 font-bold",
  work: "bg-[#F4F6F6] text-[#1E2A30] border-[#D3DADC] font-medium",
  learning: "bg-white text-[#58656C] border-[#D3DADC] font-normal",
};

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-20 sm:space-y-24">
      {/* 1. ファーストビュー（TOP） */}
      <section id="top" className="space-y-10">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-display font-bold text-base sm:text-lg text-[#12795A]">
              {profile.title}
            </p>
            <span className="text-xs px-2.5 py-1 rounded bg-white border border-[#D3DADC] text-[#1E2A30]">
              {profile.status}
            </span>
          </div>

          <h1 className="text-[28px] sm:text-[40px] font-bold text-[#1E2A30] leading-[1.35] tracking-tight max-w-4xl">
            {profile.headline}
          </h1>

          <p className="text-base sm:text-lg text-[#1E2A30] leading-relaxed max-w-3xl">
            {profile.lead}
          </p>

          <p className="text-sm text-[#58656C]">{profile.experience}</p>

          {/* 主要技術タグ */}
          <ul aria-label="主要技術" className="flex flex-wrap gap-2 pt-1">
            {profile.heroTags.map((tag) => (
              <li
                key={tag}
                className="font-display text-sm font-semibold px-3 py-1 rounded bg-white border border-[#D3DADC] text-[#1E2A30]"
              >
                {tag}
              </li>
            ))}
          </ul>

          {/* 導線ボタン */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="#works"
              className="inline-flex items-center justify-center px-5 py-3 rounded bg-[#12795A] hover:bg-[#0E6047] text-white text-sm font-bold transition-colors"
            >
              開発実績を見る
            </Link>
            <Link
              href="#profile"
              className="inline-flex items-center justify-center px-5 py-3 rounded bg-white hover:bg-[#E5F1ED] text-[#1E2A30] border border-[#D3DADC] text-sm font-bold transition-colors"
            >
              プロフィールを見る
            </Link>
          </div>
        </div>

        {/* 経歴の路線図（ページ内で唯一目立たせる視覚要素） */}
        <RouteLine />
      </section>

      {/* 2. PROFILE（自己紹介・工程・職務経歴への導線） */}
      <section id="profile" className="pt-8 border-t border-[#D3DADC] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="text-2xl sm:text-[26px] font-bold text-[#1E2A30]">
            Profile
          </h2>
          <p className="text-sm text-[#58656C]">自己紹介とこれまでの担当領域</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* 自己紹介本文（1行あたり約40文字以内に収まる幅） */}
          <div className="lg:col-span-7 space-y-4 text-base text-[#1E2A30] leading-[1.9]">
            {profile.about.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* 事実サマリーと担当工程 */}
          <div className="lg:col-span-5 bg-white border border-[#D3DADC] rounded-lg p-6 space-y-6">
            <dl className="space-y-4">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="pb-3 border-b border-[#D3DADC] last:border-b-0 last:pb-0"
                >
                  <dt className="text-xs font-bold text-[#58656C]">
                    {fact.label}
                  </dt>
                  <dd className="text-sm text-[#1E2A30] mt-1 leading-relaxed">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="pt-2 border-t border-[#D3DADC]">
              <p className="text-xs font-bold text-[#58656C] mb-2.5">
                実務で担当した開発工程
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {PHASES.map((phase) => (
                  <li
                    key={phase}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-[#E5F1ED] text-[#12795A]"
                  >
                    {phase}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <Link
                href="/theme-integrated"
                className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded bg-[#1E2A30] hover:bg-[#12795A] text-white text-sm font-bold transition-colors"
              >
                詳しい職務経歴を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 得意分野・対応可能業務（カードではなく2列のリスト構造） */}
      <section aria-labelledby="strengths-heading" className="pt-8 border-t border-[#D3DADC] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 id="strengths-heading" className="text-2xl sm:text-[26px] font-bold text-[#1E2A30]">
            得意分野・対応可能な業務
          </h2>
          <p className="text-sm text-[#58656C]">
            バックエンドを主軸に、画面からクラウド基盤まで対応します
          </p>
        </div>

        <dl className="grid md:grid-cols-2 gap-x-10 gap-y-8">
          {strengths.map((item) => (
            <div
              key={item.title}
              className="border-l-4 border-[#12795A] pl-4 space-y-2"
            >
              <dt className="text-lg font-bold text-[#1E2A30] leading-snug">
                {item.title}
              </dt>
              <dd className="text-sm sm:text-base text-[#1E2A30] leading-relaxed">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 4. SKILLS（技術スタック：経験の区分と利用場面が分かる表） */}
      <section id="skills" className="pt-8 border-t border-[#D3DADC] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="text-2xl sm:text-[26px] font-bold text-[#1E2A30]">
            Skills
          </h2>
          <p className="text-sm text-[#58656C]">
            現在の業務で使っている技術・実務経験のある技術・個人開発や学習で触れた技術を分けて記載しています
          </p>
        </div>

        {/* 経験区分の凡例 */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="text-[#58656C] font-bold">経験区分：</span>
          {(["current", "work", "learning"] as SkillLevel[]).map((lv) => (
            <span
              key={lv}
              className={`px-2.5 py-1 rounded border ${levelBadgeStyle[lv]}`}
            >
              {levelLabel[lv]}
            </span>
          ))}
        </div>

        <div className="space-y-6">
          {skillGroups.map((group) => (
            <div
              key={group.title}
              className="bg-white border border-[#D3DADC] rounded-lg overflow-hidden"
            >
              <div className="bg-[#F4F6F6] px-5 py-3 border-b border-[#D3DADC]">
                <h3 className="text-base font-bold text-[#1E2A30]">
                  {group.title}
                </h3>
              </div>
              <div className="divide-y divide-[#D3DADC]">
                {group.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="px-5 py-3.5 grid sm:grid-cols-12 gap-2 sm:gap-4 items-start sm:items-center"
                  >
                    <div className="sm:col-span-4 font-display font-bold text-base text-[#1E2A30]">
                      {skill.name}
                    </div>
                    <div className="sm:col-span-3">
                      <span
                        className={`inline-block text-xs px-2.5 py-1 rounded border ${
                          levelBadgeStyle[skill.level]
                        }`}
                      >
                        {levelLabel[skill.level]}
                      </span>
                    </div>
                    <div className="sm:col-span-5 text-sm text-[#58656C] leading-relaxed">
                      {skill.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 保有資格 */}
        <div className="bg-white border border-[#D3DADC] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <h3 className="text-sm font-bold text-[#1E2A30] shrink-0">
            保有資格
          </h3>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#1E2A30]">
            {qualifications.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. WORKS（開発実績カード一覧 → 詳細ページへ） */}
      <section id="works" className="pt-8 border-t border-[#D3DADC] space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <h2 className="text-2xl sm:text-[26px] font-bold text-[#1E2A30]">
            Works
          </h2>
          <p className="text-sm text-[#58656C]">
            個人開発アプリと、これまでの業務で取り組んだ主なシステム開発
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {works.map((work) => (
            <article
              key={work.slug}
              className="bg-white border border-[#D3DADC] rounded-lg p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-[#E5F1ED] text-[#12795A] font-bold">
                    {work.kind}
                  </span>
                  {work.period && (
                    <span className="font-display text-[#58656C]">
                      {work.period}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-[#1E2A30] leading-snug">
                  <Link
                    href={`/works/${work.slug}`}
                    className="hover:text-[#12795A] transition-colors"
                  >
                    {work.title}
                  </Link>
                </h3>

                <p className="text-sm text-[#1E2A30] leading-relaxed">
                  {work.summary}
                </p>

                <div className="pt-1">
                  <p className="text-xs font-bold text-[#58656C]">担当範囲</p>
                  <p className="text-xs text-[#1E2A30] mt-0.5 leading-relaxed">
                    {work.scope}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#D3DADC]">
                <ul aria-label="使用技術" className="flex flex-wrap gap-1.5">
                  {work.tech.slice(0, 7).map((t) => (
                    <li
                      key={t}
                      className="font-display text-xs px-2 py-0.5 rounded bg-[#F4F6F6] text-[#1E2A30] border border-[#D3DADC]"
                    >
                      {t}
                    </li>
                  ))}
                  {work.tech.length > 7 && (
                    <li className="text-xs px-2 py-0.5 text-[#58656C]">
                      +{work.tech.length - 7}
                    </li>
                  )}
                </ul>

                <div className="flex flex-wrap items-center gap-2.5">
                  <Link
                    href={`/works/${work.slug}`}
                    className="inline-flex items-center justify-center px-4 py-2 rounded bg-[#12795A] hover:bg-[#0E6047] text-white text-xs font-bold transition-colors"
                  >
                    詳細を見る
                  </Link>
                  {work.links.map((link) =>
                    link.external ? (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-4 py-2 rounded bg-white hover:bg-[#E5F1ED] text-[#1E2A30] border border-[#D3DADC] text-xs font-bold transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center justify-center px-4 py-2 rounded bg-white hover:bg-[#E5F1ED] text-[#1E2A30] border border-[#D3DADC] text-xs font-bold transition-colors"
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" className="pt-8 border-t border-[#D3DADC]">
        <div className="bg-white border border-[#D3DADC] rounded-lg p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-[26px] font-bold text-[#1E2A30]">
              Contact
            </h2>
            <p className="text-sm sm:text-base text-[#1E2A30] leading-relaxed">
              副業・業務委託のご相談は、ご応募・スカウト元のプラットフォームを通じてご連絡ください。
            </p>
            <p className="text-xs text-[#58656C] pt-1">
              本サイトの構成コード：
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#12795A] transition-colors ml-1"
              >
                GitHub
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/theme-integrated"
              className="inline-flex items-center justify-center px-5 py-3 rounded bg-white hover:bg-[#E5F1ED] text-[#1E2A30] border border-[#D3DADC] text-sm font-bold transition-colors"
            >
              詳しい職務経歴を見る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
