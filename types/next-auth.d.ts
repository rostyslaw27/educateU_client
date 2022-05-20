import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { IUser } from '../redux/auth/auth.types'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessTokenExpiry: number
    user: IUser
  }
  interface User {
    accessTokenExpiry: number
    refreshToken: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessTokenExpiry: number
    refreshToken: string
  }
}
