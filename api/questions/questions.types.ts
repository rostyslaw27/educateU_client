import { IAnswer } from '../answers/answers.types'
import { IUser } from '../auth/auth.types'

export type ICreateQuestion = {
  text: string
  createdBy: string
  lessonId: string
}

export type IQuestion = {
  _id: string
  text: string
  date: Date
  createdBy: IUser
  answers: IAnswer[]
  lessonId: string
}
