"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile } from "@/data/personal";

export default function SiteFooter() {
  const pathname = usePathname() || "/";

  // GTFS Maker のデモ画面では専用レイアウトを維持するためフッターを非表示にする
  const isDemoApp =
    pathname.startsWith("/agencies") ||
    pathname.startsWith("/routes") ||
    pathname.startsWith("/map");

  if (isDemoApp) {
    return null;
  }

  return (
    <footer className="border-t border-[#D3DADC] bg-white text-[#1E2A30]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-display font-bold text-base">
            {profile.initials} — {profile.title}
          </p>
          <p className="text-sm text-[#58656C] mt-1">
            Built with Next.js &amp; Tailwind CSS, hosted on GitHub Pages.
          </p>
        </div>

        <nav aria-label="フッターナビゲーション" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <Link href="/#top" className="text-[#1E2A30] hover:text-[#12795A] transition-colors">
            Top
          </Link>
          <Link href="/#profile" className="text-[#1E2A30] hover:text-[#12795A] transition-colors">
            Profile
          </Link>
          <Link href="/#skills" className="text-[#1E2A30] hover:text-[#12795A] transition-colors">
            Skills
          </Link>
          <Link href="/#works" className="text-[#1E2A30] hover:text-[#12795A] transition-colors">
            Works
          </Link>
          <Link href="/theme-integrated" className="text-[#1E2A30] hover:text-[#12795A] transition-colors">
            職務経歴詳細
          </Link>
          <Link href="/agencies" className="text-[#1E2A30] hover:text-[#12795A] transition-colors">
            GTFS Maker デモ
          </Link>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1E2A30] hover:text-[#12795A] transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
