import { useSession } from 'next-auth/react'
import { FC, useEffect } from 'react'

type refreshTokenHandlerProps = {
  setInterval: React.Dispatch<React.SetStateAction<number>>
}

const RefreshTokenHandler: FC<refreshTokenHandlerProps> = ({
  setInterval,
}) => {
  const { data: session } = useSession()

  useEffect(() => {
    if (!!session) {
      // We did set the token to be ready to refresh after 20m, here we set interval of 25 minutes.
      const timeRemaining = Math.round(
        session.accessTokenExpiry - Date.now() / 1000 - 60 * 5
      )
      setInterval(timeRemaining > 0 ? timeRemaining : 0)
    }
  }, [session, setInterval])

  return null
}

export default RefreshTokenHandler
