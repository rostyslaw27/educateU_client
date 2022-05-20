import { IQuestion } from '../questions/questions.types'

export type ICreateLesson = {
  title: string
  description: string
  courseId: string
  video: string
}

export type IUpdateLesson = {
  _id: string
  title: string
  description: string
}

export type ILesson = {
  _id: string
  title: string
  description: string
  video: string
  questions: IQuestion[]
  courseId: string
}
