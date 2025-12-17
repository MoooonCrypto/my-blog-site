# よく使うコマンド

## 開発コマンド

### プロジェクト起動
```bash
npm run dev
```
- 開発サーバーを起動（通常はhttp://localhost:3000）

### ビルド
```bash
npm run build
```
- 本番用ビルドを作成

### 本番サーバー起動
```bash
npm run start
```
- ビルド後の本番環境で起動

### リント
```bash
npm run lint
```
- ESLintでコードをチェック

## Git コマンド

### ステータス確認
```bash
git status
```

### ブランチ確認
```bash
git branch
```

### コミット履歴
```bash
git log --oneline -10
```

### 差分確認
```bash
git diff
```

## その他の有用なコマンド

### ディレクトリ構造の確認
```bash
ls -la
```

### 特定のファイルを検索
```bash
find . -name "*.tsx" -type f
```

### コード内のテキスト検索
```bash
grep -r "pattern" src/
```

## shadcn/ui コンポーネント追加
```bash
npx shadcn@latest add [component-name]
```
- 例: `npx shadcn@latest add button`

## Next.js関連

### キャッシュクリア
```bash
rm -rf .next
npm run dev
```

## 環境変数
- `.env.local` ファイルを作成（`.env.example`を参考）
- 必要な環境変数:
  - `NEXTAUTH_SECRET`: NextAuth.jsの暗号化キー
  - `NEXTAUTH_URL`: アプリケーションのURL
  - `ADMIN_EMAIL`: 管理者のメールアドレス
  - `ADMIN_PASSWORD`: 管理者のパスワード

## macOS固有のコマンド注意事項
- システム: Darwin (macOS)
- 標準のUnixコマンドが使用可能
- BSD版のコマンドを使用（GNU版とは若干異なる場合あり）
