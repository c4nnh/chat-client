import { notification } from 'antd'
import axios, { AxiosError } from 'axios'
import { ErrorResponse } from '../models'
import { getToken } from '../utils'

const BASE_URL = process.env.REACT_APP_API_URL

// Common request
const request = axios.create({
  baseURL: BASE_URL,
})

request.interceptors.request.use(
  config => {
    const { accessToken } = getToken()
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      }
      config.params = {
        ...config.params,
      }
    }
    return config
  },
  (error: AxiosError<ErrorResponse>) => {
    notification.error({
      message: error.response?.data.error,
      description: error.response?.data.message,
    })
    return Promise.reject(error.response?.data)
  }
)

request.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

// Auth request
const authRequest = axios.create({
  baseURL: BASE_URL,
})

authRequest.interceptors.response.use(
  response => response.data,
  (error: AxiosError<ErrorResponse>) => {
    notification.error({
      message: error.response?.data.error,
      description: error.response?.data.message,
    })
    return Promise.reject(error.response?.data)
  }
)

export { request, authRequest }
