import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

export const { auth, signIn, signOut } = NextAuth(authConfig)

// types/next-auth.d.ts
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}
