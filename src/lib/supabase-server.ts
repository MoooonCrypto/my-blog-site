import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

/**
 * サーバーサイド専用のSupabaseクライアント
 * Server ComponentsやAPI Routesで使用
 *
 * Service Role Keyを使用してRLSをバイパスします。
 * これにより、NextAuthで認証されたAPI Routesから全ての操作が可能になります。
 */
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables')
    console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
    console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? 'Set (length: ' + supabaseServiceKey.length + ')' : 'Missing')
    throw new Error('Supabase環境変数が設定されていません。SUPABASE_SERVICE_ROLE_KEYを.env.localに追加してください。')
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    }
  })
}
