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

  // Hook orqali Telegram ma'lumotlari va loglarni olamiz
  const { user: tgUser, initData, isReady, logs, addLog } = useTelegram()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const authStore = authContext?.authStore
  const isAuthenticated = authStore?.isAuthenticated

  // 1. Ekran o'lchamini aniqlash (Mobile yoki Desktop)
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 2. Telegram Auto-Login mantiqi
  useEffect(() => {
    // SDK tayyor bo'lishini va foydalanuvchi login bo'lmaganini tekshiramiz
    if (!isReady || isAuthenticated || !authContext?.telegramLogin) return

    // Agarda foydalanuvchi ma'lumotlari bo'lsa, login so'rovini yuboramiz
    if (tgUser && tgUser.id && !isLoggingIn) {
      const handleTelegramAutoLogin = async () => {
        setIsLoggingIn(true)
        addLog(`Login so'rovi yuborilmoqda: Telegram ID ${tgUser.id}`)

        try {
          await authContext.telegramLogin({
            ...tgUser,
            telegram_id: tgUser.id,
            init_data: initData,
            auth_date: Math.floor(Date.now() / 1000),
            hash: '',
          })
          addLog("Login muvaffaqiyatli yakunlandi!")
        } catch (err: any) {
          addLog(`XATOLIK: Login amalga oshmadi: ${err.message}`)
          console.error('TMA Auth Error:', err)
        } finally {
          setIsLoggingIn(false)
        }
      }

      handleTelegramAutoLogin()
    } else if (isReady && !tgUser) {
      // Bu xabar faqat monitoring uchun, oddiy brauzerda chiqadi
      addLog("Telegram foydalanuvchisi aniqlanmadi.")
    }
  }, [isReady, tgUser, isAuthenticated, authContext, initData, isLoggingIn])

  // 3. Accessibility (Ko'zi ojizlar uchun) sozlamalari
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

  // Layout yashirilishi kerak bo'lgan sahifalar ruyxati
  const noLayoutPages = ['login', 'get-token-my-id', 'register-guide', 'register-contractor']
  const shouldShowLayout = !noLayoutPages.some(page => pathname.includes(page))

  if (!shouldShowLayout) return <>{children}</>

  return (
    <div className={`flex min-h-screen flex-col ${isMobile ? 'tma-container' : ''}`}>
      {!isMobile && <CHeader />}

      <main className={`flex-grow ${isMobile ? 'pb-20' : 'container mx-auto px-4'}`}>
        {children}

        {/* DEBUG MONITORING - FAQAT TESTING JALAYONIDA KERAK */}
        {isMobile && (
          <div className="mt-8 p-4 bg-gray-900 text-green-400 text-[10px] font-mono rounded-2xl mx-2 border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-2 border-b border-gray-800 pb-2">
              <span className="font-bold uppercase opacity-70">TMA System Logs</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="opacity-90">{log}</div>
              ))}
              <div className="mt-2 pt-2 border-t border-gray-800 text-[9px] text-gray-500 grid grid-cols-2 gap-x-4">
                <div>AUTH: <span className={isAuthenticated ? "text-green-500" : "text-red-500"}>{isAuthenticated ? 'YES' : 'NO'}</span></div>
                <div>TMA READY: <span>{isReady ? 'YES' : 'NO'}</span></div>
                <div>TG USER: <span className="text-blue-400">{tgUser ? (tgUser.username || tgUser.id) : 'NOT_FOUND'}</span></div>
                <div>PATH: <span>{pathname}</span></div>
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
