# 削除が必要な古いファイル

以下のファイルは古い実装のため、手動で削除してください：

```bash
rm src/lib/supabase-server.ts
rm src/lib/supabase-client.ts
rm src/lib/supabase.ts
rm src/lib/supabase-auth.ts
```

## 削除後の確認

削除後、以下のファイルのみが残るべきです：
- `src/lib/supabase/client.ts` ✅ （新しいクライアント用）
- `src/lib/supabase/server.ts` ✅ （新しいサーバー用）
