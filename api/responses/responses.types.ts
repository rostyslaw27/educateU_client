import { IUser } from '../auth/auth.types'

export type ICreateResponse = {
  rating: number
  description: string
  createdBy: string
  courseId: string
}

export type IResponse = {
  _id: string
  date: Date
  rating: number
  description: string
  createdBy: IUser
  courseId: string
}
