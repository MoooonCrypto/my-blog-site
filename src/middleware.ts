import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { nextUrl } = request

  let supabaseResponse = NextResponse.next({
    request,
  })

  const isOnAdmin = nextUrl.pathname.startsWith('/admin')
  const isOnLoginPage = nextUrl.pathname === '/admin/login'

  // /admin配下のページでない場合、または/admin/loginの場合は認証チェック不要
  if (!isOnAdmin || isOnLoginPage) {
    return supabaseResponse
  }

  // ここから先は /admin/* (/admin/login以外) のみ

  try {
    // 【フェイルセーフ1】環境変数の検証
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('[Middleware] CRITICAL: Supabase environment variables are not set')
      const loginUrl = new URL('/admin/login', nextUrl.origin)
      loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
      loginUrl.searchParams.set('error', 'config')
      return NextResponse.redirect(loginUrl)
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // 【フェイルセーフ2】認証チェックでerrorも確認
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    // エラーがある場合は必ず認証失敗として扱う
    if (error) {
      console.error('[Middleware] Auth error:', error.message)
      const loginUrl = new URL('/admin/login', nextUrl.origin)
      loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // 【フェイルセーフ3】userが存在しない場合も認証失敗
    if (!user) {
      console.warn('[Middleware] No user found')
      const loginUrl = new URL('/admin/login', nextUrl.origin)
      loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // ここまで到達したら認証成功
    return supabaseResponse

  } catch (error) {
    // 【フェイルセーフ4】予期しない例外が発生した場合も必ず拒否
    console.error('[Middleware] Unexpected error:', error)
    const loginUrl = new URL('/admin/login', nextUrl.origin)
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
    loginUrl.searchParams.set('error', 'unexpected')
    return NextResponse.redirect(loginUrl)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
