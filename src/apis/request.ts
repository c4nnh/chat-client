import { notification } from 'antd'
import axios, { AxiosError } from 'axios'
import { hooks } from '../hooks/external'
import { ErrorResponse, RefreshTokenResponse } from '../models'
import { clearToken, getToken, setToken } from '../utils'

const BASE_URL = process.env.REACT_APP_API_URL

const refreshToken = async () => {
  const { refreshToken } = getToken()
  if (!refreshToken) {
    return false
  }
  const { data } = await axios
    .create({ baseURL: BASE_URL })
    .put<RefreshTokenResponse>('/auth/refresh-token', { refreshToken })
  if (!data) {
    clearToken()
    return false
  }
  const { token } = data
  setToken(token)
  return true
}

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
  async (error: AxiosError<ErrorResponse>) => {
    if (error.response?.data.error === 'EXPIRED_TOKEN') {
      const isRefreshSuccess = await refreshToken()
      if (isRefreshSuccess && hooks.navigate) {
        hooks.navigate(0)
      }
    }
    return Promise.reject(error)
  }
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
