import { AxiosResponse } from 'axios'
import instance from '../main.api'
import { ICreateAnswer, IAnswer } from './answers.types'

export const answersAPI = {
  createAnswer: async (
    answerData: ICreateAnswer
  ): Promise<AxiosResponse<IAnswer>> => {
    const response = await instance.post<IAnswer>(`answers/create`, answerData)
    return response
  },
  getAnswersByQuestionId: async (
    id: string
  ): Promise<AxiosResponse<IAnswer[]>> => {
    const response = await instance.get<IAnswer[]>(`answers/${id}`)
    return response
  },
}
