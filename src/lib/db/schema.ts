import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { relations, sql } from 'drizzle-orm'

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  content: text('content'),
  icon_url: text('icon_url'),
  platform: text('platform', { enum: ['ios', 'android', 'web', 'other'] }).notNull().default('web'),
  app_store_url: text('app_store_url'),
  play_store_url: text('play_store_url'),
  demo_url: text('demo_url'),
  github_url: text('github_url'),
  technologies: text('technologies', { mode: 'json' }).$type<string[]>().notNull().default([]),
  category: text('category'),
  display_order: integer('display_order').notNull().default(0),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  published_at: text('published_at'),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`),
  updated_at: text('updated_at').notNull().default(sql`(datetime('now'))`),
})

export const product_screenshots = sqliteTable('product_screenshots', {
  id: text('id').primaryKey(),
  product_id: text('product_id').notNull().references(() => products.id, { onDelete: 'cascade' }),
  image_url: text('image_url').notNull(),
  caption: text('caption'),
  display_order: integer('display_order').notNull().default(0),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`),
})

export const blog_posts = sqliteTable('blog_posts', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  content: text('content').notNull(),
  excerpt: text('excerpt'),
  featured_image: text('featured_image'),
  tags: text('tags', { mode: 'json' }).$type<string[]>().notNull().default([]),
  published: integer('published', { mode: 'boolean' }).notNull().default(false),
  published_at: text('published_at'),
  view_count: integer('view_count').notNull().default(0),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`),
  updated_at: text('updated_at').notNull().default(sql`(datetime('now'))`),
})

export const profiles = sqliteTable('profiles', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  title: text('title'),
  bio: text('bio'),
  avatar_url: text('avatar_url'),
  email: text('email'),
  website_url: text('website_url'),
  github_url: text('github_url'),
  linkedin_url: text('linkedin_url'),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`),
  updated_at: text('updated_at').notNull().default(sql`(datetime('now'))`),
})

export const social_links = sqliteTable('social_links', {
  id: text('id').primaryKey(),
  profile_id: text('profile_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  platform: text('platform').notNull(),
  title: text('title'),
  url: text('url').notNull(),
  icon_url: text('icon_url'),
  show_in_header: integer('show_in_header', { mode: 'boolean' }).notNull().default(false),
  display_order: integer('display_order').notNull().default(0),
  created_at: text('created_at').notNull().default(sql`(datetime('now'))`),
})

// Relations
export const productsRelations = relations(products, ({ many }) => ({
  screenshots: many(product_screenshots),
}))

export const productScreenshotsRelations = relations(product_screenshots, ({ one }) => ({
  product: one(products, {
    fields: [product_screenshots.product_id],
    references: [products.id],
  }),
}))

export const profilesRelations = relations(profiles, ({ many }) => ({
  social_links: many(social_links),
}))

export const socialLinksRelations = relations(social_links, ({ one }) => ({
  profile: one(profiles, {
    fields: [social_links.profile_id],
    references: [profiles.id],
  }),
}))

// Types
export type Product = typeof products.$inferSelect
export type ProductInsert = typeof products.$inferInsert
export type ProductScreenshot = typeof product_screenshots.$inferSelect
export type ProductScreenshotInsert = typeof product_screenshots.$inferInsert
export type BlogPost = typeof blog_posts.$inferSelect
export type BlogPostInsert = typeof blog_posts.$inferInsert
export type Profile = typeof profiles.$inferSelect
export type ProfileInsert = typeof profiles.$inferInsert
export type SocialLink = typeof social_links.$inferSelect
export type SocialLinkInsert = typeof social_links.$inferInsert

export type ProductWithScreenshots = Product & {
  screenshots: ProductScreenshot[]
}

export type ProfileWithSocialLinks = Profile & {
  social_links: SocialLink[]
}
