import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import config from '../configs/config'
import { checkAuth } from '../redux/auth/auth.thunks'
import { AppDispatch, AppStateType } from '../redux/reduxStore'
import AuthForm from '../components/auth-form'
import MainLayout from '../components/main-layout'

const Home: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuth, isLoading } = useSelector((state: AppStateType) => state.auth)

  useEffect(() => {
    if (localStorage.getItem(config.accessToken)) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuth) {
    return <AuthForm />
  }

  return (
    <MainLayout title='Main page'>
      <div>HOME</div>
    </MainLayout>
  )
}

export default Home
