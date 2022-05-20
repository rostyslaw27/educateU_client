import type { NextPage } from 'next'
import MainLayout from '../components/main-layout'

import styles from '../styles/main/main-page.module.scss'

const Home: NextPage = () => {
  return (
    <MainLayout title="Main page">
      <div className={styles.main}>
        The Best Courses <br /> from Around the World
      </div>
    </MainLayout>
  )
}

export default Home
