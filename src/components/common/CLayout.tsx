import { useRouter } from 'next/router'
import { useContext, useEffect, useState, type FC, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { Accessibility } from 'accessibility'

import CFooter from './CFooter'
import CHeader from './CHeader'
import BottomNavigation from './BottomNavigation'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { useTelegram } from '@/hooks/useTelegram'
import Logo from '@/components/icons/logo'

const CLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const t = useTranslations()
  const { pathname } = useRouter()
  const authContext = useContext(AuthContext)
  const [isMobile, setIsMobile] = useState(false)
  const { user: tgUser, initData, isReady } = useTelegram()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const authStore = authContext?.authStore
  const isAuthenticated = authStore?.isAuthenticated

  // 1. Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 2. Professional Telegram Auto-Login logic
  useEffect(() => {
    // Wait until SDK is ready and check if we already have an authenticated session
    if (!isReady || isAuthenticated || !authContext?.telegramLogin) return

    // If we're on a page that doesn't need layout/auth, skip
    const noLayoutPages = ['login', 'get-token-my-id', 'register-guide', 'register-contractor']
    if (noLayoutPages.some(page => pathname.includes(page))) return

    if (tgUser && !isLoggingIn) {
      const handleTelegramAutoLogin = async () => {
        setIsLoggingIn(true)
        try {
          console.log('Professional TMA Login initiated for user:', tgUser.id)
          await authContext.telegramLogin({
            ...tgUser,
            telegram_id: tgUser.id,
            init_data: initData,
            auth_date: Math.floor(Date.now() / 1000),
            hash: '', 
          })
        } catch (err: any) {
          console.error('Telegram auto-login failure:', err)
        } finally {
          setIsLoggingIn(false)
        }
      }

      handleTelegramAutoLogin()
    }
  }, [isReady, tgUser, isAuthenticated, authContext, initData, pathname, isLoggingIn])

  // 3. Accessibility settings
  useEffect(() => {
    if (typeof window === 'undefined') return

    const accessibility = new Accessibility({
      textPixelMode: true,
      labels: {
        menuTitle: t('accessibility.menuTitle'),
        increaseText: t('accessibility.increaseText'),
        decreaseText: t('accessibility.decreaseText'),
        invertColors: t('accessibility.invertColors'),
      },
      icon: {
        img: 'visibility',
        color: '#ffffff',
        backgroundColor: 'rgba(255, 255, 255, 0.33)',
      }
    })

    return () => accessibility?.destroy?.()
  }, [t])

  // Show splash screen while initializing or logging in via TMA
  if (!isReady || isLoggingIn) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-white">
        <div className="animate-pulse mb-6">
           <Logo className="text-[60px] text-primary" />
        </div>
        <div className="flex flex-col items-center gap-2">
            <span className="text-[16px] font-bold text-gray-800 animate-bounce">
               Milliy-Go
            </span>
            <span className="text-[12px] text-gray-400">
               {isLoggingIn ? 'Akkauntga kirilmoqda...' : 'Yuklanmoqda...'}
            </span>
        </div>
      </div>
    )
  }

  // Hide layout for specific pages
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