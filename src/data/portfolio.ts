// 開発実績（Works）のデータ
// 業務で開発したものは、会社・顧客の内部情報を含まないよう一般化して記載している。
// 並び順：実務での開発実績を優先し、個人開発（GTFS Maker）は最後に配置している。
import { retailProjects } from "./personal";

export type Work = {
  slug: string;
  title: string;
  kind: string;
  period?: string;
  scale?: string;
  summary: string;
  problem: string;
  purpose: string;
  scope: string;
  tech: string[];
  features: string[];
  decisions: string[];
  challenges?: { problem: string; solution: string }[];
  timeline?: { period: string; name: string; body: string }[];
  links: { label: string; href: string; external?: boolean }[];
  notes?: string[];
};

export const works: Work[] = [
  {
    slug: "transit-planning",
    title: "公共交通計画の策定支援システム",
    kind: "現職・自治体向け",
    period: "2024年7月〜現在",
    scale: "4名",
    summary: "オープンデータを組み合わせて地域の交通の現状を指標・グラフ・地図で示し、自治体の交通計画づくりを支えるシステムです。",
    problem: "自治体には地域公共交通計画の策定が求められています（努力義務）。しかし、交通計画の立て方やオープンデータの使い方に詳しい職員は少なく、交通コンサルタントに依頼する予算を確保するのも難しいのが現状です。",
    purpose: "職員だけでは扱いきれなかったデータを活用できるようにし、コンサルタントに依頼する予算がない自治体でも計画を策定できるようにすることを目指しています。",
    scope: "PoCの開発から、テスト、実証実験までを担当しています（要件定義、詳細設計、コーディング、単体テスト、結合テスト）。",
    tech: ["Python", "FastAPI", "TypeScript", "React", "Next.js", "SQL Server", "BigQuery", "Azure", "AWS", "Docker", "Power BI", "Looker Studio"],
    features: [
      "国勢調査、バス会社が公開しているGTFS、国の資料などのデータの取り込み",
      "取り込んだデータを組み合わせた、交通の現状を表す指標の算出とダッシュボードでの表示",
      "Power BIやLooker Studioを使ったグラフ表示",
      "地図上へのバス路線などの表示",
    ],
    decisions: [
      "数値を並べるだけでなく、グラフや地図で視覚的に分かるように見せ方を工夫しています。",
      "協力自治体の担当者に実際に触っていただき、そのフィードバックをもとに改善を進めています。",
    ],
    links: [],
    notes: ["業務で開発しているシステムのため、画面やソースコードは公開していません。"],
  },
  {
    slug: "retail-app-backend",
    title: "小売スマホアプリのバックエンド開発とAWS移行",
    kind: "前職",
    period: "2020年7月〜2024年7月",
    scale: "6名",
    summary: "大手雑貨チェーンのスマートフォンアプリについて、API・CMS・DB・バッチの機能追加と、AWSへの基盤移行を担当しました。",
    problem: "会員向けのお知らせやクーポン、スタンプなどの機能を、CMSとバッチで運用していました。運用の手作業や、お知らせの誤配信のリスク、古いクラウド基盤の契約終了といった課題がありました。",
    purpose: "アプリの改善に合わせてサーバーサイドの機能を追加しつつ、運用の負担を減らし、AWSへ移行して基盤を刷新することが目的でした。",
    scope: "サーバーサイド全般（API、CMS、DB、バッチ）を担当し、案件によって要件定義からリリースまで対応しました。",
    tech: ["PHP", "Phalcon", "MySQL", "Java", "Python", "BigQuery", "AWS", "Amazon S3", "Google Cloud", "Linux"],
    features: [
      "お知らせのプレビュー、抽選、画像の複数枚化、配信の自動化",
      "消費税の総額表示に合わせたAPI・バッチの改修",
      "APIサーバ・DBサーバ・バッチサーバのAWSへの移行",
      "VBAマクロによる週次の運用作業の半自動化",
    ],
    decisions: [
      "抽選機能では、不正な応募の基準が状況で変わるため、システムで自動判定せず、応募者の一覧を出力して目視で確認する運用を提案しました。",
      "お知らせ配信の自動化では、業務フローの変化を資料にまとめ、顧客と仕様を合意してから開発しました。",
    ],
    challenges: [
      {
        problem: "AWS移行にあわせてPHPを5.5から8へ更新したため、一部の機能が動かなくなりました。",
        solution: "リグレッションテストで影響のある機能を洗い出し、一つずつ修正しました。",
      },
      {
        problem: "スタンプ付与の更新SQLと本番作業の手順書を、毎週手作業で作っていました。",
        solution: "VBAマクロで自動作成するようにし、1時間かかっていた作業を5分に短縮しました。",
      },
    ],
    timeline: retailProjects,
    links: [],
    notes: ["業務で開発したシステムのため、画面やソースコードは公開していません。"],
  },
  {
    slug: "ec-site",
    title: "美容商品のECサイトの構築・保守",
    kind: "副業・業務委託",
    period: "2024年2月〜2025年2月",
    scale: "2〜3名",
    summary: "カラーコンタクトレンズや美容機器を販売するECサイトで、画面のコーディングとバックエンドの機能開発、リリース後の保守を担当しました。",
    problem: "デザイナーから共有される画面デザインは固定幅で作られていて、スマートフォンでの表示や画面の動きは実装側で考える必要がありました。",
    purpose: "デザインを再現しつつ、どの端末でも使いやすいECサイトを構築することが目的でした。",
    scope: "詳細設計、コーディング、単体テスト、結合テスト、運用保守を担当しました。",
    tech: ["PHP", "Laravel", "WordPress", "MySQL", "Linux", "HTML / CSS", "JavaScript"],
    features: [
      "Figmaのデザインをもとにした画面のコーディング",
      "商品詳細やお知らせなどのページの構築",
      "在庫管理と決済を担う外部のECサービスへの導線",
      "画面に必要なバックエンドの機能",
    ],
    decisions: [
      "固定幅のデザインを、こちらでレスポンシブ対応にして実装しました。",
      "バックエンドは細かな指示がなかったため、画面側でどう動いてほしいかを聞き取り、仕様を組み立てて実装しました。",
    ],
    links: [],
    notes: ["クライアントの案件のため、サイト名やURLは掲載していません。"],
  },
  {
    slug: "gtfs-maker",
    title: "GTFS Maker",
    kind: "個人開発",
    // TODO: 開発期間が確認できたら period を追加する
    summary: "地図上で停留所を置き、路線を組み立てて、公共交通のデータ形式GTFSを作るWebアプリケーションです。",
    problem: "GTFSは、事業者・停留所・路線・運行日・時刻などを複数のCSVファイルで表すデータ形式です。手作業で作ると、ファイル同士のIDのつながりや停車順をそろえる手間がかかり、誤りも起きやすくなります。",
    purpose: "停留所の位置や停車順を地図上で直感的に編集し、そのままGTFSの各ファイルを出力できるようにすることを目指しました。",
    scope: "設計、画面（フロントエンド）、API、データベース、デプロイまで一人で担当しました。",
    tech: ["Python", "FastAPI", "SQLAlchemy", "GeoAlchemy2", "Pydantic", "PostgreSQL / PostGIS", "Next.js", "React", "TypeScript", "Tailwind CSS", "Leaflet", "OpenStreetMap", "Docker", "Google App Engine"],
    features: [
      "バス会社（事業者）の登録・一覧・削除",
      "事業者ごとの路線の作成・削除",
      "地図をクリックして停留所を追加し、停留所名を編集",
      "マーカーのドラッグで位置を調整し、一覧のドラッグ＆ドロップで停車順を並べ替えて保存",
      "GTFSファイル（agency / stops / routes / calendar / trips / stop_times）をまとめたZIPの出力と、簡易的なデータ検証のAPI",
    ],
    decisions: [
      "GTFSの各ファイルに対応させてテーブルを設計し、路線ごとの停車順は中間テーブルで管理しています。",
      "停留所はPostGIS（PostgreSQLの位置情報拡張）とGeoAlchemy2で、緯度・経度に加えて位置データとしても保持しています。",
      "APIのレスポンスを { data, error } の形にそろえ、入力エラーやHTTPエラーも共通の例外ハンドラで同じ形式で返すようにしました。",
      "JWTによるログイン認証を実装したうえで、デモとして公開するために、環境変数で認証を省略できるようにしています。",
      "Docker ComposeでデータベースとAPIのローカル環境を再現できるようにし、APIはGoogle App Engine（Gunicorn＋Uvicorn）、画面はGitHub Pagesに分けて公開しています。",
    ],
    challenges: [
      {
        problem: "地図ライブラリのLeafletはブラウザ上でしか動かないため、静的サイトとして書き出すときにエラーになりました。",
        solution: "地図の部分だけを next/dynamic で読み込み、サーバー側での描画を無効にしました。",
      },
      {
        problem: "ビルド後にLeafletのマーカー画像のパスが崩れ、地図にマーカーが表示されませんでした。",
        solution: "マーカー画像の参照先を明示的に指定し直しました。",
      },
    ],
    links: [{ label: "デモを開く", href: "/agencies" }],
    // TODO: リポジトリを公開する場合は links に GitHub のURLを追加する
    notes: [
      "GTFSファイルの出力はAPI側に実装済みですが、デモの画面からは現在使えません。",
      "デモは共有のデータベースにつながっているため、登録した内容はほかの閲覧者にも表示されます。",
    ],
  },
];

export function getWork(slug: string): Work | undefined {
  return works.find((w) => w.slug === slug);
}
