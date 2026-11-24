import type { Metadata } from "next";
import { BIZ_UDPGothic, Overpass } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

// 日本語本文用：自治体・公共の案内でも使われるユニバーサルデザイン書体
const bizUdpGothic = BIZ_UDPGothic({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-biz-udpgothic",
  display: "swap",
});

// 英字見出し・年号・技術タグ用：道路標識書体（Highway Gothic）由来のフォント
const overpass = Overpass({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-overpass",
  display: "swap",
});

export const metadata: Metadata = {
  title: "T.Y. | Backend-focused Full Stack Engineer Portfolio",
  description:
    "Python / FastAPI、PHP（Phalcon・Laravel）を中心としたバックエンド開発から、React / TypeScriptによるフロントエンド開発、AWS / Azureクラウド環境まで対応するシステムエンジニア T.Y. のポートフォリオサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${bizUdpGothic.variable} ${overpass.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F6F6] text-[#1E2A30]">
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
