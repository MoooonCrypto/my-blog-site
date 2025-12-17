import { createClient } from '@/lib/supabase/server'
import type { Tables, TablesInsert, TablesUpdate } from '@/types/database.types'

export type PortfolioItem = Tables<'portfolio_items'>
export type PortfolioItemInsert = TablesInsert<'portfolio_items'>
export type PortfolioItemUpdate = TablesUpdate<'portfolio_items'>

/**
 * 公開されているポートフォリオアイテムを全件取得
 */
export async function getPublishedPortfolioItems() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true })
    .order('published_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 全てのポートフォリオアイテムを取得（管理画面用）
 */
export async function getAllPortfolioItems() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * スラッグからポートフォリオアイテムを取得
 */
export async function getPortfolioItemBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

/**
 * IDからポートフォリオアイテムを取得
 */
export async function getPortfolioItemById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * ポートフォリオアイテムを作成
 */
export async function createPortfolioItem(item: PortfolioItemInsert) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('portfolio_items')
    .insert(item)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * ポートフォリオアイテムを更新
 */
export async function updatePortfolioItem(id: string, item: PortfolioItemUpdate) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('portfolio_items')
    .update(item)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * ポートフォリオアイテムを削除
 */
export async function deletePortfolioItem(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('portfolio_items')
    .delete()
    .eq('id', id)

  if (error) throw error
}
