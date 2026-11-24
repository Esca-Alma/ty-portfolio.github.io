// プロフィール・職務経歴・スキルのデータ
// 内容は職務経歴書（2026年10月版）と照合済み。公開サイトのため、会社名・顧客名は一般化して記載している。

/** スキルの経験区分 */
export type SkillLevel = "current" | "work" | "learning";

export const levelLabel: Record<SkillLevel, string> = {
  current: "現在の業務で使用",
  work: "実務経験あり",
  learning: "個人開発・学習",
};

/** 開発工程（職務経歴書の「担当」欄の区分に合わせている） */
export const PHASES = ["要件定義", "詳細設計", "コーディング", "単体テスト", "結合テスト", "運用保守"] as const;
export type Phase = (typeof PHASES)[number];

export const profile = {
  initials: "T.Y.",
  title: "Backend-focused Full Stack Engineer",
  headline: "バックエンドを中心に、Webシステムの設計・開発からクラウド構築まで対応します。",
  // 仕様書のたたき台では「PHP / Laravelを中心」だが、PHPの実務の大半はPhalconのため事実に合わせて表現を調整
  lead: "Python / FastAPI、PHP（Phalcon・Laravel）を用いたバックエンド開発を得意とし、React / TypeScriptによるフロントエンド開発や、AWS / Azureを利用したクラウド環境にも対応します。",
  heroTags: ["Python", "FastAPI", "PHP", "Laravel", "React", "TypeScript", "AWS", "Azure"],
  experience: "システム開発の実務経験は約9年（2017年4月から）",
  status: "現在、副業・業務委託の案件を探しています",
  githubUrl: "https://github.com/esca-alma",
  about: [
    "システムエンジニアとして、Webアプリケーションを中心に設計・開発、テスト、運用保守まで幅広く携わってきました。",
    "これまでJava、PHP、Pythonを用いたサーバーサイド開発を経験しており、現在はPython（FastAPI）とReact・TypeScript（Next.js）を用いて、自治体向けのWebサービスを開発しています。",
    "前職では、大手雑貨チェーンのスマートフォンアプリについて、バックエンドのAPIやデータベース、CMS、バッチ処理を担当しました。国内ベンダーのクラウドからAWSへの基盤移行と、それに合わせたPHPのバージョンアップにも携わっています。",
    "現在は、国勢調査やGTFS（公共交通の路線・時刻表データの標準形式）などのオープンデータを取り込み、交通の現状を指標・グラフ・地図で示すシステムをPoC（試作・検証）の段階から開発しています。自治体の担当者に実際に使っていただき、そのフィードバックを改善につなげています。",
    "要件や業務上の課題を理解したうえで、保守性・拡張性を意識したシステム設計を大切にしています。バックエンド開発を得意領域としつつ、フロントエンドやクラウドインフラも含めて柔軟に対応できます。",
  ],
};

/** 職務要約（職務経歴ページ用） */
export const careerSummary = [
  "2017年に大手SIerへ新卒で入社し、大手自動車メーカーの基幹システム刷新で、詳細設計から現場でのリリースまでを経験しました。画面の項目や流れをお客様に直接提案する機会もありました。",
  "2020年からは小売グループのIT企業で、大手雑貨チェーンのスマートフォンアプリのサーバーサイドを担当しました。機能追加のほか、国内ベンダーのクラウドからAWSへの基盤移行にも携わっています。",
  "2024年からはMaaS関連企業のプロダクト開発部門で、自治体向けのシステムをPoCから開発しています。作ったアプリを協力自治体の方に使っていただき、改善につなげています。",
];

/** トップに並べる事実の一覧 */
export const facts: { label: string; value: string }[] = [
  { label: "実務経験", value: "約9年（2017年4月から）" },
  { label: "経験した業界", value: "自動車（基幹システム）、小売（スマートフォンアプリ）、公共交通（自治体向けシステム）" },
  { label: "主な担当工程", value: "要件定義、詳細設計、実装、テスト、リリース、運用保守" },
  { label: "チーム規模", value: "4名の少人数チームから100名を超える大規模プロジェクトまで" },
];

/** 得意分野・対応できる業務 */
export const strengths: { title: string; body: string }[] = [
  {
    title: "バックエンドを中心としたWebシステム開発",
    body: "Java、PHP、Pythonを用いたサーバーサイド開発の経験があります。API設計・実装、データベース設計、バッチ処理、既存システムの改修まで、バックエンド領域を中心に対応できます。",
  },
  {
    title: "要件・業務を理解した一貫した開発",
    body: "要件定義から設計、実装、テスト、リリースまで経験しています。手作業の運用を自動化した案件では、業務フローがどう変わるかを資料にまとめ、顧客と仕様を詰めてから開発しました。",
  },
  {
    title: "フロントエンドとバックエンドを横断した開発",
    body: "React、TypeScript、Next.jsでの画面開発の経験があります。APIと画面の両方を自分で作れるため、Webアプリケーション全体を見据えた開発ができます。",
  },
  {
    title: "クラウド環境の構築・運用",
    body: "AWSへの基盤移行では、サーバの立ち上げや通信設定、アプリの環境構築からテストまでを担当しました。現在の業務ではAzureとAWSを利用しています。",
  },
  {
    title: "データ処理・外部データ連携",
    body: "GTFSや国勢調査などのオープンデータを取り込み、加工して指標やグラフ、地図として見せるシステムを開発しています。",
  },
];

/** 技術スタック（経験年数や習熟度の数値は、確認できないため掲載しない） */
export const skillGroups: {
  title: string;
  items: { name: string; level: SkillLevel; note: string }[];
}[] = [
  {
    title: "バックエンド",
    items: [
      { name: "Python", level: "current", note: "自治体向けシステムのAPI・データ処理。前職でも利用" },
      { name: "FastAPI", level: "current", note: "自治体向けシステム、個人開発のGTFS Maker" },
      { name: "PHP / Phalcon", level: "work", note: "スマートフォンアプリのAPI・CMS・バッチ（約4年）" },
      { name: "Laravel", level: "work", note: "ECサイトの構築（業務委託）" },
      { name: "Java", level: "work", note: "自動車メーカーの基幹システム刷新" },
      { name: "Spring Boot", level: "learning", note: "学習" },
    ],
  },
  {
    title: "フロントエンド",
    items: [
      { name: "React / Next.js", level: "current", note: "自治体向けシステム、このポートフォリオ" },
      { name: "TypeScript", level: "current", note: "自治体向けシステム、GTFS Maker" },
      { name: "JavaScript / HTML / CSS", level: "work", note: "Webサイトの改修、ECサイトのコーディング" },
      { name: "WordPress", level: "work", note: "ECサイトの構築（業務委託）" },
    ],
  },
  {
    title: "クラウド・インフラ",
    items: [
      { name: "Azure", level: "current", note: "自治体向けシステム" },
      { name: "AWS", level: "current", note: "前職で基盤移行を担当。現在の業務でも利用" },
      { name: "Docker", level: "current", note: "自治体向けシステム、個人開発のGTFS Maker" },
      { name: "Google Cloud", level: "work", note: "前職で利用。GTFS MakerのAPIをApp Engineで公開" },
      { name: "Linux", level: "work", note: "サーバの環境構築・運用" },
    ],
  },
  {
    title: "データベース",
    items: [
      { name: "SQL Server", level: "current", note: "自治体向けシステム" },
      { name: "BigQuery", level: "current", note: "自治体向けシステム。前職でも利用" },
      { name: "MySQL", level: "work", note: "スマートフォンアプリ、ECサイト" },
      { name: "Oracle", level: "work", note: "自動車メーカーの基幹システム" },
      { name: "PostgreSQL / PostGIS", level: "learning", note: "GTFS Makerで停留所の位置データを管理" },
    ],
  },
  {
    title: "データ活用・交通データ",
    items: [
      { name: "GTFS", level: "current", note: "自治体向けシステム、GTFS Maker" },
      { name: "Power BI / Looker Studio", level: "current", note: "交通指標のグラフ化" },
      { name: "Leaflet / OpenStreetMap", level: "learning", note: "GTFS Makerの地図編集画面" },
    ],
  },
];

export const qualifications = [
  "応用情報技術者（2019年7月取得）",
  "Oracle Certified Java Programmer, Silver SE 8（2018年5月取得）",
  "Cisco CCENT（2016年1月取得）",
];

/** 経歴の路線図に表示する駅 */
export type RouteStop = { year: string; title: string; detail: string; current?: boolean };

export const routeStops: RouteStop[] = [
  { year: "2017", title: "大手SIer", detail: "自動車メーカーの基幹システム刷新（Java）" },
  { year: "2020", title: "小売グループのIT企業", detail: "スマホアプリのAPI・CMS開発とAWS移行（PHP）" },
  { year: "2024", title: "MaaS関連企業", detail: "自治体向けの交通データ活用システム（Python・React）", current: true },
];

/** 前職で担当した主な案件（古い順） */
export const retailProjects: { period: string; name: string; body: string }[] = [
  {
    period: "2020年8月〜2021年3月",
    name: "消費税の総額表示への対応",
    body: "アプリに商品情報を送るAPIと、基幹システムから新商品を取り込むバッチを税込み表示に対応しました。DB構造も一部見直し、アプリ担当者と連携して改修しました。",
  },
  {
    period: "2021年4月〜5月",
    name: "週次運用の半自動化",
    body: "スタンプ付与のための更新SQLと本番作業の手順書を、VBAマクロで自動作成するようにしました。1時間かかっていた作業が5分で終わるようになりました。",
  },
  {
    period: "2021年6月〜2022年1月",
    name: "お知らせへの抽選機能の追加",
    body: "イベントの来店者数を先着ではなく抽選で調整したいという要望に対応しました。不正な応募の基準は状況によって変わるため、システムで自動判定せず、応募者の一覧を出力して目視で確認できる仕組みを提案しました。",
  },
  {
    period: "2022年2月〜8月",
    name: "お知らせのプレビュー機能",
    body: "CMSで作ったお知らせが、配信前にスマートフォンの実機でどう表示されるかを確認できる機能を追加しました。誤った情報の配信を減らせると担当者から評価をいただきました。",
  },
  {
    period: "2022年9月〜2023年5月",
    name: "AWSへの基盤移行",
    body: "APIサーバ・DBサーバ・バッチサーバなどを国内ベンダーのクラウドからAWSへ移行しました。サーバの立ち上げ、サーバ間の通信設定、アプリの環境構築からテストまで担当し、あわせてPHPを5.5から8へ更新しました。動かなくなった機能はリグレッションテストで洗い出して修正しています。",
  },
  {
    period: "2023年6月〜9月",
    name: "お知らせ画像の枚数追加",
    body: "お知らせのトップ画像を1枚から3枚に増やすため、CMS・API・DBに加えて、Amazon S3へのアップロードバッチも改修しました。",
  },
  {
    period: "2023年9月〜2024年3月",
    name: "お知らせ配信の自動化",
    body: "クーポンの期限のリマインドなど、手作業で行っていた定型のお知らせ配信を自動化しました。業務フローがどう変わるかを資料にまとめ、顧客と仕様を詰めながら、要件定義からリリースまで担当しました。",
  },
  {
    period: "2024年3月〜7月",
    name: "Webサイトのお知らせ画面の改修",
    body: "アプリ側の画像枚数の変更に合わせて、Webサイトの表示を改修しました。別の担当者が作ったデザインをもとに、APIの改修からコーディング、リリースまで行いました。",
  },
];

/** 職歴 */
export type Career = {
  id: string;
  period: string;
  org: string;
  employment: string;
  summary: string;
  role: string;
  scale: string;
  phases: Phase[];
  tech: string[];
  projects: { period: string; name: string; body: string }[];
};

export const careers: Career[] = [
  {
    id: "maas",
    period: "2024年7月〜現在",
    org: "MaaS関連企業（現職）",
    employment: "正社員",
    summary: "プロダクト開発部門で、自治体向けの公共交通計画の策定を支援するシステムを、PoCから開発しています。",
    role: "SE",
    scale: "4名",
    phases: ["要件定義", "詳細設計", "コーディング", "単体テスト", "結合テスト"],
    tech: ["Python", "FastAPI", "TypeScript", "JavaScript", "React", "Next.js", "SQL Server", "BigQuery", "Azure", "AWS", "Docker", "Power BI", "Looker Studio"],
    projects: [
      {
        period: "2024年7月〜現在",
        name: "公共交通計画の策定支援システム",
        body: "国勢調査やGTFSなどのオープンデータと公的な資料を取り込み、交通の現状を表す指標を算出してダッシュボードに表示する機能を開発しています。数値だけでなく、グラフや地図上のバス路線などで視覚的に分かるように工夫しています。PoCから実証実験まで担当し、自治体の方に実際に使っていただいたフィードバックをもとに改善を続けています。",
      },
    ],
  },
  {
    id: "retail",
    period: "2020年7月〜2024年7月",
    org: "小売グループのIT企業",
    employment: "正社員",
    summary: "大手雑貨チェーンのスマートフォンアプリのサーバーサイドを一貫して担当しました。CMSの機能追加や、アプリの改善に合わせたAPIの追加・改修が中心です。",
    role: "SE",
    scale: "6名",
    phases: ["要件定義", "詳細設計", "コーディング", "単体テスト", "結合テスト"],
    tech: ["PHP", "Phalcon", "Java", "Python", "MySQL", "BigQuery", "AWS", "Google Cloud", "Linux"],
    projects: retailProjects,
  },
  {
    id: "si",
    period: "2017年4月〜2020年6月",
    org: "大手SIer",
    employment: "正社員",
    summary: "新卒で入社し、研修とOJTを経て、大手自動車メーカーの案件を担当する部署に配属されました。",
    role: "SE",
    scale: "100名超",
    phases: ["詳細設計", "コーディング", "単体テスト", "結合テスト"],
    tech: ["Java", "独自フレームワーク", "Oracle"],
    projects: [
      {
        period: "2018年7月〜2019年8月",
        name: "倉庫管理システムの刷新",
        body: "古くなった倉庫管理の基幹システムを、現行の仕様を踏襲しつつ独自フレームワークで作り直すプロジェクトです。既存コードを読み解いて詳細設計とコーディングを行い、テストケースの作成からリリース作業、オフショア開発の成果物の受け入れテストまで担当しました。性能テストで想定の速度が出なかった際は、原因箇所を特定して改修案を先に作り、上司に相談して対応しました。",
      },
      {
        period: "2019年8月〜2020年6月",
        name: "販売店システムの刷新",
        body: "販売店で使うシステムの刷新で、経理領域の画面定義を担当しました。画面に必要な項目や画面の流れを、お客様に直接提案しました。",
      },
    ],
  },
  {
    id: "side",
    period: "2024年2月〜2025年2月",
    org: "ECサイトの構築・保守（副業）",
    employment: "業務委託",
    summary: "カラーコンタクトレンズや美容機器を販売するECサイトで、画面のコーディングと、それに必要なバックエンドの機能開発を担当しました。",
    role: "SE",
    scale: "2〜3名",
    phases: ["詳細設計", "コーディング", "単体テスト", "結合テスト", "運用保守"],
    tech: ["PHP", "Laravel", "WordPress", "MySQL", "Linux"],
    projects: [
      {
        period: "2024年2月〜2025年2月",
        name: "ECサイトの構築・保守",
        body: "デザイナーがFigmaで作った画面をコーディングし、商品詳細やお知らせなどのページを構築しました。在庫管理と決済は外部のECサービスで行い、そこへ誘導する導線を作っています。固定幅のデザインをレスポンシブ対応にし、バックエンドは画面側の要望から仕様を組み立てて実装しました。リリース後の保守も担当しています。",
      },
    ],
  },
];
