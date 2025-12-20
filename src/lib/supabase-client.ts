import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

// ブラウザ環境でのみSupabaseクライアントを初期化
export const supabase = typeof window !== 'undefined'
  ? createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  : null as any
