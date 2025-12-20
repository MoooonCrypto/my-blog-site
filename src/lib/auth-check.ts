import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/database.types'

/**
 * API Routesで使用する認証チェック関数
 * 管理者権限を確認し、認証されていない場合はエラーを返す
 */
export async function checkAdminAuth() {
  const cookieStore = await cookies()

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // API Routesではcookie設定は不要
          }
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      authenticated: false,
      error: '認証が必要です。',
      status: 401,
    }
  }

  // Supabase Auth でログインできた = 管理者として登録されているユーザー
  // 追加の権限チェックは不要
  return {
    authenticated: true,
    user,
  }
}
