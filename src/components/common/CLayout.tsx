import { useRouter } from 'next/router'
import { useContext, useEffect, useState, type FC, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { Accessibility } from 'accessibility'

import CFooter from './CFooter'
import CHeader from './CHeader'
import BottomNavigation from './BottomNavigation'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { useTelegram } from '@/hooks/useTelegram'

const CLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const t = useTranslations()
  const { pathname } = useRouter()
  const authContext = useContext(AuthContext)
  const [isMobile, setIsMobile] = useState(false)

  const { user: tgUser, initData, isReady, logs, addLog } = useTelegram()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const authStore = authContext?.authStore
  const isAuthenticated = authStore?.isAuthenticated

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isReady || isAuthenticated || !authContext?.telegramLogin) return

    if (tgUser && tgUser.id && !isLoggingIn) {
      const handleTelegramAutoLogin = async () => {
        setIsLoggingIn(true)
        addLog(`Login boshlandi: ${tgUser.id}`)

        try {
          // SSR xavfsiz bo'lishi uchun localStorage'ni tekshirib ishlatamiz
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
          }

          await authContext.telegramLogin({
            telegram_id: String(tgUser.id),
            first_name: tgUser.first_name,
            last_name: tgUser.last_name || '',
            username: tgUser.username || '',
            init_data: initData,
            auth_date: Math.floor(Date.now() / 1000)
          })

          addLog("Muvaffaqiyatli kirildi!")
        } catch (err: any) {
          addLog(`KIRISHDA XATO: ${err.message}`)
        } finally {
          setIsLoggingIn(false)
        }
      }

      handleTelegramAutoLogin()
    }
  }, [isReady, tgUser, isAuthenticated, authContext, initData, isLoggingIn])

  // Accessibility
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

  const noLayoutPages = ['login', 'get-token-my-id', 'register-guide', 'register-contractor']
  const shouldShowLayout = !noLayoutPages.some(page => pathname.includes(page))

  if (!shouldShowLayout) return <>{children}</>

  return (
    <div className={`flex min-h-screen flex-col ${isMobile ? 'tma-container' : ''}`}>
      {!isMobile && <CHeader />}

      <main className={`flex-grow ${isMobile ? 'pb-20' : 'container mx-auto px-4'}`}>
        {children}

        {/* MONITORING LOGGER */}
        {isMobile && (
          <div className="mt-8 p-4 bg-gray-900 text-green-400 text-[10px] font-mono rounded-2xl mx-2 border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
              <span className="font-bold opacity-70 uppercase tracking-widest text-[9px]">TWA-SDK Monitoring</span>
              <div className="flex gap-1">
                <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-500' : 'bg-yellow-500'}`} />
                {isLoggingIn && <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />}
              </div>
            </div>
            <div className="space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="leading-relaxed">{log}</div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-800 text-[9px] text-gray-500 grid grid-cols-2 gap-2">
                <div>Auth: <span className={isAuthenticated ? "text-green-500" : "text-red-500"}>{isAuthenticated ? 'YES' : 'NO'}</span></div>
                <div>Ready: <span>{isReady ? 'YES' : 'NO'}</span></div>
                <div>TG User: <span className="text-blue-400">{tgUser ? (tgUser.username || tgUser.id) : 'NOT_FOUND'}</span></div>
                <div>SDK: <span className="text-purple-400">@twa-dev/sdk</span></div>
              </div>
            </div>
          </div>
        )}
      </main>

      {!isMobile && <CFooter />}
      {isMobile && <BottomNavigation />}
    </div>
  )
}

export default CLayout
