import { useRouter } from 'next/router'

import CFooter from './CFooter'
import CHeader from './CHeader'

import { getAccountMe } from '@/features/Account/api'
import { useContext, useEffect, type FC, type ReactNode } from 'react'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { setCookie } from 'cookies-next'
import { Accessibility } from 'accessibility'
import { useTranslations } from 'next-intl'

const CLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const t = useTranslations()
  const { pathname } = useRouter()
  const authContext = useContext(AuthContext)
  const authStore = authContext?.authStore as {
    isAuthenticated: boolean

    login: (_user: object) => void
    userInfo: object
  }
  const { login: loginAction, isAuthenticated } = authStore

  useEffect(() => {
    isAuthenticated &&
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

  return (
    <div className="flex min-h-screen flex-col">
      <CHeader />
      {children}
      <CFooter />
    </div>
  )
}

export default CLayout
