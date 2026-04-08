import axios from 'axios'
import { globalOnRequestFulfilled, globalOnResponseRejected } from './axios-interceptor-manager'

const baseURL = 'https://support.emehmon.xdevs.uz/api/v1'

const requestLocaleChat = axios.create({
  baseURL,

  withCredentials: true,
})

requestLocaleChat.interceptors.request.use(globalOnRequestFulfilled, (error) => {
  return Promise.reject(error)
})

requestLocaleChat.interceptors.response.use((response) => response.data, globalOnResponseRejected)

export default requestLocaleChat
