import { AxiosResponse } from 'axios'
import {
  BuyCourseType,
  ICourse,
  ICreateCourse,
  IUpdateCourse,
} from './course.types'
import instance from '../main.api'

export const coursesAPI = {
  createCourse: async (
    courseData: any | ICreateCourse
  ): Promise<AxiosResponse<ICourse>> => {
    const response = await instance.post<ICourse>(`courses/create`, courseData)
    return response
  },
  buyCourse: async (
    courseData: BuyCourseType
  ): Promise<AxiosResponse<ICourse>> => {
    const response = await instance.post<ICourse>(`courses/buy`, courseData)
    return response
  },
  updateCourse: async (
    courseData: IUpdateCourse
  ): Promise<AxiosResponse<ICourse>> => {
    const response = await instance.put<ICourse>(`courses/${courseData._id}`, {
      ...courseData,
    })
    return response
  },
  getAllCourses: async (): Promise<AxiosResponse<ICourse[]>> => {
    const response = await instance.get<ICourse[]>(`courses`)
    return response
  },
  getPurchasedCourses: async (
    id: string
  ): Promise<AxiosResponse<ICourse[]>> => {
    const response = await instance.get<ICourse[]>(`courses/purchased/${id}`)
    return response
  },
  getCreatedCourses: async (id: string): Promise<AxiosResponse<ICourse[]>> => {
    const response = await instance.get<ICourse[]>(`courses/created/${id}`)
    return response
  },
  getCourse: async (
    id: string | string[] | undefined
  ): Promise<AxiosResponse<ICourse>> => {
    const response = await instance.get<ICourse>(`courses/${id}`)
    return response
  },
}
