# PFサイト

## プロダクト名

個人開発のプロダクト、技術記事、プロフィールをまとめるためのポートフォリオサイトです。

公開ページでは制作物や記事を閲覧しやすく整理し、掲載内容は管理画面から更新できます。プロダクト情報、ブログ記事、プロフィールはTurso / LibSQLで管理し、画像はCloudflare R2に保存します。

本番URLとスクリーンショットは追加予定です。

## 機能

- プロダクト一覧・詳細ページ
- ブログ一覧・詳細ページ
- プロフィールページ
- プロダクト、ブログ、プロフィールの管理画面
- Cloudflare R2への画像アップロード
- NextAuth Credentialsによる管理画面認証

## 技術スタック

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Drizzle ORM
- Turso / LibSQL
- NextAuth
- Cloudflare R2
- GitHub Actions

## 設計・実装

```text
src/app                App Router pages and route handlers
src/app/admin          Admin screens
src/app/api            API routes
src/components         Shared UI and layout components
src/lib/api            Data access functions
src/lib/db             Drizzle client and schema
docs                   Project notes
```

- 公開ページでは `published` が true のプロダクト・記事のみ表示します。
- DBアクセスは `src/lib/api/*` に集約しています。
- テーブル定義は `src/lib/db/schema.ts` にあります。
- 管理画面は `/admin` 配下にまとめ、middlewareとNextAuthで保護しています。
- CIでは実DBやR2に接続せず、ダミー環境変数でinstall、typecheck、buildを検証します。

## セットアップ

```bash
npm ci
cp .env.example .env.local
npm run dev
```

開発サーバーは `http://localhost:3000` で起動します。

`.env.local` には以下を設定します。詳細は [.env.example](./.env.example) を参照してください。

```bash
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
AUTH_SECRET=
NEXTAUTH_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD_HASH=
CLOUDFLARE_R2_ACCOUNT_ID=
CLOUDFLARE_R2_ACCESS_KEY_ID=
CLOUDFLARE_R2_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_BUCKET_NAME=
NEXT_PUBLIC_R2_PUBLIC_URL=
```

`ADMIN_PASSWORD_HASH` はSHA-256のhex文字列です。

```bash
echo -n 'your-password' | shasum -a 256
```

動作確認:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## その他

GitHub Actionsでは以下を実行します。

- `npm ci`
- `npx tsc --noEmit`
- `npm run build`

`npm run build` は通過確認済みです。現時点では `<img>` に関するNext.js lint warningとBrowserslistの更新警告が残っていますが、buildを止めるものではありません。
