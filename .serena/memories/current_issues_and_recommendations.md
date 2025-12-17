# 現在の問題点と推奨事項

## 🚨 重要: セキュリティ脆弱性

### 1. Next.js の重大な脆弱性（Critical）
**現状**: Next.js 14.2.3を使用中
**問題**: 
- キャッシュポイズニング
- 認証バイパス
- DoS脆弱性
- SSRF（Server-Side Request Forgery）
- その他、複数の重大な脆弱性

**推奨される対応**:
```bash
npm install next@14.2.33
```
- パッチバージョンアップデート（14.2.3 → 14.2.33）
- Breaking changeなし、すぐにアップデート可能

### 2. npm依存関係の脆弱性
**現状**: 4つの脆弱性（3 high, 1 critical）

**推奨される対応**: 段階的な対応
1. まず、Next.jsをアップデート（上記）
2. その後、`npm audit fix`を実行
3. Breaking changeが必要な場合は慎重に検討

## ⚠️ 認証システムのセキュリティ問題

### 1. パスワードの平文保存
**ファイル**: `src/auth.ts:36`
**現状**: 環境変数のパスワードと直接比較
```typescript
if (credentials.password !== adminPassword) {
  return null;
}
```

**問題**: 
- パスワードが平文で環境変数に保存される
- 本番環境では重大なセキュリティリスク

**推奨される対応**:
- 環境変数にハッシュ化されたパスワードを保存
- bcryptjsを使用して比較
```typescript
const isValid = await bcrypt.compare(
  credentials.password as string,
  adminPasswordHash
);
```

### 2. 単一管理者アカウントのみ
**現状**: 環境変数で1つの管理者アカウントのみサポート

**Supabase統合後の改善計画**:
- 複数の管理者アカウント
- ロールベースのアクセス制御（RBAC）
- より細かい権限管理

## ⚡ パフォーマンス最適化の推奨事項

### 1. Next.js Image最適化
**該当ファイル**:
- `src/app/portfolio/[id]/page.tsx:29`
- `src/app/profile/page.tsx:32`
- `src/app/sandbox/[id]/page.tsx:26`

**現状**: `<img>`タグを使用
**推奨**: `next/image`の`<Image />`コンポーネントを使用

**メリット**:
- 自動画像最適化
- レイアウトシフトの防止（CLS改善）
- レスポンシブ対応
- 遅延読み込み（Lazy Loading）

**対応例**:
```typescript
import Image from "next/image";

// Before
<img src="/path/to/image.jpg" alt="..." />

// After
<Image 
  src="/path/to/image.jpg" 
  alt="..." 
  width={600} 
  height={400}
  priority={false}
/>
```

## 📦 非推奨パッケージの更新

### 1. Supabase Auth Helpers
**現状**: `@supabase/auth-helpers-nextjs` (非推奨)
**推奨**: `@supabase/ssr` への移行

**対応タイミング**: Supabase統合時に合わせて移行

### 2. ESLint
**現状**: ESLint 8.57.1（サポート終了）
**推奨**: ESLint 9へのアップグレード

**対応**: eslint-config-next 16へのアップグレードと合わせて実施

## 🎨 UI/UX改善の推奨事項

### 1. ソーシャルリンクの管理
**ファイル**: `src/components/layout/Header.tsx:10-18`
**現状**: ハードコードされたソーシャルリンク

**TODOコメント**: 「将来的に管理画面から設定できるようにする」

**推奨される実装**:
- Supabase DB統合時に`site_settings`テーブルを作成
- 管理画面でソーシャルリンクを編集可能に
- フロントエンドはDBから動的に取得

### 2. レスポンシブデザイン
**現状**: ヘッダーはモバイル対応済み（SNSアイコンを下部に表示）
**確認済み**: 基本的なレスポンシブ対応は実装されている

## 📋 次のフェーズでの優先タスク

### フェーズ1: セキュリティ修正（緊急）
1. [ ] Next.jsを14.2.33へアップデート
2. [ ] パスワードをハッシュ化（bcryptjs使用）
3. [ ] 環境変数に平文パスワードを保存しないよう注意喚起

### フェーズ2: UI調整
1. [ ] `<Image />`コンポーネントへの移行（3ファイル）
2. [ ] その他のUI改善（ユーザー判断）

### フェーズ3: Supabaseデータベース設計
1. [ ] データベーススキーマ設計
   - ユーザーテーブル
   - ブログ記事テーブル
   - ポートフォリオテーブル
   - Sandboxテーブル
   - プロフィールテーブル
   - サイト設定テーブル（SNSリンクなど）
2. [ ] Supabase Auth への移行
3. [ ] `@supabase/ssr`への移行
4. [ ] RLS（Row Level Security）の設定

## 💡 その他の推奨事項

### Gitの未追跡ファイル
**現状**:
```
?? .claude.json.backup
?? .claude/
?? Serena_MCP_管理ガイド.md
```

**推奨**: `.gitignore`に追加するか、コミットするか判断
- `.claude/`はプロジェクト固有の設定なら追加を検討
- `Serena_MCP_管理ガイド.md`はプロジェクトドキュメントなら`docs/`に移動

## 📝 まとめ

### 実装前に対処すべき問題
1. **セキュリティ脆弱性**: Next.jsのアップデートは早急に実施
2. **パスワードハッシュ化**: Supabase統合前でも実装可能

### UI調整時に対処すべき問題
1. **Image最適化**: 3つのファイルで`<img>`を`<Image />`に変更

### Supabase統合時に対処すべき問題
1. **認証システムの全面刷新**: Supabase Authへの移行
2. **データベーススキーマ設計**: 全体的なDB設計
3. **非推奨パッケージの更新**: `@supabase/ssr`への移行
