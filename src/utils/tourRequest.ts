import axios from 'axios'
import { globalOnRequestFulfilled, globalOnResponseRejected } from './axios-interceptor-manager'

const hostname = typeof window !== 'undefined' ? window.location.hostname : ''

const baseURL =
  hostname === 'sayohat.uz'
    ? 'https://back.sayohat.uz/touragent/api/v1'
    : 'https://touragentapi.emehmon.xdevs.uz/api/v1'

const requestTour = axios.create({
  baseURL,
})

requestTour.interceptors.request.use(globalOnRequestFulfilled, (error) => {
  return Promise.reject(error)
})

requestTour.interceptors.response.use((response) => response.data, globalOnResponseRejected)

export default requestTour
