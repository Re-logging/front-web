export const authConfig = {
  providers: [],
  callbacks: {
    jwt({
      token,
      user,
      account,
      profile,
      trigger,
      session,
    }: {
      token: any

      user?: any

      account?: any

      profile?: any
      session?: any
      trigger?: 'signIn' | 'signUp' | 'update'
    }) {
      console.log('JWT Callback:', { trigger, token })
      console.log('JWT Callback:', { user, account, profile })
      if (trigger === 'update') {
        token.accessToken = session?.accessToken
      }
      return token
    },
    async session({
      session,
      token,
    }: {
      token: any
      session?: { accessToken?: string; expires?: string }
    }) {
      console.log('Session Callback:', { session, token })

      return {
        ...session,

        accessToken: token.accessToken,

        expires: session?.expires || new Date().toISOString(),
      }
    },
  },
}
