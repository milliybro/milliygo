import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { getCookie, deleteCookie } from 'cookies-next'
import { getErrorMessage } from '../helpers/get-error-message'
import { IErrorMessage } from '@/types'
import { notification } from 'antd'

const hostname = typeof window !== 'undefined' ? window.location.hostname : ''

const authURL =
  hostname === 'sayohat.uz'
    ? 'https://back.sayohat.uz/auth/api/v1'
    : 'https://auth.emehmon.xdevs.uz/api/v1'

let refreshTokenPromise: Promise<string> | null = null

class CustomError extends Error {
  code: string
  status: number
  constructor(message: string, code: string, status: number) {
    super(message)
    this.code = code
    this.status = status
  }
}

export const globalOnResponseRejected: (_error: AxiosError) => Promise<any> = async (
  error: AxiosError
) => {
  const originalReq: (InternalAxiosRequestConfig<any> & { _retry?: boolean }) | undefined =
    error.config

  const locale = getCookie('locale') || 'uz'
  const messages = getErrorMessage(locale)

  const refreshT = localStorage.getItem('refresh_token')

  if (error?.response?.status === 503) {
    const data = error.response.data as any

    const detail = data?.[0]?.detail || data?.detail || data?.message || messages.general

    notification.error({
      message: messages.server,
      description: detail,
    })

    setTimeout(() => {
      window.history.back()
    }, 500)

    return Promise.reject(error)
  }

  if (
    refreshT &&
    (error.status === 403 || error.status === 401) &&
    originalReq &&
    !originalReq?._retry
  ) {
    originalReq._retry = true

    if (refreshTokenPromise) {
      try {
        const token = await refreshTokenPromise
        originalReq.headers.Authorization = `Bearer ${token}`
        const response = await axios(originalReq)
        return response.data
      } catch (err) {
        return Promise.reject(err)
      }
    }

    refreshTokenPromise = axios
      .post(`${authURL}/account/me/refresh/`, { refresh: refreshT })
      .then(({ data }) => {
        localStorage.setItem('access_token', data.access)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`
        return data.access
      })
      .catch((err) => {
        const errorData = err?.response?.data as IErrorMessage[]

        if (err?.response?.status === 500) {
          notification.error({ message: messages.server })
        } else if (Array.isArray(errorData)) {
          errorData.forEach((val) => {
            notification.error({
              message: val?.error_type,
              description: val?.detail,
            })
          })
        } else {
          notification.error({ message: 'Unexpected error occurred.' })
        }

        localStorage.clear()
        deleteCookie('userInfo')
        window.location.reload()

        throw err
      })
      .finally(() => {
        refreshTokenPromise = null
      })

    try {
      const token = await refreshTokenPromise
      originalReq.headers.Authorization = `Bearer ${token}`
      const response = await axios(originalReq)
      return response.data
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const errorData = error.response?.data as IErrorMessage[]

  if (Array.isArray(errorData) && errorData.length > 0) {
    const errorMessages = errorData
      .map((err) => err?.detail)
      .filter(Boolean)
      .join('\n')

    errorData.forEach((val) => {
      if (val?.status_code === 500) {
        notification.error({ message: messages.server })
      } else if (Array.isArray(errorData)) {
        errorData.forEach((val) => {
          notification.error({
            message: val?.error_type,
            description: val?.detail,
          })
        })
      } else {
        notification.error({ message: 'Unexpected error occurred.' })
      }
    })

    return Promise.reject(
      new CustomError(errorMessages, error.code || '', error.response?.status || 0)
    )
  }

  return Promise.reject(new CustomError('Something went wrong', 'INTERNAL_SERVER_ERROR', 500))
}

export const globalOnRequestFulfilled: (
  _config: InternalAxiosRequestConfig<any>
) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> = (config) => {
  const token = localStorage.getItem('access_token')

  if (token !== null && token !== 'undefined') {
    config.headers.Authorization = `Bearer ${token}`
  }

  const cookie = getCookie('csrftoken', { domain: config.baseURL })

  const language = getCookie('locale') || 'uz'
  config.headers['Accept-Language'] = language

  if (cookie !== null) {
    config.headers['X-CSRFToken'] = cookie
  }

  return config
}
