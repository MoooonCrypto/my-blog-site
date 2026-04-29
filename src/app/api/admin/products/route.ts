import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createProduct, getAllProducts } from '@/lib/api/products'
import { checkAdminAuth } from '@/lib/auth-check'

export const dynamic = 'force-dynamic'

export async function GET() {
  const auth = await checkAdminAuth()
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const items = await getAllProducts()
  return NextResponse.json(items)
}

export async function POST(request: NextRequest) {
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

  if (!data.title?.trim()) return NextResponse.json({ error: 'タイトルは必須です。' }, { status: 400 })
  if (!data.slug?.trim()) return NextResponse.json({ error: 'スラッグは必須です。' }, { status: 400 })
  if (!data.description?.trim()) return NextResponse.json({ error: '説明は必須です。' }, { status: 400 })

  try {
    const product = await createProduct(data)
    revalidatePath('/admin/products')
    revalidatePath('/')
    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    const msg = error instanceof Error ? error.message : ''
    if (msg.includes('UNIQUE') || msg.includes('unique')) {
      return NextResponse.json({ error: 'このスラッグは既に使用されています。' }, { status: 409 })
    }
    console.error('Error creating product:', error)
    return NextResponse.json({ error: '作成に失敗しました。' }, { status: 500 })
  }
}
