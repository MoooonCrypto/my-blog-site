# Portfolio Blog

個人開発のプロダクト、技術メモ、プロフィールをまとめるためのポートフォリオサイトです。採用担当者や開発者が短い時間で制作物を確認できるように、公開中のプロダクトをトップとProductsページに集約し、詳細ページからデモやGitHubへ辿れる構成にしています。

管理画面を持たせているので、掲載するプロダクト、ブログ記事、プロフィールはコードを書き換えずに更新できます。静的な紹介ページではなく、小さなCMSとして運用できるようにした点がこのリポジトリの主な実装ポイントです。

## 現在できること

- 公開中プロダクトの一覧表示
- プロダクト詳細ページでの説明、スクリーンショット、使用技術、外部リンク表示
- ブログ記事の一覧・詳細表示
- プロフィールとSNS/外部リンク表示
- `/admin` 配下でのプロダクト、ブログ、プロフィール管理
- Cloudflare R2への画像アップロード
- NextAuth Credentialsによる管理画面保護

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

## 構成メモ

- データはTurso / LibSQLに保存しています。
- DBアクセスは `src/lib/api/*` に集約しています。
- テーブル定義は `src/lib/db/schema.ts` にあります。
- 公開ページでは `published` が true のデータだけを表示します。
- 画像ファイルはR2へアップロードし、DBには公開URLを保存します。
- 管理画面は `src/app/admin`、管理APIは `src/app/api/admin` にまとめています。

## セットアップ

```bash
npm ci
cp .env.example .env.local
npm run dev
```

開発サーバーは `http://localhost:3000` で起動します。

## 環境変数

`.env.example` を参考に `.env.local` を作成します。

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

`ADMIN_PASSWORD_HASH` はSHA-256のhex文字列を指定します。

```bash
echo -n 'your-password' | shasum -a 256
```

## よく使うコマンド

```bash
npm run dev
npm run build
npm run lint
npx tsc --noEmit
```

## CI

GitHub Actionsでは以下を実行します。

- `npm ci`
- `npx tsc --noEmit`
- `npm run build`

CIでは実DBやR2に接続しない前提で、ビルドに必要な環境変数だけダミー値を渡しています。本番環境ではホスティング先に実際のTurso、R2、NextAuth、管理者アカウントの値を設定してください。

## 確認済み

- `npm ci`
- `npx tsc --noEmit`
- `npm run build`

`npm run build` では `<img>` に関するNext.jsのlint warningと、Browserslistの更新警告が出ます。どちらも現時点ではビルドを止めるものではありません。

## 今後の改善

- 本番URLとスクリーンショットをREADMEに追加する
- 掲載プロダクトの説明文とリンクを採用向けに整える
- `<img>` を `next/image` に段階的に置き換える
- Next.js / NextAuthの依存更新を別タスクとして検証する
- ローカルツール設定や一時的な作業メモをリポジトリから外す
