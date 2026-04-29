import { auth } from '@/auth'

export async function checkAdminAuth() {
  const session = await auth()

  if (!session) {
    return {
      authenticated: false,
      error: '認証が必要です。',
      status: 401,
    }
  }

  return {
    authenticated: true,
    user: session.user,
  }
}
