import { useRouter } from 'next/router'
import { useContext, useEffect, useState, type FC, type ReactNode } from 'react'
import { setCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import { Accessibility } from 'accessibility'

import CFooter from './CFooter'
import CHeader from './CHeader'
import BottomNavigation from './BottomNavigation'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { postTelegramUser } from '@/api'
import { useTelegram } from '@/hooks/useTelegram'

const CLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const t = useTranslations()
  const { pathname } = useRouter()
  const authContext = useContext(AuthContext)
  const [isMobile, setIsMobile] = useState(false)
  const { user: tgUser } = useTelegram()

  const authStore = authContext?.authStore
  const loginAction = authStore?.login
  const isAuthenticated = authStore?.isAuthenticated

  // 1. Ekran o'lchamini aniqlash
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 2. Telegram WebApp Login mantiqi
  useEffect(() => {
    // Agar foydalanuvchi login bo'lgan bo'lsa yoki TMA foydalanuvchisi topilmasa - to'xtatish
    if (isAuthenticated || !tgUser || !loginAction) return

    const handleTelegramAutoLogin = async () => {
      try {
        console.log('TMA Login jarayoni boshlandi:', tgUser.id)

        const res = await postTelegramUser({
          telegram_id: tgUser.id,
          first_name: tgUser.first_name,
          last_name: tgUser.last_name || '',
          username: tgUser.username || '',
          photo_url: tgUser.photo_url || '',
        })

        if (res.access) {
          localStorage.setItem('access_token', res.access)
          if (res.refresh) localStorage.setItem('refresh_token', res.refresh)

          // AuthContext orqali foydalanuvchini tizimga kiritish
          loginAction(res.user)

          // Cookie-ga ma'lumotlarni saqlash (Server-side rendering uchun kerak bo'lishi mumkin)
          const { user_permissions, ...shortUserInfo } = res.user || {}
          if (shortUserInfo) setCookie('userInfo', JSON.stringify(shortUserInfo))

          console.log('Telegram orqali login muvaffaqiyatli!')
        }
      } catch (err: any) {
        console.error('Telegram login xatosi:', err)
        import('antd').then(({ message }) => {
          message.error(t('login_error') + ': ' + (err.response?.data?.detail || err.message))
        })
      }
    }

    handleTelegramAutoLogin()
  }, [isAuthenticated, tgUser, loginAction, t])

  // 3. Accessibility sozlamalari
  useEffect(() => {
    if (typeof window === 'undefined') return

    const accessibility = new Accessibility({
      textPixelMode: true,
      labels: {
        menuTitle: t('accessibility.menuTitle'),
        increaseText: t('accessibility.increaseText'),
        decreaseText: t('accessibility.decreaseText'),
        invertColors: t('accessibility.invertColors'),
        // ... boshqa label-lar
      },
      icon: {
        img: 'visibility',
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.33)',
      }
    })

    return () => accessibility?.destroy?.()
  }, [t])

  // Login sahifalarida layoutni ko'rsatmaslik
  const noLayoutPages = ['login', 'get-token-my-id', 'register-guide', 'register-contractor']
  if (noLayoutPages.some(page => pathname.includes(page))) {
    return <>{children}</>
  }

  return (
    <div className={`flex min-h-screen flex-col ${isMobile ? 'tma-container' : ''}`}>
      {!isMobile && <CHeader />}
      <main className={`flex-grow ${isMobile ? 'pb-20' : 'container mx-auto px-4'}`}>
        {children}
      </main>
      {!isMobile && <CFooter />}
      {isMobile && <BottomNavigation />}
    </div>
  )
}

export default CLayout