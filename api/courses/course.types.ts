import { IUser } from '../../redux/auth/auth.types'

export type ICreateCourse = {
  title: string
  description: string
  price: number
  createdBy: string
}

export type ICourseResponse = {
  title: string
  description: string
  price: number
  rating: number
  createdBy: IUser
  lessons: any
  responses: any
}
