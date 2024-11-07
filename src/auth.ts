import NextAuth from 'next-auth'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일
  },
  callbacks: {
    async jwt({ token, trigger, session }) {
      console.log('🔑 JWT Callback:', { trigger, token, session })
      if (trigger === 'update' && session?.accessToken) {
        token.accessToken = session.accessToken
      }
      return token
    },
    async session({ session, token }) {
      console.log('🔑 Session Callback:', { session, token })
      return {
        ...session,
        accessToken: token.accessToken,
      }
    },
  },
})
