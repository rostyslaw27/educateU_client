import { IUser } from "../auth/auth.types"

export type ICreateAnswer = {
  text: string
  createdBy: string
  questionId: string
}

export type IAnswer = {
  _id: string
  text: string
  date: Date
  createdBy: IUser
  questionId: string
}
