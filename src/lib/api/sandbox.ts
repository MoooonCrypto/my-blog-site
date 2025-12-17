import { createClient } from '@/lib/supabase/server'
import type { Tables, TablesInsert, TablesUpdate } from '@/types/database.types'

export type SandboxItem = Tables<'sandbox_items'>
export type SandboxItemInsert = TablesInsert<'sandbox_items'>
export type SandboxItemUpdate = TablesUpdate<'sandbox_items'>

/**
 * 公開されているSandboxアイテムを全件取得
 */
export async function getPublishedSandboxItems() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sandbox_items')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true })
    .order('published_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 全てのSandboxアイテムを取得（管理画面用）
 */
export async function getAllSandboxItems() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sandbox_items')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * スラッグからSandboxアイテムを取得
 */
export async function getSandboxItemBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sandbox_items')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

/**
 * IDからSandboxアイテムを取得
 */
export async function getSandboxItemById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sandbox_items')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * Sandboxアイテムを作成
 */
export async function createSandboxItem(item: SandboxItemInsert) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sandbox_items')
    .insert(item)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Sandboxアイテムを更新
 */
export async function updateSandboxItem(id: string, item: SandboxItemUpdate) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('sandbox_items')
    .update(item)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * Sandboxアイテムを削除
 */
export async function deleteSandboxItem(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('sandbox_items')
    .delete()
    .eq('id', id)

  if (error) throw error
}
