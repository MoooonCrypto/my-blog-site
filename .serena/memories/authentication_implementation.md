# 認証実装の現状と課題

## 現在の実装状況（2024年最終更新）

### 実装済み機能
- ✅ NextAuth.js v5 (beta) の統合
- ✅ Credentials Provider による認証
- ✅ `/admin/*` ルートの保護（middleware.ts）
- ✅ ログインページ (`/admin/login`)
- ✅ ダッシュボードページ (`/admin/dashboard`)
- ✅ セッション管理（JWT strategy）
- ✅ ログイン後のリダイレクト機能

### 実装ファイル
1. **src/auth.ts**: NextAuth.js設定
   - Credentials Provider
   - 環境変数ベースの認証ロジック
   - authorized コールバック

2. **src/middleware.ts**: ルート保護
   - `/admin/*`（`/admin/login`を除く）を保護
   - 未認証ユーザーをログインページへリダイレクト
   - ログイン済みユーザーのログインページアクセスをダッシュボードへリダイレクト

3. **src/app/api/auth/[...nextauth]/route.ts**: NextAuth APIエンドポイント

4. **src/app/admin/login/page.tsx**: ログインフォーム
   - メール・パスワード入力
   - エラーハンドリング
   - ローディング状態管理

5. **src/components/session-provider.tsx**: NextAuthセッションプロバイダー

## 既知の問題と今後の改善点

### ⚠️ セキュリティ上の課題

#### 1. パスワードが平文で保存されている
**現状**: 
```typescript
// src/auth.ts:36
if (credentials.password !== adminPassword) {
  return null;
}
```
- 環境変数 `ADMIN_PASSWORD` に平文パスワードを保存
- 本番環境では大きなセキュリティリスク

**推奨される改善**:
- 環境変数にハッシュ化されたパスワードを保存
- bcryptjs を使用して比較
```typescript
const isValid = await bcrypt.compare(
  credentials.password as string,
  adminPassword
);
```

#### 2. 環境変数ベースの認証
**現状**:
- 単一の管理者アカウントのみ
- データベース連携なし
- ユーザー管理機能なし

**今後の移行計画**:
- Supabase Auth への移行（auth.ts:18のTODOコメント参照）
- データベースからユーザー情報を取得
- 複数の管理者アカウントをサポート
- ロールベースのアクセス制御（RBAC）の実装

### 📋 次のフェーズでの実装予定

1. **Supabase統合**
   - Supabase プロジェクトのセットアップ
   - データベーススキーマの設計
   - Supabase Auth への移行

2. **データベーススキーマ設計**
   - ユーザーテーブル
   - ブログ記事テーブル
   - ポートフォリオテーブル
   - Sandboxテーブル
   - プロフィール情報テーブル

3. **認証フローの改善**
   - パスワードリセット機能
   - メール認証
   - セッション管理の強化

## 環境変数

### 現在必要な環境変数
```
NEXTAUTH_SECRET=<openssl rand -base64 32で生成>
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=admin@mokosau.com
ADMIN_PASSWORD=<secure-password>
```

### 将来追加される環境変数（Supabase統合後）
```
NEXT_PUBLIC_SUPABASE_URL=<your-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

## 参考情報

### Git履歴
- `42bf7cc` - feat: NextAuth.js認証システムを実装
- `d5d5acf` - fix: ログインページのSuspenseエラーを修正

### 関連ドキュメント
- NextAuth.js v5 Beta: https://authjs.dev/
- Supabase Auth: https://supabase.com/docs/guides/auth
