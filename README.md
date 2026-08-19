# Portfolio Blog

個人開発のプロダクト、技術記事、プロフィールをまとめるためのポートフォリオサイトです。

公開ページは閲覧者が制作物に辿り着きやすい構成にし、掲載内容は管理画面から更新できるようにしています。プロダクト情報、ブログ記事、プロフィールはDBで管理し、画像はCloudflare R2に保存します。

## Demo

本番URLとスクリーンショットは追加予定です。

## Features

- Product listing and detail pages
- Blog listing and detail pages
- Profile page with social links
- Admin pages for products, blog posts, and profile content
- Image upload to Cloudflare R2
- Admin authentication with NextAuth Credentials

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS
- Drizzle ORM
- Turso / LibSQL
- NextAuth
- Cloudflare R2

## Project Structure

```text
src/app                App Router pages and route handlers
src/app/admin          Admin screens
src/app/api            API routes
src/components         Shared UI and layout components
src/lib/api            Data access functions
src/lib/db             Drizzle client and schema
docs                   Project notes
```

## Getting Started

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

See [.env.example](./.env.example).

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

`ADMIN_PASSWORD_HASH` is a SHA-256 hex digest.

```bash
echo -n 'your-password' | shasum -a 256
```

## Scripts

```bash
npm run dev       # start development server
npm run build     # create production build
npm run lint      # run Next.js lint
npx tsc --noEmit  # typecheck
```

## CI

GitHub Actions runs:

- `npm ci`
- `npx tsc --noEmit`
- `npm run build`

The workflow uses dummy environment values so CI can validate installation, type checking, and production build without connecting to production services.

## Notes

- Public product and blog pages only show records marked as `published`.
- Admin pages are protected under `/admin`.
- `npm run build` currently passes with non-blocking warnings from `@next/next/no-img-element` and Browserslist.
