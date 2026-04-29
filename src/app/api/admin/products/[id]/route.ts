import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getProductById, updateProduct, deleteProduct } from '@/lib/api/products'
import { checkAdminAuth } from '@/lib/auth-check'

export const dynamic = 'force-dynamic'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const auth = await checkAdminAuth()
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  const product = await getProductById(params.id)
  if (!product) return NextResponse.json({ error: '見つかりません' }, { status: 404 })
  return NextResponse.json(product)
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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

  try {
    const product = await updateProduct(params.id, data)
    revalidatePath('/admin/products')
    revalidatePath('/')
    return NextResponse.json(product)
  } catch (error) {
    const msg = error instanceof Error ? error.message : ''
    if (msg.includes('UNIQUE') || msg.includes('unique')) {
      return NextResponse.json({ error: 'このスラッグは既に使用されています。' }, { status: 409 })
    }
    console.error('Error updating product:', error)
    return NextResponse.json({ error: '更新に失敗しました。' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  const auth = await checkAdminAuth()
  if (!auth.authenticated) {
    return NextResponse.json({ error: auth.error }, { status: auth.status })
  }
  await deleteProduct(params.id)
  revalidatePath('/admin/products')
  revalidatePath('/')
  return NextResponse.json({ success: true })
}
