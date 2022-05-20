import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const useAuth = (shouldRedirect: boolean) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/auth', redirect: shouldRedirect })
    }

    if (session === null) {
      if (router.route !== '/auth') {
        router.replace('/auth')
      }
      setIsAuthenticated(false)
    } else if (session !== undefined) {
      if (router.route === '/auth') {
        router.replace('/')
      }
      setIsAuthenticated(true)
    }
  }, [session, router, shouldRedirect])

  return isAuthenticated
}

export default useAuth
