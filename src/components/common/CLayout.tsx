import { useRouter } from 'next/router'

import CFooter from './CFooter'
import CHeader from './CHeader'
import BottomNavigation from './BottomNavigation'

import { getAccountMe } from '@/features/Account/api'
import { useContext, useEffect, type FC, type ReactNode, useState } from 'react'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { setCookie } from 'cookies-next'
import { Accessibility } from 'accessibility'
import { useTranslations } from 'next-intl'
import { useTelegram } from '@/hooks/useTelegram'

const CLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const t = useTranslations()
  const { pathname } = useRouter()
  const authContext = useContext(AuthContext)
  const { tg } = useTelegram()
  const [isMobile, setIsMobile] = useState(false)

  const authStore = authContext?.authStore
  const loginAction = authStore?.login
  const isAuthenticated = authStore?.isAuthenticated

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && loginAction) {
      getAccountMe().then((res) => {
        loginAction(res)
        const shortUserInfo = {
          id: res.id,
          first_name: res.first_name,
          last_name: res.last_name,
          email: res.email,
          phone: res.phone,
          groups: res.groups,
          is_guide: res.is_guide,
        }
        setCookie('userInfo', shortUserInfo)
      })
    }
  }, [isAuthenticated, loginAction])

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

    ;(window as any).accessibilityInstance = accessibility

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

  // If in Telegram, we might want to hide the header/footer and only use native components
  const isTma = !!tg

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
