import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // TODO: 将来的にはデータベースからユーザー情報を取得
        // 現在は環境変数から管理者認証情報を取得
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
          console.error("ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables");
          return null;
        }

        // メールアドレスの確認
        if (credentials.email !== adminEmail) {
          return null;
        }

        // パスワードの確認
        // 注: 本番環境では、環境変数にハッシュ化されたパスワードを保存すべき
        // 現在は簡易的に平文パスワードと比較
        if (credentials.password !== adminPassword) {
          return null;
        }

        // 認証成功
        return {
          id: "1",
          email: adminEmail,
          name: "Admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLoginPage = nextUrl.pathname === "/admin/login";

      if (isOnAdmin && !isOnLoginPage) {
        if (!isLoggedIn) return false;
        return true;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
});
