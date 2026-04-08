import { IUserInfo } from '../store/authStore'

interface AuthResponse {
  access_token: string
  refresh_token: string
  user_information: IUserInfo
  has_register: boolean
}

interface AuthOtpResponse {
  email: string
  session?: string
}

export type { AuthResponse, AuthOtpResponse }
