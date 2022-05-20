import { AxiosResponse } from 'axios'
import instance from '../main.api'
import { ICreateResponse, IResponse } from './responses.types'

export const responsesAPI = {
  createResponse: async (
    responseData: ICreateResponse
  ): Promise<AxiosResponse<IResponse>> => {
    const response = await instance.post<IResponse>(
      `responses/create`,
      responseData
    )
    return response
  },
  getResponsesByCourseId: async (
    id: string
  ): Promise<AxiosResponse<IResponse[]>> => {
    const response = await instance.get<IResponse[]>(`responses/${id}`)
    return response
  },
}
