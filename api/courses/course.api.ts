import { AxiosResponse } from 'axios'
import { ICourseResponse, ICreateCourse } from './course.types'
import instance from '../main.api'

export const coursesAPI = {
  createCourse: async (
    courseData: ICreateCourse
  ): Promise<AxiosResponse<ICourseResponse>> => {
    const response = await instance.post<ICourseResponse>(`courses/create`, {
      ...courseData,
    })
    return response
  },
  getAllCourses: async (): Promise<AxiosResponse<ICourseResponse[]>> => {
    const response = await instance.get<ICourseResponse[]>(`courses`)
    return response
  },
}
