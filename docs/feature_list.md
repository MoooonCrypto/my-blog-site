# Feature List

このドキュメントは現在の実装に合わせた機能一覧です。実際に動いている画面と責務だけを記載します。

## Public Pages

| Page | Status | Notes |
|---|---:|---|
| Home | implemented | 公開中プロダクトをアイコン一覧で表示 |
| Products | implemented | 公開中プロダクトの一覧表示 |
| Product detail | implemented | 説明、スクリーンショット、技術、デモ/GitHubリンクを表示 |
| Blog | implemented | 公開中記事の一覧表示 |
| Blog detail | implemented | 記事本文、タグ、公開日を表示 |
| Profile | implemented | プロフィール、連絡先、SNSリンクを表示 |

## Admin Pages

| Page | Status | Notes |
|---|---:|---|
| Admin login | implemented | NextAuth Credentialsでログイン |
| Dashboard | implemented | コンテンツ数と主要管理画面へのリンク |
| Products admin | implemented | プロダクトの作成、編集、削除、スクリーンショット管理 |
| Blog admin | implemented | ブログ記事の作成、編集、削除 |
| Profile admin | implemented | プロフィールとSNSリンクの編集 |
| Image upload | implemented | Cloudflare R2へアップロード |

## Not In Scope

- Sandboxページ
- MDXベースのブログ
- 一般ユーザー向けアカウント機能

## Near-Term Improvements

- READMEへの本番URLとスクリーンショット追加
- Products詳細の掲載文面を採用向けに調整
- `next/image` への置き換え
- 依存パッケージ更新の検証
