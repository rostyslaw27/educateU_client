import { ActionsTypes } from './auth.actions'

const initialState = {
  id: null as string | null,
  email: null as string | null,
  isAuth: false,
  isLoading: false,
}
export type InitialStateType = typeof initialState

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
      }
    case 'TOGGLE_LOADING':
      return {
        ...state,
        isLoading: !state.isLoading,
      }
    case 'SET_AUTH':
      return {
        ...state,
        isAuth: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
