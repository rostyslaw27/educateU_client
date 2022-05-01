import {
  applyMiddleware,
  combineReducers,
  createStore,
  compose,
  Action,
  AnyAction,
} from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import authReducer from './auth/auth.reducer'

const rootReducer = combineReducers({
  auth: authReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<AT extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  AT
>

// @ts-ignore
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  compose(applyMiddleware<DispatchFunctionType, AppStateType>(thunkMiddleware))
)

type DispatchFunctionType = ThunkDispatch<AppStateType, undefined, AnyAction>

export type AppDispatch = typeof store.dispatch

export default store
