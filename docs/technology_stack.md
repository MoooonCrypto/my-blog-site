# Technology Stack

現在の実装で使っている主要技術の整理です。

| Area | Technology | Purpose |
|---|---|---|
| Framework | Next.js 14 App Router | 公開ページ、管理画面、Route Handlersを同一リポジトリで扱う |
| UI | React 18 | App Router上のUI実装 |
| Language | TypeScript | DB/API/UI間の型崩れを減らす |
| Styling | Tailwind CSS | 小規模なポートフォリオUIを素早く調整する |
| Database | Turso / LibSQL | プロダクト、ブログ、プロフィールを保存する |
| ORM | Drizzle ORM | SQLite系スキーマをTypeScriptから扱う |
| Auth | NextAuth Credentials | `/admin` 配下の管理画面を保護する |
| Storage | Cloudflare R2 | アイコン、スクリーンショット、プロフィール画像を保存する |
| CI | GitHub Actions | install、typecheck、buildを検証する |

## Notes

- ブログ本文はDB上のテキストを表示しています。MDX変換ライブラリは使っていません。
- 管理者パスワードは平文ではなく、SHA-256ハッシュを環境変数 `ADMIN_PASSWORD_HASH` として比較しています。
