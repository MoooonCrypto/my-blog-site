import { createClient } from '@/lib/supabase/server'
import type { Tables, TablesInsert, TablesUpdate } from '@/types/database.types'

export type BlogPost = Tables<'blog_posts'>
export type BlogPostInsert = TablesInsert<'blog_posts'>
export type BlogPostUpdate = TablesUpdate<'blog_posts'>

/**
 * 公開されているブログ記事を全件取得
 */
export async function getPublishedBlogPosts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * 全てのブログ記事を取得（管理画面用）
 */
export async function getAllBlogPosts() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

/**
 * スラッグからブログ記事を取得
 */
export async function getBlogPostBySlug(slug: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}

/**
 * IDからブログ記事を取得
 */
export async function getBlogPostById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

/**
 * ブログ記事を作成
 */
export async function createBlogPost(post: BlogPostInsert) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .insert(post)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * ブログ記事を更新
 */
export async function updateBlogPost(id: string, post: BlogPostUpdate) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

/**
 * ブログ記事を削除
 */
export async function deleteBlogPost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) throw error
}

/**
 * ブログ記事の閲覧数をインクリメント
 */
export async function incrementViewCount(id: string) {
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('view_count')
    .eq('id', id)
    .single()

  if (!post) return

  const { error } = await supabase
    .from('blog_posts')
    .update({ view_count: (post.view_count || 0) + 1 })
    .eq('id', id)

  if (error) throw error
}
