import { NextRequest, NextResponse } from 'next/server'
import { getProfile, upsertProfile, upsertSocialLinks } from '@/lib/api/profile'
import { checkAdminAuth } from '@/lib/auth-check'

export const dynamic = 'force-dynamic'

export async function GET() {
  const auth = await checkAdminAuth()
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const profile = await getProfile()
  return NextResponse.json(profile ?? null)
}

export async function PUT(request: NextRequest) {
  const auth = await checkAdminAuth()
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  let data: any
  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ error: '不正なリクエスト形式です。' }, { status: 400 })
  }

  if (!data.name?.trim()) {
    return NextResponse.json({ error: '名前は必須です。' }, { status: 400 })
  }

  try {
    const profileId = await upsertProfile({
      name: data.name,
      title: data.title ?? null,
      bio: data.bio ?? null,
      avatar_url: data.avatar_url ?? null,
      email: data.email ?? null,
      website_url: data.website_url ?? null,
      github_url: data.github_url ?? null,
      linkedin_url: data.linkedin_url ?? null,
    })

    const socialLinks = Array.isArray(data.social_links) ? data.social_links : []
    await upsertSocialLinks(profileId, socialLinks)

    const updated = await getProfile()
    return NextResponse.json(updated)
  } catch (error) {
    const msg = error instanceof Error ? error.message : ''
    console.error('Error saving profile:', error)
    return NextResponse.json({ error: '保存に失敗しました。' }, { status: 500 })
  }
}
