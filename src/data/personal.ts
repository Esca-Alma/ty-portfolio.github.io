export const personalData = {
  profile: {
    name: "T.Y", // ※別途ご自身のお名前に変更してください
    role: "システムエンジニア",
    catchphrase: "Java, PHP, Pythonを用いた堅牢なシステム開発を実践",
    about: `NECグループのSIer企業にて2017年に入社し、システムエンジニアとしてキャリアをスタート。その後、セブングループのユーザー系SIer企業でのバックエンド・フルスタック開発を経て、現在はMaaS Tech Japanのプロダクト開発部に所属しています。
設計から実装・テストまでの一貫した対応はもちろん、React/Pythonを伴うモダンなWeb開発からAWSやAzureを利用したクラウド環境構築まで、幅広い技術領域で自社・顧客のプロダクト価値向上に貢献してきました。`,
    strengths: [
      "要件定義・基本設計といった上流工程から、実装・テストまでのフルサイクルな開発経験",
      "Java / PHP / Python を用いた堅牢でスケーラブルなサーバーサイド構築",
      "Azure, AWS等を利用したクラウドインフラ構築およびオンプレミスからの移行対応",
      "Reactなどのモダンフロントエンドフレームワークとの連携を前提としたAPI設計",
      "WBS作成による進捗管理や若手へのOJTなど、チーム開発における推進力"
    ]
  },
  skills: {
    backend: [
      { name: "Java", years: 5 },
      { name: "PHP", years: 3 },
      { name: "Python", years: 3 },
      { name: "Spring Boot", years: 3 },
      { name: "Phalcon (PHP)", years: 3 }
    ],
    frontend: [
      { name: "HTML / CSS", years: 5 },
      { name: "JavaScript", years: 5 },
      { name: "React", years: 2.5 }
    ],
    infrastructure: [
      { name: "Linux", years: 5 },
      { name: "Azure", years: 2 },
      { name: "AWS", years: 1 }
    ],
    database: [
      { name: "MySQL", years: 5 },
      { name: "Oracle SQL", years: 1 },
      { name: "SQL Server", years: 2 }
    ],
    qualifications: [
      "応用情報技術者 (2019年7月取得)",
      "Oracle Java Programmer Silver SE 8 (2018年5月取得)",
      "Cisco CCENT (2016年1月取得)"

    ]
  },
  projects: [
    {
      title: "MaaSプラットフォーム プロダクト開発",
      period: "2024年7月〜現在",
      company: "MaaS Tech Japan株式会社　現職",
      summary: "自社MaaS関連プロダクトの機能追加および新規設計・開発。",
      background: "プロダクトの新規機能追加と継続的なアーキテクチャの改善が必要とされていた。",
      role: "バックエンドテックリード・SE（要件定義、基本設計、実装、テスト）",
      results: [
        "ReactおよびPythonを用いた自社サービスの新規開発における要件定義から実装、テストまでの一貫した開発",
        "PoC段階からのシステム実装および推進",
        "交通におけるDX推進をITの側面からサポートする自社サービスの新規開発"
      ],
      techStack: ["Python", "React", "SQL", "Windows", "JavaScript", "HTML/CSS"]
    },
    {
      title: "Webアプリケーション改修 および AWSクラウド移行プロジェクト",
      period: "2020年7月〜2024年7月",
      company: "セブン&アイ・ホールディングスグループ傘下のユーザー系SIer企業",
      summary: "既存WebサービスのUI変更、追加機能開発、オンプレミス環境からAWSへの基盤移行。",
      background: "レガシーなシステム環境の刷新と、クラウド化によるインフラのスケーラビリティ確保が急務であった。",
      role: "サーバーサイドおよびインフラ担当エンジニア (API設計、DB設計)",
      results: [
        "PHP (Phalcon) を用いた某有名雑貨店スマホアプリのバックエンドのAPI・DBの新規開発及び改修",
        "CMSやDBサーバーへのバッチ処理機能の要件定義からリリースまでの実行",
        "NEC製クラウドサービスからAWS環境へのシステム移行の主導、一部インフラ構築・検証の遂行"
      ],
      techStack: ["PHP", "Phalcon", "MySQL", "Linux", "AWS"]
    },
    {
      title: "新規システム開発およびシステム更改プロジェクト",
      period: "2017年4月〜2020年6月",
      company: "NECグループのSIer企業",
      summary: "レガシーシステムの更改対応。",
      background: "老朽化したシステムの刷新と、新たな業務要件に対応するシステム基盤の開発。",
      role: "システムエンジニア (詳細設計、コーディング、テスト)",
      results: [
        "JavaおよびOracle Databaseを用いたT自動車の基幹システム更改・開発",
        "詳細設計書の作成、単体・結合テスト仕様書の策定および実施",
        "某自動車会社の基幹システム刷新PJへの参画。詳細設計から現場でのリリースまでを経験"
      ],
      techStack: ["Java", "Spring Framework", "Oracle", "Windows"]
    }
  ]
};
