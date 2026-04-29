import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isOnAdmin = nextUrl.pathname.startsWith('/admin')
  const isOnLoginPage = nextUrl.pathname === '/admin/login'

  if (!isOnAdmin || isOnLoginPage) {
    return NextResponse.next()
  }

  if (!req.auth) {
    const loginUrl = new URL('/admin/login', nextUrl.origin)
    loginUrl.searchParams.set('callbackUrl', nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
