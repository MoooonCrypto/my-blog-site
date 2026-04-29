import { NextRequest, NextResponse } from 'next/server'
import { addProductScreenshot, deleteProductScreenshot, reorderProductScreenshots } from '@/lib/api/products'
import { checkAdminAuth } from '@/lib/auth-check'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const auth = await checkAdminAuth()
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const { image_url, caption, display_order } = await request.json()
  if (!image_url) return NextResponse.json({ error: 'image_url は必須です' }, { status: 400 })

  const screenshot = await addProductScreenshot({
    product_id: params.id,
    image_url,
    caption,
    display_order,
  })
  return NextResponse.json(screenshot, { status: 201 })
}

export async function DELETE(request: NextRequest, { params: _ }: { params: { id: string } }) {
  const auth = await checkAdminAuth()
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const { screenshot_id } = await request.json()
  if (!screenshot_id) return NextResponse.json({ error: 'screenshot_id は必須です' }, { status: 400 })

  await deleteProductScreenshot(screenshot_id)
  return NextResponse.json({ success: true })
}

export async function PATCH(request: NextRequest, { params: _ }: { params: { id: string } }) {
  const auth = await checkAdminAuth()
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }

  const { screenshots } = await request.json()
  if (!Array.isArray(screenshots)) {
    return NextResponse.json({ error: 'screenshots は配列である必要があります' }, { status: 400 })
  }

  await reorderProductScreenshots(screenshots)
  return NextResponse.json({ success: true })
}
