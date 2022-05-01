import { IUser } from '../../redux/auth/auth.types'

export type IAuthResponse = {
  user: IUser
  accessToken: string
}

export type ILogoutResponse = {
  token: string
}
