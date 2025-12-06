import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // /admin配下のページで、/admin/login以外の場合
  const isOnAdmin = nextUrl.pathname.startsWith("/admin");
  const isOnLoginPage = nextUrl.pathname === "/admin/login";

  if (isOnAdmin && !isOnLoginPage) {
    // ログインしていない場合はログインページにリダイレクト
    if (!isLoggedIn) {
      const loginUrl = new URL("/admin/login", nextUrl.origin);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ログインページにアクセスしようとした際、既にログインしている場合はダッシュボードへ
  if (isOnLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/dashboard", nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
