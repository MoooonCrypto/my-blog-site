# Supabase設定チェックリスト

実施日: 2025-12-09

---

## 🔧 必須設定項目

### 1. **Authentication > URL Configuration** ⚠️ 要対応

現状: Redirect URLが設定されていない

#### 設定手順:
1. Supabase管理画面にログイン: https://supabase.com/dashboard
2. プロジェクト `my-blog` を選択
3. 左サイドバーから **Authentication** → **URL Configuration** を開く
4. 以下のように設定：

```
Site URL:
http://localhost:3000

Redirect URLs（複数設定可能）:
http://localhost:3000
http://localhost:3000/**
http://localhost:3000/api/auth/callback/**
```

#### 本番環境デプロイ時の追加設定:
```
Site URL:
https://your-domain.com

Redirect URLs:
https://your-domain.com
https://your-domain.com/**
https://your-domain.com/api/auth/callback/**
```

---

### 2. **Project Settings > API** ✅ 確認済み

現状: Publishable keyとSecret keysが表示されている（正常）

#### 確認事項:
- ✅ Publishable Key: `sb_publishable_...` が表示されている
- ✅ Secret Keys:
  - `anon` (public): Anon Key - クライアントサイドで使用可能
  - `service_role` (secret): Service Role Key - **サーバーサイドのみで使用**

#### 重要:
- **Service Role Key** は絶対にクライアントサイドで使用しない
- **Service Role Key** はRLSをバイパスするため、管理画面でのみ使用
- 現在の実装では Publishable Key のみを使用（安全）

---

### 3. **Database > Replication** ℹ️ 参考情報

現状: Primary database → iceberg-3table, BigQuery-5table という表示

#### 説明:
これは **Database Replication** の機能で、Supabaseが提供するデータエクスポート機能です。
- **Iceberg**: Apache Iceberg形式でのデータエクスポート
- **BigQuery**: Google BigQueryへのデータエクスポート

#### 対応:
現時点では設定不要です。データ分析が必要になった際に設定を検討してください。

---

### 4. **Project Settings > General** ⚠️ 確認推奨

現状: 特に設定されていなさそう

#### 確認・設定すべき項目:

##### a. **Project name**
- プロジェクト名: `my-blog`

##### b. **Region**
- リージョン: `ap-northeast-1` (Tokyo) - 確認済み

##### c. **Pause project** (無料プランの場合)
- 無料プランでは1週間非アクティブでプロジェクトが一時停止される
- 有料プランに変更すれば常時稼働

##### d. **Organization**
- 所属する組織を確認

#### 設定手順:
1. **Project Settings** → **General** を開く
2. 以下を確認：
   - Project name: `my-blog`
   - Region: `Northeast Asia (Tokyo)` - ap-northeast-1
   - Reference ID: `tkjpmtqihzaqbundevhu`

---

## 🛡️ セキュリティ設定の確認

### 1. **Database > Policies** ✅ 設定済み

RLSポリシーが全テーブルに設定されていることを確認：

#### 確認手順:
1. **Database** → **Tables** を開く
2. 各テーブルで「RLS enabled」が緑色のチェックマークになっていることを確認

テーブル一覧:
- [x] blog_posts - RLS enabled
- [x] portfolio_items - RLS enabled
- [x] sandbox_items - RLS enabled
- [x] profiles - RLS enabled

#### ポリシー内容の確認:
各テーブルの「Policies」タブを開いて、以下のポリシーが設定されていることを確認：

**blog_posts の例:**
- ✅ Public blog posts are viewable by everyone (SELECT, public)
- ✅ All blog posts are viewable by authenticated users (SELECT, authenticated)
- ✅ Authenticated users can insert blog posts (INSERT, authenticated)
- ✅ Authenticated users can update blog posts (UPDATE, authenticated)
- ✅ Authenticated users can delete blog posts (DELETE, authenticated)

---

### 2. **Authentication > Providers** ℹ️ 参考

#### 確認事項:
1. **Authentication** → **Providers** を開く
2. 現在使用しているプロバイダーを確認

#### デフォルトで有効なプロバイダー:
- Email (通常は有効)

#### 注意:
- 現在の実装では NextAuth.js を使用しているため、Supabase Authのプロバイダーは使用していません
- 将来的にSupabase Authへ移行する場合は、ここで認証プロバイダーを設定します

---

### 3. **Authentication > Email Templates** ℹ️ 参考

将来的にSupabase Authを使用する場合の設定項目です。

#### テンプレート種類:
- Confirm signup (サインアップ確認メール)
- Invite user (ユーザー招待メール)
- Magic Link (マジックリンクメール)
- Change Email Address (メールアドレス変更確認)
- Reset Password (パスワードリセット)

現時点では設定不要です。

---

## 🧪 テスト項目

### 1. **接続テスト**
```bash
# 開発サーバーを起動
npm run dev

# ブラウザでアクセス
http://localhost:3000
```

### 2. **認証テスト**
- [ ] ログインページにアクセス: http://localhost:3000/admin/login
- [ ] 正しい認証情報でログイン成功
- [ ] 誤った認証情報でログイン失敗
- [ ] ログイン後、管理画面にアクセス可能
- [ ] ログアウト機能の動作確認

### 3. **RLSポリシーテスト**
- [ ] 未認証状態で公開記事が表示される
- [ ] 未認証状態で非公開記事が表示されない
- [ ] 認証済み状態で全ての記事が表示される
- [ ] 認証済み状態でCRUD操作が可能

### 4. **APIエンドポイントテスト**
- [ ] Blog API (GET, POST, PUT, DELETE)
- [ ] Portfolio API (GET, POST, PUT, DELETE)
- [ ] Sandbox API (GET, POST, PUT, DELETE)
- [ ] Profile API (GET, PUT)

---

## 📝 次のステップ

1. ✅ **Redirect URLsを設定** （最優先）
2. ✅ **接続テストを実施**
3. ✅ **セキュリティテストを実施**
4. ✅ **ADMIN_PASSWORDを強力なパスワードに変更**
5. ✅ **管理画面UIの実装**

---

## 🆘 トラブルシューティング

### 問題: Supabaseに接続できない

#### チェック項目:
1. `.env.local` の環境変数が正しく設定されているか
2. `NEXT_PUBLIC_SUPABASE_URL` が正しいか
3. `NEXT_PUBLIC_SUPABASE_ANON_KEY` が正しいか
4. 開発サーバーを再起動したか（環境変数変更後は必須）

### 問題: RLSエラーが発生する

#### チェック項目:
1. RLSポリシーが正しく設定されているか
2. 認証状態が正しいか
3. Supabase管理画面の「Database」→「Policies」で確認

### 問題: 認証が機能しない

#### チェック項目:
1. `NEXTAUTH_SECRET` が設定されているか
2. `NEXTAUTH_URL` が正しいか
3. Redirect URLsが設定されているか
4. ブラウザのCookieが有効か
