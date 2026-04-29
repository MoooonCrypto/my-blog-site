import { db } from '@/lib/db'
import { products, product_screenshots } from '@/lib/db/schema'
import { eq, asc, desc } from 'drizzle-orm'
import { randomUUID } from 'crypto'

export type { Product, ProductInsert, ProductScreenshot, ProductWithScreenshots } from '@/lib/db/schema'

export async function getPublishedProducts() {
  const all = await db.query.products.findMany({
    orderBy: [asc(products.display_order), desc(products.published_at)],
    with: { screenshots: { orderBy: asc(product_screenshots.display_order) } },
  })
  return all.filter((p) => p.published)
}

export async function getAllProducts() {
  return db.query.products.findMany({
    orderBy: [asc(products.display_order), desc(products.created_at)],
    with: { screenshots: { orderBy: asc(product_screenshots.display_order) } },
  })
}

export async function getProductBySlug(slug: string) {
  return db.query.products.findFirst({
    where: eq(products.slug, slug),
    with: { screenshots: { orderBy: asc(product_screenshots.display_order) } },
  })
}

export async function getProductById(id: string) {
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: { screenshots: { orderBy: asc(product_screenshots.display_order) } },
  })
}

export async function createProduct(data: {
  title: string
  slug: string
  description: string
  content?: string | null
  icon_url?: string | null
  platform: 'ios' | 'android' | 'web' | 'other'
  app_store_url?: string | null
  play_store_url?: string | null
  demo_url?: string | null
  github_url?: string | null
  technologies?: string[]
  category?: string | null
  display_order?: number
  published?: boolean
  published_at?: string | null
}) {
  const id = randomUUID()
  await db.insert(products).values({ id, ...data })
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: { screenshots: true },
  })
}

export async function updateProduct(id: string, data: Partial<{
  title: string
  slug: string
  description: string
  content: string | null
  icon_url: string | null
  platform: 'ios' | 'android' | 'web' | 'other'
  app_store_url: string | null
  play_store_url: string | null
  demo_url: string | null
  github_url: string | null
  technologies: string[]
  category: string | null
  display_order: number
  published: boolean
  published_at: string | null
  updated_at: string
}>) {
  await db.update(products)
    .set({ ...data, updated_at: new Date().toISOString() })
    .where(eq(products.id, id))
  return db.query.products.findFirst({
    where: eq(products.id, id),
    with: { screenshots: { orderBy: asc(product_screenshots.display_order) } },
  })
}

export async function deleteProduct(id: string) {
  await db.delete(products).where(eq(products.id, id))
}

export async function addProductScreenshot(data: {
  product_id: string
  image_url: string
  caption?: string | null
  display_order?: number
}) {
  const id = randomUUID()
  await db.insert(product_screenshots).values({ id, ...data })
  return db.query.product_screenshots.findFirst({
    where: eq(product_screenshots.id, id),
  })
}

export async function deleteProductScreenshot(id: string) {
  await db.delete(product_screenshots).where(eq(product_screenshots.id, id))
}

export async function reorderProductScreenshots(screenshots: { id: string; display_order: number }[]) {
  await Promise.all(
    screenshots.map(({ id, display_order }) =>
      db.update(product_screenshots)
        .set({ display_order })
        .where(eq(product_screenshots.id, id))
    )
  )
}
