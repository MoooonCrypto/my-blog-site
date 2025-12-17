# プロジェクト概要

## プロジェクト名
**MokosauBlog** - ポートフォリオとブログサイト

## プロジェクトの目的
プロダクトと技術記事を発信する個人ブログサイト。以下の主要セクションを持つ：
- **ポートフォリオ**: 開発済みのアプリやWebサービスの紹介
- **Sandbox**: 開発中や実験的な取り組みの共有
- **ブログ**: 技術記事やプロダクトに関する記事の投稿
- **プロフィール**: 自己紹介、経歴、スキルセット、連絡先
- **管理画面（Admin）**: コンテンツのCRUD操作を行う認証付き管理画面

## プロジェクト構造
```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # 管理画面（認証が必要）
│   │   ├── login/         # ログインページ
│   │   ├── dashboard/     # ダッシュボード
│   │   ├── blog/          # ブログ管理
│   │   ├── portfolio/     # ポートフォリオ管理
│   │   ├── sandbox/       # Sandbox管理
│   │   └── profile/       # プロフィール管理
│   ├── blog/              # 公開ブログページ
│   ├── portfolio/         # 公開ポートフォリオページ
│   ├── sandbox/           # 公開Sandboxページ
│   ├── profile/           # 公開プロフィールページ
│   ├── api/               # API Routes
│   │   └── auth/          # NextAuth.js認証エンドポイント
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # トップページ
├── components/
│   ├── ui/                # shadcn/ui コンポーネント
│   ├── layout/            # Header, Footer
│   ├── theme-provider.tsx # ダークモードプロバイダー
│   └── session-provider.tsx # NextAuth セッションプロバイダー
├── lib/
│   └── utils.ts           # ユーティリティ関数（cn関数など）
├── auth.ts                # NextAuth.js設定
└── middleware.ts          # 認証ミドルウェア
```

## 言語設定
- デフォルト言語: **日本語** (`lang="ja"`)
- UIメッセージやエラーメッセージも日本語
- 日本語フォント: Noto Sans JP

## デザインシステム
- デフォルトテーマ: **ダークモード**
- システムテーマは無効化（`enableSystem={false}`）
- フォント:
  - Heading: Syne
  - Body: Manrope
  - Mono: JetBrains Mono
  - Japanese: Noto Sans JP
