import { create } from 'zustand'

export interface IUserInfo {
  id: number
  is_guide: boolean
  guide: {
    id: number
  }
  last_login: any
  is_superuser: boolean
  username: string
  first_name: string
  middle_name: any
  last_name: string
  email: string
  avatar: string
  phone: any
  pinfl: any
  passport_sn: any
  passport_given_by: any
  passport_expire_date: any
  position: any
  address: any
  is_staff: boolean
  is_active: boolean
  date_joined: string
  groups: any[]
  region: any
  district: any
  country: any
  type: any
  user_permissions: any[]
  notification: any[]
  language: any[]
  deleted: any
  deleted_by_cascade: boolean
  birth_date: any
  gender: string
  unsubscribe_reason: any
  confirm_code: any
  expire_code: any
  created_at: string
  updated_at: string
  organization: number
  telegram_id: number | null
}

interface AuthState {
  isAuthenticated?: any
  userInfo: IUserInfo | null

  login: (_userData: IUserInfo) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => {
  if (typeof window !== 'undefined') {
    const storedAuthState = localStorage.getItem('authState')
    const initialAuthState: AuthState = storedAuthState
      ? JSON.parse(storedAuthState)
      : { isAuthenticated: false, userInfo: null }

    return {
      ...initialAuthState,
      login: (userData) => {
        set({ isAuthenticated: true, userInfo: userData })
        localStorage.setItem(
          'authState',
          JSON.stringify({ isAuthenticated: true, userInfo: userData })
        )
      },
      logout: () => {
        set({ isAuthenticated: false, userInfo: null })
        localStorage.removeItem('authState')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('access_token')
      },
    }
  }

  return { isAuthenticated: false, userInfo: null, login: () => {}, logout: () => {} }
})
