export type IAuthResponse = {
  user: IUser
  accessToken: string
  refreshToken: string
}

export type ILogoutResponse = {
  token: string
}

export type IUser = {
  email: string
  _id: string
}

export type ICreateUser = {
  email: string
  password: string
}
