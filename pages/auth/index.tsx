import type { NextPage } from 'next'
import AuthForm from '../../components/auth-form'
import MainLayout from '../../components/main-layout'

const AuthPage: NextPage = () => {
  return (
    <MainLayout title="Auth page">
      <AuthForm />
    </MainLayout>
  )
}

export default AuthPage
