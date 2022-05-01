import { InferActionsTypes } from '../reduxStore'
import { IUser } from './auth.types'

export const actions = {
  setUser: (user: IUser | null) => ({ type: 'SET_USER', payload: user } as const),
  toggleLoading: () => ({ type: 'TOGGLE_LOADING' } as const),
  setAuth: (isAuth: boolean) =>
    ({ type: 'SET_AUTH', payload: isAuth } as const),
}
export type ActionsTypes = InferActionsTypes<typeof actions>
