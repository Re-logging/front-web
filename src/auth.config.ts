// auth.config.ts
import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isProtected = nextUrl.pathname.startsWith('/protected')

      if (isProtected && !isLoggedIn) {
        return false
      }

      return true
    },
    jwt({ token, trigger, session }) {
      if (trigger === 'update' && session?.accessToken) {
        token.accessToken = session.accessToken
      }
      return token
    },
    session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
      }
    },
  },
} satisfies NextAuthConfig
