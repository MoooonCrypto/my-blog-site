import { db } from '@/lib/db'
import { blog_posts } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { randomUUID } from 'crypto'

export type { BlogPost, BlogPostInsert } from '@/lib/db/schema'

export async function getPublishedBlogPosts() {
  const all = await db.query.blog_posts.findMany({
    orderBy: desc(blog_posts.published_at),
  })
  return all.filter((p) => p.published)
}

export async function getAllBlogPosts() {
  return db.query.blog_posts.findMany({
    orderBy: desc(blog_posts.created_at),
  })
}

export async function getBlogPostBySlug(slug: string) {
  return db.query.blog_posts.findFirst({
    where: eq(blog_posts.slug, slug),
  })
}

export async function getBlogPostById(id: string) {
  return db.query.blog_posts.findFirst({
    where: eq(blog_posts.id, id),
  })
}

export async function createBlogPost(data: {
  title: string
  slug: string
  content: string
  excerpt?: string | null
  featured_image?: string | null
  tags?: string[]
  published?: boolean
  published_at?: string | null
}) {
  const id = randomUUID()
  await db.insert(blog_posts).values({ id, ...data })
  return db.query.blog_posts.findFirst({ where: eq(blog_posts.id, id) })
}

export async function updateBlogPost(id: string, data: Partial<{
  title: string
  slug: string
  content: string
  excerpt: string | null
  featured_image: string | null
  tags: string[]
  published: boolean
  published_at: string | null
  updated_at: string
}>) {
  await db.update(blog_posts)
    .set({ ...data, updated_at: new Date().toISOString() })
    .where(eq(blog_posts.id, id))
  return db.query.blog_posts.findFirst({ where: eq(blog_posts.id, id) })
}

export async function deleteBlogPost(id: string) {
  await db.delete(blog_posts).where(eq(blog_posts.id, id))
}
