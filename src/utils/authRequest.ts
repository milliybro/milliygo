import axios from 'axios'
import { globalOnRequestFulfilled, globalOnResponseRejected } from './axios-interceptor-manager'

const hostname = typeof window !== 'undefined' ? window.location.hostname : ''

const baseURL =
  hostname === 'sayohat.uz'
    ? 'https://mytizim.uz'
    : 'https://mytizim.uz'

const requestAuth = axios.create({
  baseURL,
})

requestAuth.interceptors.request.use(globalOnRequestFulfilled, (error) => {
  return Promise.reject(error)
})

requestAuth.interceptors.response.use((response) => response.data, globalOnResponseRejected)

export default requestAuth
