import { IUser } from '../auth/auth.types'
import { ILesson } from '../lessons/lessons.types'
import { IResponse } from '../responses/responses.types'

export type ICreateCourse = {
  title: string
  description: string
  price: number
  picture: string
  createdBy: string
}

export type IUpdateCourse = {
  _id: string
  title: string
  description: string
  price: number
}

export type BuyCourseType = {
  courseId: string
  userId: string
}

export type ICourse = {
  _id: string
  title: string
  description: string
  price: number
  picture: string
  rating: number
  createdBy: IUser
  purchasers: IUser[]
  lessons: ILesson[]
  responses: IResponse[]
}
