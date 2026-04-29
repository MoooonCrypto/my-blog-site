import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import crypto from 'crypto'

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const adminEmail = process.env.ADMIN_EMAIL
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

        if (!adminEmail || !adminPasswordHash) return null
        if (credentials.email !== adminEmail) return null

        const inputHash = crypto
          .createHash('sha256')
          .update(credentials.password as string)
          .digest('hex')

        if (inputHash !== adminPasswordHash) return null

        return {
          id: 'admin',
          email: adminEmail,
          name: 'Admin',
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }) {
      if (token && session.user) session.user.id = token.id as string
      return session
    },
  },
})
