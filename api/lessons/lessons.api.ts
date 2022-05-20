import { AxiosResponse } from 'axios'
import instance from '../main.api'
import { ICreateLesson, ILesson, IUpdateLesson } from './lessons.types'

export const lessonsAPI = {
  createLesson: async (
    lessonData: any | ICreateLesson
  ): Promise<AxiosResponse<ILesson>> => {
    const response = await instance.post<ILesson>(`lessons/create`, lessonData)
    return response
  },
  updateLesson: async (
    lessonData: IUpdateLesson
  ): Promise<AxiosResponse<ILesson>> => {
    const response = await instance.put<ILesson>(`lessons/${lessonData._id}`, {
      ...lessonData,
    })
    return response
  },
  getLesson: async (id: any): Promise<AxiosResponse<ILesson>> => {
    const response = await instance.get<ILesson>(`lessons/${id}`)
    return response
  },
  deleteLesson: async (id: any): Promise<AxiosResponse<ILesson>> => {
    const response = await instance.delete<ILesson>(`lessons/${id}`)
    return response
  },
}
