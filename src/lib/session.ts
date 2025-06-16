import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'

export interface SessionData {
  email?: string
  isLoggedIn: boolean
}

const defaultSession: SessionData = {
  isLoggedIn: false,
}

export async function getSession() {
  const session = await getIronSession<SessionData>(await cookies(), {
    password: process.env.SESSION_SECRET ?? 'complex_password_at_least_32_characters_long',
    cookieName: 'pin-auth-session',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 24時間
    },
  })

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn
  }

  return session
}