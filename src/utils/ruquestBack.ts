import axios from 'axios'
import { globalOnRequestFulfilled, globalOnResponseRejected } from './axios-interceptor-manager'

const hostname = typeof window !== 'undefined' ? window.location.hostname : ''

const baseURL =
  hostname === 'sayohat.uz' ? 'https://back.sayohat.uz' : 'https://back.emehmon.xdevs.uz'

const requestBack = axios.create({
  baseURL,
})

requestBack.interceptors.request.use(globalOnRequestFulfilled, (error) => {
  return Promise.reject(error)
})

requestBack.interceptors.response.use((response) => response.data, globalOnResponseRejected)

export default requestBack
