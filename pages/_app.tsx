import * as React from 'react'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import createEmotionCache from '../utils/createEmotionCache'
import lightThemeOptions from '../styles/theme/lightThemeOptions'
import { Provider } from 'react-redux'
import store from '../redux/reduxStore'
import RefreshTokenHandler from '../components/refreshTokenHandler'

import '../styles/globals.css'

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

const lightTheme = createTheme(lightThemeOptions)

const MyApp: React.FC<MyAppProps> = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props

  const [interval, setInterval] = React.useState<number>(0)

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Provider store={store}>
          <SessionProvider session={session} refetchInterval={interval}>
            <Component {...pageProps} />
            <RefreshTokenHandler setInterval={setInterval} />
          </SessionProvider>
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
