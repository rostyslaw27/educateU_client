// import axios from 'axios'
// import { authAPI } from '../../api/auth/auth.api'
// import { BaseThunkType } from '../reduxStore'
// import { ActionsTypes, actions } from './auth.actions'
// import config from '../../configs/config'
// import { ICreateUser } from '../../api/auth/auth.types'

// const { toggleLoading, setUser, setAuth } = actions

// type ThunkType = BaseThunkType<ActionsTypes>

// export const login =
//   (userData: ICreateUser): ThunkType =>
//   async (dispatch) => {
//     dispatch(toggleLoading())
//     try {
//       const response = await authAPI.login(userData)
//       localStorage.setItem(config.accessToken, response.data.accessToken)
//       dispatch(setUser(response.data.user))
//       dispatch(setAuth(true))
//     } catch (e) {
//       if (e instanceof Error) {
//         throw new Error(e.message)
//       }
//     }
//     dispatch(toggleLoading())
//   }

// export const register =
//   (userData: ICreateUser): ThunkType =>
//   async (dispatch) => {
//     dispatch(toggleLoading())
//     try {
//       const response = await authAPI.registration(userData)
//       localStorage.setItem(config.accessToken, response.data.accessToken)
//       dispatch(setUser(response.data.user))
//       dispatch(setAuth(true))
//     } catch (e) {
//       if (e instanceof Error) {
//         throw new Error(e.message)
//       }
//     }
//     dispatch(toggleLoading())
//   }

// export const logout = (): ThunkType => async (dispatch) => {
//   try {
//     await authAPI.logout()
//     dispatch(setUser(null))
//     dispatch(setAuth(false))
//     localStorage.removeItem(config.accessToken)
//   } catch (e) {
//     if (e instanceof Error) {
//       throw new Error(e.message)
//     }
//   }
// }

// export const checkAuth = (): ThunkType => async (dispatch) => {
//   dispatch(toggleLoading())
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}auth/refresh`,
//       {
//         withCredentials: true,
//       }
//     )
//     localStorage.setItem(config.accessToken, response.data.accessToken)
//     dispatch(setAuth(true))
//     dispatch(setUser(response.data.user))
//   } catch (e) {
//     if (e instanceof Error) {
//       throw new Error(e.message)
//     }
//   } finally {
//     dispatch(toggleLoading())
//   }
// }

export {}