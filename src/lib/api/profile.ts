import { createClient } from '@/lib/supabase/server'
import type { Tables, TablesUpdate } from '@/types/database.types'

export type Profile = Tables<'profiles'>
export type ProfileUpdate = TablesUpdate<'profiles'>

/**
 * プロフィールを取得（最初の1件）
 * エラー時はnullを返す（throwしない）
 */
export async function getProfile() {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('getProfile error:', error)
      return null
    }

    return data
  } catch (e) {
    console.error('getProfile exception:', e)
    return null
  }
}

/**
 * IDからプロフィールを取得
 */
export async function getProfileById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * プロフィールを更新
 */
export async function updateProfile(id: string, profile: ProfileUpdate) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw error
  }

  return data
}
