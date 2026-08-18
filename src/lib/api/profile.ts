import { db } from '@/lib/db'
import { profiles, social_links } from '@/lib/db/schema'
import { eq, asc } from 'drizzle-orm'
import { randomUUID } from 'crypto'

export type { Profile, SocialLink, ProfileWithSocialLinks } from '@/lib/db/schema'

export async function getProfile() {
  try {
    return await db.query.profiles.findFirst({
      with: { social_links: { orderBy: asc(social_links.display_order) } },
    })
  } catch {
    return null
  }
}

export async function getProfileById(id: string) {
  return db.query.profiles.findFirst({
    where: eq(profiles.id, id),
    with: { social_links: { orderBy: asc(social_links.display_order) } },
  })
}

export async function upsertProfile(data: {
  name: string
  title?: string | null
  bio?: string | null
  avatar_url?: string | null
  email?: string | null
  website_url?: string | null
  github_url?: string | null
  linkedin_url?: string | null
}) {
  const existing = await db.query.profiles.findFirst()

  if (existing) {
    await db.update(profiles)
      .set({ ...data, updated_at: new Date().toISOString() })
      .where(eq(profiles.id, existing.id))
    return existing.id
  } else {
    const id = randomUUID()
    await db.insert(profiles).values({ id, ...data })
    return id
  }
}

export async function upsertSocialLinks(
  profileId: string,
  links: Array<{
    platform: string
    url: string
    icon_url?: string | null
    display_order?: number
  }>
) {
  await db.delete(social_links).where(eq(social_links.profile_id, profileId))

  if (links.length === 0) return

  await db.insert(social_links).values(
    links.map((link, i) => ({
      id: randomUUID(),
      profile_id: profileId,
      platform: link.platform,
      url: link.url,
      icon_url: link.icon_url ?? null,
      display_order: link.display_order ?? i,
    }))
  )
}
