import axios from 'axios'
import { globalOnRequestFulfilled, globalOnResponseRejected } from './axios-interceptor-manager'

const baseURL = process.env.NEXT_PUBLIC_CHAT_BASE_URL

const requestChat = axios.create({
  baseURL,
})

requestChat.interceptors.request.use(globalOnRequestFulfilled, (error) => {
  return Promise.reject(error)
})

requestChat.interceptors.response.use((response) => response.data, globalOnResponseRejected)

export default requestChat
