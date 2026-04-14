import { auth } from '@/config/firebase'
import { useAuthStore } from '@/features/Account/auth/store/authStore'
import { message } from 'antd'
import { setCookie, deleteCookie } from 'cookies-next'
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { postTelegramUser } from '@/api'
import { withFacebookAuth, withGoogleAuth, withOneIdAuth, withOneIdAuth2 } from '../api'
import { useVerification } from '@/store/useVerification'

interface AuthContextProps {
  authStore: ReturnType<typeof useAuthStore>
  googleSignIn: () => void
  facebookSignIn: () => void
  // eslint-disable-next-line no-unused-vars
  oneIdLogin: ({ code }: { code: string }) => void
  telegramLogin: (data: any) => Promise<void>
  logOut: () => void
  isLoginModalOpen: boolean
  setLoginModalOpen: (open: boolean) => void
  openLogin: () => void
}

export const AuthContext = React.createContext<any | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { query } = useRouter()
  const authStore = useAuthStore()
  const router = useRouter()
  const { setVerifiedEmail, setIsVerified, setVerifiedTelegram } = useVerification()
  const t = useTranslations()

  const [isLoginModalOpen, setLoginModalOpen] = React.useState(false)
  const openLogin = () => setLoginModalOpen(true)
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider).then((result: any) => {
      withGoogleAuth({ auth_token: result.user.accessToken }).then((res: any) => {
        localStorage.setItem('refresh_token', res.refresh)
        localStorage.setItem('access_token', res.access)

        const { user_permissions: _permissions, ...shortUserInfo } = res.user

        setCookie('userInfo', shortUserInfo)

        authStore.login(res.user)
        setLoginModalOpen(false)
        router.push('/account/account-management')
        message.success(t('user.login-success'), 2)
      })
    })
  }

  const facebookSignIn = () => {
    const provider = new FacebookAuthProvider()
    provider.addScope('email')
    provider.addScope('public_profile')

    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user
        const token = await user.getIdToken()

        withFacebookAuth({ auth_token: token })
          .then((res: any) => {
            authStore.login(res.user)
            localStorage.setItem('refresh_token', res.refresh)
            localStorage.setItem('access_token', res.access)
            const { user_permissions: _permissions, ...shortUserInfo } = res.user

            setCookie('userInfo', shortUserInfo)
            setLoginModalOpen(false)
            router.push('/account/account-management')
            message.success(t('user.login-success'), 2)
          })
          .catch((error) => {
            console.error('Facebook auth API xatosi:', error)
            message.error(t('user.api-error'), 2)
          })
      })
      .catch((error) => {
        console.error('Facebook login xatosi:', error)
        message.error(t('user.login-failed'), 2)
      })
  }

  const oneIdLogin = ({ code }: { code: string; state?: string }) => {
    if (query?.state === 'test') {
      withOneIdAuth({ code }).then((res: any) => {
        authStore.login(res)
        localStorage.setItem('refresh_token', res.refresh)
        localStorage.setItem('access_token', res.access)

        const { user_permissions: _permissions, ...shortUserInfo } = res.user

        setCookie('userInfo', shortUserInfo)
        authStore.login(res.user)
        setLoginModalOpen(false)
        router.push(
          `${router.locale === 'uz' ? '' : `/${router.locale}`}/account/account-management`
        )

        message.success(t('user.login-success'), 2)
        withOneIdAuth2().catch((error) => {
          console.error('withOneIdAuth2 error:', error)
          message.error(t('user.api-error'), 2)
        })
      })
    }
  }

  const telegramLogin = async (data: any) => {
    const hide = message.loading(t('user.logging-in') || 'Xabarlashilmoqda...', 0)
    try {
      const res = await postTelegramUser(data)
      hide()
      if (res.access) {
        localStorage.setItem('refresh_token', res.refresh || '')
        localStorage.setItem('access_token', res.access)
        
        const { user_permissions: _permissions, ...shortUserInfo } = res.user
        setCookie('userInfo', shortUserInfo)
        
        authStore.login(res.user)
        setLoginModalOpen(false)
        
        if (!router.pathname.includes('account')) {
          router.push('/account/account-management')
        }
        
        message.success(t('user.login-success') || 'Muvaffaqiyatli kirdingiz', 2)
      }
    } catch (error: any) {
      hide()
      console.error('Telegram login error:', error)
      const errorMsg = error.response?.data?.detail || error.message || t('user.api-error')
      alert(`DEBUG: Telegram login failure: ${errorMsg}`)
      message.error(`${t('login_error') || 'Kirishda xatolik'}: ${errorMsg}`)
    }
  }

  const logOut = () => {
    signOut(auth)
    deleteCookie('userInfo')
    setVerifiedEmail('')
    setIsVerified(false)
    setVerifiedTelegram(null)
    authStore.logout()
    document.cookie = 'userInfo=; path=/; max-age=0;'
  }

  return (
    <AuthContext.Provider
      value={{
        authStore,
        googleSignIn,
        facebookSignIn,
        logOut,
        oneIdLogin,
        telegramLogin,
        isLoginModalOpen,
        setLoginModalOpen,
        openLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
