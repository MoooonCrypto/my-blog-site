import { createClient } from '@/lib/supabase/server'
import type { Tables, TablesUpdate } from '@/types/database.types'

export type Profile = Tables<'profiles'>
export type ProfileUpdate = TablesUpdate<'profiles'>

/**
 * プロフィールを取得（最初の1件）
 */
export async function getProfile() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single()

  if (error) {
    console.error("Error fetching profile:", error)
    throw error
  }

  console.log("Fetched profile:", data)
  return data
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

  console.log("Updating profile with ID:", id, "Data:", profile)

  const { data, error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error("Error updating profile in DB:", error)
    throw error
  }

  console.log("Profile updated in DB:", data)
  return data
}
