# 技術スタック

## フロントエンド
- **Next.js**: 14.2.3 (App Router使用)
- **React**: 18
- **TypeScript**: 5 (strict mode)
- **Tailwind CSS**: 3.4.1
  - `tailwindcss-animate` プラグイン使用
  - カスタムフォント設定
  - shadcn/ui のカラーシステム

## UIライブラリ
- **shadcn/ui**: Radix UIベースのコンポーネント
  - `@radix-ui/react-label`
  - `@radix-ui/react-slot`
- **Lucide React**: アイコンライブラリ
- **next-themes**: テーマ管理（ダークモード）

## 認証
- **NextAuth.js**: v5.0.0-beta.30
  - Credentials Provider使用
  - JWT session strategy
  - 現状: 環境変数ベースの認証（ADMIN_EMAIL, ADMIN_PASSWORD）
  - 将来: Supabase Authへ移行予定（auth.ts:18にTODOコメントあり）

## データベース（予定）
- **Supabase**: PostgreSQL (未実装、次のフェーズで実装予定)
  - `@supabase/supabase-js`: 2.39.0
  - `@supabase/auth-helpers-nextjs`: 0.8.7

## フォーム管理
- **React Hook Form**: 7.48.2
- **Zod**: 3.22.4 (バリデーション)

## Markdown処理
- **next-mdx-remote**: 4.4.1 (ブログ記事用)

## パスワードハッシング
- **bcryptjs**: 3.0.3 (現在は未使用、将来のDB認証時に使用予定)

## ユーティリティ
- **clsx**: クラス名の条件付き結合
- **tailwind-merge**: Tailwindクラスの競合解決
- **class-variance-authority**: バリアント管理（UIコンポーネント用）

## デプロイ
- **Vercel** (予定)

## 開発ツール
- **ESLint**: Next.jsの推奨設定（`next/core-web-vitals`）
- **PostCSS**: Tailwind CSS処理
- **Autoprefixer**: ベンダープレフィックス自動付与
