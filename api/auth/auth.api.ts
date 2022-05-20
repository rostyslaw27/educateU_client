import { AxiosResponse } from 'axios'
import { IAuthResponse, ICreateUser, ILogoutResponse } from './auth.types'
import instance from '../main.api'

export const authAPI = {
  registration: async (
    userData: ICreateUser
  ): Promise<AxiosResponse<IAuthResponse>> => {
    const response = await instance.post<IAuthResponse>(`auth/registration`, {
      ...userData,
    })
    return response
  },
  login: async (
    userData: ICreateUser
  ): Promise<AxiosResponse<IAuthResponse>> => {
    const response = await instance.post<IAuthResponse>(`auth/login`, {
      ...userData,
    })
    return response
  },
  logout: async (): Promise<AxiosResponse<ILogoutResponse>> => {
    const response = await instance.post<ILogoutResponse>('auth/logout')
    return response
  },
}
