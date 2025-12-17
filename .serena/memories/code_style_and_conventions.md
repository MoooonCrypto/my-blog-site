# コーディングスタイルと規約

## TypeScript設定
- **Strict mode**: 有効
- **Path alias**: `@/*` → `./src/*`
- **モジュールシステム**: ESNext with bundler resolution

## コンポーネント規約

### ファイル命名
- **Reactコンポーネント**: PascalCase（例: `Header.tsx`, `LoginForm.tsx`）
- **ユーティリティ**: camelCase（例: `utils.ts`）
- **ページファイル**: Next.js App Router規約に従う（`page.tsx`, `layout.tsx`, `route.ts`）

### コンポーネントスタイル
- **関数コンポーネント**: function宣言を使用（例: `function LoginForm() {}`）
- **Async Server Components**: デフォルトで使用（必要な場合のみ`"use client"`を追加）
- **Props型定義**: インラインまたは別途定義

### スタイリング規約
- **Tailwind CSS**: ユーティリティクラスを使用
- **クラス名結合**: `cn()`関数を使用（`@/lib/utils`からインポート）
  ```typescript
  import { cn } from "@/lib/utils"
  className={cn("base-classes", conditionalClasses)}
  ```
- **バリアント管理**: `class-variance-authority (cva)` を使用（UIコンポーネント）

### UIコンポーネント
- **shadcn/ui規約に従う**
- コンポーネントは `src/components/ui/` に配置
- `forwardRef`を使用してref転送をサポート
- バリアントとサイズのプロパティを提供

## 認証関連

### ミドルウェア
- **ファイル**: `src/middleware.ts`
- **/admin配下を保護**: `/admin/login`以外は認証が必要
- ログイン済みユーザーが`/admin/login`にアクセスすると`/admin/dashboard`へリダイレクト

### NextAuth設定
- **ファイル**: `src/auth.ts`
- **Session strategy**: JWT
- **Custom sign-in page**: `/admin/login`

## 日本語対応
- **UIメッセージ**: すべて日本語
- **エラーメッセージ**: 日本語で表示
- **コメント**: 日本語または英語（主に日本語）
- **コミットメッセージ**: 日本語（例: `feat: NextAuth.js認証システムを実装`）

## インポート順序（推奨）
1. React関連
2. Next.js関連
3. サードパーティライブラリ
4. ローカルコンポーネント（`@/components`）
5. ローカルライブラリ（`@/lib`, `@/auth`など）
6. スタイル・型定義

## ESLint
- **設定**: `next/core-web-vitals`を継承
- 追加のカスタムルールなし（現時点）

## ファイル構造の原則
- **Server Components**: デフォルト（`page.tsx`, `layout.tsx`）
- **Client Components**: 対話性が必要な場合のみ`"use client"`を追加
  - フォーム、state管理、useEffectなど
