# レート制限（Rate Limiting）導入手順

## 概要

レート制限は、特定のユーザーやIPアドレスからのリクエスト数を制限することで、DDoS攻撃やブルートフォース攻撃を防ぐセキュリティ対策です。

このプロジェクトでは、**Upstash Redis** と **@upstash/ratelimit** を使用してレート制限を実装します。

## 必要な準備

### 1. Upstashアカウントの作成

1. [Upstash](https://upstash.com/) にアクセス
2. GitHubアカウントまたはメールアドレスでサインアップ
3. 無料プランで開始可能（月間10,000リクエストまで無料）

### 2. Redis データベースの作成

1. Upstashダッシュボードにログイン
2. 「Create Database」をクリック
3. 以下の設定を選択：
   - **Name**: `blog-rate-limit`（任意の名前）
   - **Type**: Regional
   - **Region**: Asia Pacific (Tokyo) または最寄りのリージョン
   - **TLS**: Enabled
4. 「Create」をクリック

### 3. 環境変数の取得

データベース作成後、以下の情報を取得します：

1. Upstashダッシュボードで作成したデータベースをクリック
2. 「Details」タブから以下の値をコピー：
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

## インストール手順

### 1. パッケージのインストール

```bash
npm install @upstash/ratelimit @upstash/redis
```

### 2. 環境変数の設定

`.env.local` ファイルに以下を追加：

```env
# Upstash Redis for Rate Limiting
UPSTASH_REDIS_REST_URL=https://your-database-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_redis_token_here
```

**本番環境（Vercel）でも同じ環境変数を設定してください。**

### 3. レート制限ユーティリティの作成

`src/lib/rate-limit.ts` ファイルを作成：

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest } from "next/server";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create different rate limiters for different use cases

// Strict: For sensitive operations (login, password reset)
// 5 requests per 60 seconds
export const strictRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "60 s"),
  analytics: true,
  prefix: "ratelimit:strict",
});

// Moderate: For admin API operations (create, update, delete)
// 30 requests per 60 seconds
export const moderateRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "60 s"),
  analytics: true,
  prefix: "ratelimit:moderate",
});

// Lenient: For read operations
// 100 requests per 60 seconds
export const lenientRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, "60 s"),
  analytics: true,
  prefix: "ratelimit:lenient",
});

/**
 * Get identifier for rate limiting
 * Uses IP address as the primary identifier
 */
export function getRateLimitIdentifier(request: NextRequest): string {
  // Try to get real IP from headers (for proxied requests)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  const ip = forwardedFor?.split(",")[0] || realIp || "anonymous";

  return ip;
}

/**
 * Check rate limit for a request
 * Returns { success: true } if allowed, { success: false, error: string } if rate limited
 */
export async function checkRateLimit(
  request: NextRequest,
  limiter: typeof strictRateLimiter | typeof moderateRateLimiter | typeof lenientRateLimiter
): Promise<{ success: boolean; error?: string; remaining?: number }> {
  const identifier = getRateLimitIdentifier(request);

  try {
    const { success, remaining } = await limiter.limit(identifier);

    if (!success) {
      return {
        success: false,
        error: "リクエスト数が制限を超えました。しばらく待ってから再試行してください。",
        remaining: 0,
      };
    }

    return { success: true, remaining };
  } catch (error) {
    // If rate limiting fails, allow the request but log the error
    console.error("Rate limit check failed:", error);
    return { success: true };
  }
}
```

### 4. API ルートへの適用

既存のAPI routeにレート制限を追加します。

#### 例: ブログ作成API (`src/app/api/admin/blog/route.ts`)

```typescript
import { checkRateLimit, moderateRateLimiter } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    // レート制限チェック（認証チェックの前に実行）
    const rateLimitResult = await checkRateLimit(request, moderateRateLimiter);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: rateLimitResult.error },
        { status: 429 } // Too Many Requests
      );
    }

    // CSRF対策
    const originValidation = validateOrigin(request);
    if (!originValidation.valid) {
      return NextResponse.json(
        { error: originValidation.error },
        { status: 403 }
      );
    }

    // 認証チェック
    const authResult = await checkAdminAuth();
    // ... 残りのコード
  } catch (error) {
    // ... エラーハンドリング
  }
}
```

## 推奨設定

### API操作タイプ別のレート制限

| 操作タイプ | リミッター | 制限 | 適用API |
|----------|----------|------|---------|
| 認証操作 | `strictRateLimiter` | 5 req/分 | `/api/auth/*` |
| 作成・更新・削除 | `moderateRateLimiter` | 30 req/分 | `/api/admin/*` (POST, PUT, DELETE) |
| 読み取り | `lenientRateLimiter` | 100 req/分 | `/api/admin/*` (GET) |

### 適用すべきAPI一覧

以下のAPIルートにレート制限を適用してください：

✅ **高優先度（必須）**:
- `/api/admin/blog/route.ts` (POST, PUT, DELETE)
- `/api/admin/portfolio/route.ts` (POST, PUT, DELETE)
- `/api/admin/sandbox/route.ts` (POST, PUT, DELETE)
- `/api/admin/profile/route.ts` (PUT)

⚠️ **中優先度（推奨）**:
- `/api/admin/blog/[id]/route.ts` (PUT, DELETE)
- `/api/admin/portfolio/[id]/route.ts` (PUT, DELETE)
- `/api/admin/sandbox/[id]/route.ts` (PUT, DELETE)

ℹ️ **低優先度（オプション）**:
- GET リクエスト全般

## テスト方法

### 開発環境でのテスト

1. レート制限を厳しく設定してテスト：

```typescript
// テスト用：1分間に3リクエストまで
export const testRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "60 s"),
  analytics: true,
  prefix: "ratelimit:test",
});
```

2. curlコマンドで連続リクエストを送信：

```bash
# 4回連続でリクエストを送る（4回目は429エラーになるはず）
for i in {1..4}; do
  curl -X POST http://localhost:3000/api/admin/blog \
    -H "Content-Type: application/json" \
    -d '{"title":"Test","slug":"test","content":"Test"}' \
    && echo "\nRequest $i completed"
done
```

3. 期待される結果：
   - 1〜3回目: 成功（ステータス 200 or 201）
   - 4回目: エラー（ステータス 429）

### Upstash ダッシュボードでの確認

1. Upstashダッシュボードにログイン
2. 作成したRedisデータベースをクリック
3. 「Analytics」タブでリクエスト数を確認

## トラブルシューティング

### エラー: "UPSTASH_REDIS_REST_URL is not defined"

**原因**: 環境変数が設定されていない

**解決方法**:
1. `.env.local` ファイルに環境変数を追加
2. 開発サーバーを再起動 (`npm run dev`)

### エラー: "Failed to connect to Redis"

**原因**: Upstash Redis URLまたはトークンが間違っている

**解決方法**:
1. Upstashダッシュボードで正しいURL/トークンを確認
2. `.env.local` ファイルを更新
3. 開発サーバーを再起動

### レート制限が機能しない

**原因**: IP アドレスが正しく取得できていない

**デバッグ方法**:
```typescript
const identifier = getRateLimitIdentifier(request);
console.log("Rate limit identifier:", identifier);
```

### 本番環境でレート制限が厳しすぎる

**解決方法**:
レート制限の値を調整します：

```typescript
// 例: 30 req/分 → 60 req/分 に緩和
export const moderateRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, "60 s"), // 変更
  analytics: true,
  prefix: "ratelimit:moderate",
});
```

## コスト

### Upstash 無料プラン
- **月間リクエスト**: 10,000回まで無料
- **ストレージ**: 256 MB
- **同時接続**: 100

### 有料プランへの移行が必要な場合
- 月間10,000リクエストを超える場合
- 従量課金: $0.2 per 100K requests

**参考**: 個人ブログサイトであれば、無料プランで十分です。

## まとめ

レート制限を導入することで、以下の脅威から保護できます：

✅ **DDoS攻撃**: 大量のリクエストによるサーバーダウンを防ぐ
✅ **ブルートフォース攻撃**: パスワード総当たり攻撃を防ぐ
✅ **スパム投稿**: 自動化された大量投稿を防ぐ
✅ **コスト削減**: 無駄なサーバーリソース消費を抑える

実装完了後、Upstash ダッシュボードでリクエスト数を監視し、必要に応じてレート制限値を調整してください。
