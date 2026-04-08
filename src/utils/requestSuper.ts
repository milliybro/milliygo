import axios from 'axios'
import { globalOnRequestFulfilled, globalOnResponseRejected } from './axios-interceptor-manager'

const hostname = typeof window !== 'undefined' ? window.location.hostname : ''

const baseURL =
  hostname === 'sayohat.uz'
    ? 'https://back.sayohat.uz/superadmin/api/v1'
    : 'https://superapi.emehmon.xdevs.uz/api/v1'

const requestSuper = axios.create({
  baseURL,
})

requestSuper.interceptors.request.use(globalOnRequestFulfilled, (error) => {
  return Promise.reject(error)
})

requestSuper.interceptors.response.use((response) => response.data, globalOnResponseRejected)

export default requestSuper
