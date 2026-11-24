"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

type SectionId = "top" | "profile" | "skills" | "works" | "contact";

const NAV_ITEMS: { id: SectionId; label: string; href: string }[] = [
  { id: "top", label: "Top", href: "/#top" },
  { id: "profile", label: "Profile", href: "/#profile" },
  { id: "skills", label: "Skills", href: "/#skills" },
  { id: "works", label: "Works", href: "/#works" },
  { id: "contact", label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  const pathname = usePathname() || "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("top");

  // GTFS Maker のデモ画面（/agencies, /routes, /map）では専用レイアウトを邪魔しないよう共通ヘッダーを非表示にする
  const isDemoApp =
    pathname.startsWith("/agencies") ||
    pathname.startsWith("/routes") ||
    pathname.startsWith("/map");

  // トップページ閲覧時はスクロール位置に応じて現在のセクションを判定する
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds: SectionId[] = ["top", "profile", "skills", "works", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY + 140;
      let current: SectionId = "top";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // ページ遷移時はスマホメニューを閉じる
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  if (isDemoApp) {
    return null;
  }

  // 現在のページ・セクションのハイライト判定
  const isActive = (id: SectionId): boolean => {
    if (pathname.startsWith("/theme-integrated")) {
      return id === "profile";
    }
    if (pathname.startsWith("/works")) {
      return id === "works";
    }
    if (pathname === "/") {
      return activeSection === id;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F4F6F6]/95 backdrop-blur border-b border-[#D3DADC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-[#1E2A30] hover:text-[#12795A] transition-colors"
        >
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-8 h-8 rounded bg-[#12795A] text-white font-display font-bold text-sm tracking-tight"
          >
            TY
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            T.Y. Portfolio
          </span>
        </Link>

        {/* PC・タブレット向けナビゲーション */}
        <nav aria-label="グローバルナビゲーション" className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.id);
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "location" : undefined}
                className={`px-3.5 py-2 text-sm font-display font-semibold transition-colors border-b-2 ${
                  active
                    ? "border-[#12795A] text-[#12795A]"
                    : "border-transparent text-[#1E2A30] hover:text-[#12795A]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* スマートフォン向けメニュー開閉ボタン */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-global-nav"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          className="md:hidden inline-flex items-center justify-center p-2.5 rounded border border-[#D3DADC] bg-white text-[#1E2A30] hover:border-[#12795A]"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* スマートフォン向けドロワーメニュー */}
      {menuOpen && (
        <nav
          id="mobile-global-nav"
          aria-label="スマートフォン用ナビゲーション"
          className="md:hidden border-t border-[#D3DADC] bg-white px-4 py-3"
        >
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.id);
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? "location" : undefined}
                    className={`flex items-center justify-between px-3 py-2.5 rounded text-base font-display font-semibold ${
                      active
                        ? "bg-[#E5F1ED] text-[#12795A]"
                        : "text-[#1E2A30] hover:bg-[#F4F6F6]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <span className="text-xs font-sans font-normal text-[#12795A]">
                        現在位置
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
