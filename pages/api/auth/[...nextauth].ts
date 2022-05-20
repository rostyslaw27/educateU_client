import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

type IToken = {
  name: string
  exp: number
}

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const tokenResponse = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}auth/refresh`,
      {
        withCredentials: true,
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      }
    )

    const decoded = jwtDecode<IToken>(tokenResponse.data.accessToken)

    return {
      ...tokenResponse.data,
      accessTokenExpiry: decoded.exp,
    }
  } catch (error) {
    return {
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const user = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}auth/login`,
            {
              password: credentials?.password,
              email: credentials?.email,
            },
            { withCredentials: true }
          )

          const decoded = jwtDecode<IToken>(user.data.accessToken)

          if (user.data.accessToken) {
            return {
              ...user.data,
              accessTokenExpiry: decoded.exp,
            }
          }

          return null
        } catch (e) {
          if (e instanceof Error) {
            throw new Error(e.message)
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.user = user.user
        token.accessTokenExpiry = user.accessTokenExpiry
      }

      // If accessTokenExpiry is 30m, we have to refresh token before 30m pass.
      const shouldRefreshTime = Math.round(
        token.accessTokenExpiry - Date.now() / 1000 - 60 * 10
      )

      // If the token is still valid, just return it.
      if (shouldRefreshTime > 0) {
        return Promise.resolve(token)
      }

      // If the call arrives after 23 hours have passed, allow to refresh the token.
      token = await refreshAccessToken(token.refreshToken)
      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      session.accessTokenExpiry = token.accessTokenExpiry
      session.error = token.error
      session.accessToken = token.accessToken
      session.user = token.user

      return Promise.resolve(session)
    },
  },
  pages: {
    signIn: '/auth',
  },
})
