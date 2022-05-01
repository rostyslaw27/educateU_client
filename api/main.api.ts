import axios from 'axios'
import config from '../configs/config'

const { accessToken } = config

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

instance.interceptors.request.use((config: any) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(accessToken)}`
  return config
})

instance.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}auth/refresh`, {
          withCredentials: true,
        })
        localStorage.setItem(accessToken, response.data.accessToken)
        return instance.request(originalRequest)
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message)
        }
      }
    }
    throw error
  }
)

export default instance
