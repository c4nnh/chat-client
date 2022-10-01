import { notification } from 'antd'
import axios, { AxiosError } from 'axios'
import { ErrorResponse, RefreshTokenResponse } from '../models'
import { clearToken, getToken, setToken } from '../utils'
import Hooks from '../ExternalHooks'

const BASE_URL = process.env.REACT_APP_API_URL

const redirectToAuthPage = () => {
  if (Hooks.navigate) {
    Hooks.navigate('auth/login')
  }

  clearToken()
}

const refreshToken = async () => {
  const { refreshToken } = getToken()
  if (!refreshToken) return false
  try {
    const { data } = await axios
      .create({ baseURL: BASE_URL })
      .put<RefreshTokenResponse>('/auth/refresh-token', { refreshToken })
    if (!data) return false
    const { token } = data
    setToken(token)
    return true
  } catch {
    redirectToAuthPage()
    return false
  }
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
      if (isRefreshSuccess) {
        const { method, url, data, params } = error.config
        try {
          const { accessToken } = getToken()
          const req = axios.create({
            baseURL: BASE_URL,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            data: data ? JSON.parse(data) : data,
            params,
          })
          switch (method) {
            case 'get':
              return (await req.get(url || '', { params })).data
            case 'post':
              return (await req.post(url || '', { data })).data
            case 'put':
            case 'patch':
              return (await req.put(url || '', { data })).data
            case 'delete':
              return (await req.delete(url || '', { params })).data
          }
        } catch {
          redirectToAuthPage()
        }
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
