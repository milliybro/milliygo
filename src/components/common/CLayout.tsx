import { useRouter } from 'next/router'

import CFooter from './CFooter'
import CHeader from './CHeader'
import BottomNavigation from './BottomNavigation'

import { useContext, useEffect, type FC, type ReactNode, useState } from 'react'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { setCookie } from 'cookies-next'
import { Accessibility } from 'accessibility'
import { useTranslations } from 'next-intl'
import { useTelegram } from '@/hooks/useTelegram'
import { postTelegramUser } from '@/api'

const CLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const t = useTranslations()
  const { pathname } = useRouter()
  const authContext = useContext(AuthContext)
  const { tg, user } = useTelegram()
  const [isMobile, setIsMobile] = useState(false)

  const authStore = authContext?.authStore
  const loginAction = authStore?.login
  const isAuthenticated = authStore?.isAuthenticated

  // Resize detector
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    if (typeof window !== 'undefined') {
      handleResize()
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Telegram WebApp auto-login
  useEffect(() => {
    console.log('=== TELEGRAM AUTO LOGIN ===')
    console.log('user:', user)
    console.log('isAuthenticated:', isAuthenticated)
    console.log('loginAction:', !!loginAction)

    if (!user || isAuthenticated || !loginAction) {
      console.log('SKIP:', {
        noUser: !user,
        alreadyAuth: isAuthenticated,
        noLoginAction: !loginAction,
      })
      return
    }

    console.log('postTelegramUser chaqirilmoqda:', {
      telegram_id: user.id,
      first_name: user.first_name,
      username: user.username,
    })

    postTelegramUser({
      telegram_id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      photo_url: user.photo_url,
    })
      .then((res) => {
        console.log('postTelegramUser response:', res)
        if (res.access) {
          localStorage.setItem('access_token', res.access)
          if (res.refresh) localStorage.setItem('refresh_token', res.refresh)
          loginAction(res.user)
          const { user_permissions: _, ...shortUserInfo } = res.user || {}
          if (shortUserInfo) setCookie('userInfo', shortUserInfo)
        } else {
          console.error('access token yo`q, response:', res)
        }
      })
      .catch((err) => {
        console.error('=== TELEGRAM LOGIN XATO ===')
        console.error('status:', err.response?.status)
        console.error('data:', err.response?.data)
        console.error('message:', err.message)
        import('antd').then(({ message }) => {
          message.error('Login xatosi: ' + (err.response?.data?.detail || err.message))
        })
      })
  }, [user, isAuthenticated, loginAction])

  // Accessibility
  useEffect(() => {
    if (typeof window === 'undefined') return

    const accessibility = new Accessibility({
      textPixelMode: true,
      textSizeFactor: 4,
      suppressCssInjection: false,
      suppressDomInjection: false,
      labels: {
        menuTitle: t('accessibility.menuTitle'),
        increaseText: t('accessibility.increaseText'),
        decreaseText: t('accessibility.decreaseText'),
        increaseTextSpacing: t('accessibility.increaseTextSpacing'),
        decreaseTextSpacing: t('accessibility.decreaseTextSpacing'),
        increaseLineHeight: t('accessibility.increaseLineHeight'),
        decreaseLineHeight: t('accessibility.decreaseLineHeight'),
        invertColors: t('accessibility.invertColors'),
        grayHues: t('accessibility.grayHues'),
        underlineLinks: t('accessibility.underlineLinks'),
        bigCursor: t('accessibility.bigCursor'),
        readingGuide: t('accessibility.readingGuide'),
        disableAnimations: t('accessibility.disableAnimations'),
      },
      icon: {
        img: 'visibility',
        useEmojis: false,
        color: '#ffffff',
        circular: true,
        backgroundColor: 'rgba(255, 255, 255, 0.33)',
      },
    })

      ; (window as any).accessibilityInstance = accessibility

    setTimeout(() => {
      document.querySelectorAll('.material-icons').forEach((el) => {
        el.classList.add('notranslate')
        el.setAttribute('translate', 'no')
      })
    }, 0)

    return () => accessibility?.destroy?.()
  }, [t])

  if (
    pathname.includes('login') ||
    pathname.includes('get-token-my-id') ||
    pathname.includes('register-guide') ||
    pathname.includes('register-contractor')
  ) {
    return children
  }

  return (
    <div className={`flex min-h-screen flex-col ${isMobile ? 'tma-container' : ''}`}>
      {!isMobile && <CHeader />}
      <main className={`flex-grow ${isMobile ? 'pb-20' : 'container'}`}>
        {children}
      </main>
      {!isMobile && <CFooter />}
      {isMobile && <BottomNavigation />}
    </div>
  )
}

export default CLayout