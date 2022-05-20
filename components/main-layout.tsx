import Head from 'next/head'
import { FC } from 'react'
import AppHeader from './app-header'

type MainLayoutType = {
  children: React.ReactNode
  title: string
}

const MainLayout: FC<MainLayoutType> = ({ children, title = 'Next App' }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="next,javascript,nextjs,react" />
        <meta name="description" content="educateU project" />
        <meta charSet="utf-8" />
      </Head>
      <AppHeader />
      <main>{children}</main>
      <style jsx>{`
        main {
          margin-top: 60px;
          padding: 1rem;
        }
      `}</style>
    </>
  )
}

export default MainLayout
