import { AxiosResponse } from 'axios'
import instance from '../main.api'
import { ICreateQuestion, IQuestion } from './questions.types'

export const questionsAPI = {
  createQuestion: async (
    questionData: ICreateQuestion
  ): Promise<AxiosResponse<IQuestion>> => {
    const response = await instance.post<IQuestion>(
      `questions/create`,
      questionData
    )
    return response
  },
  getQuestionsByLessonId: async (
    id: string
  ): Promise<AxiosResponse<IQuestion[]>> => {
    const response = await instance.get<IQuestion[]>(`questions/${id}`)
    return response
  },
}
