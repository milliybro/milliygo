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
  
  // Hook dan loglarni ham olamiz
  const { user: tgUser, initData, isReady, logs, addLog } = useTelegram()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const authStore = authContext?.authStore
  const isAuthenticated = authStore?.isAuthenticated

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isReady || isAuthenticated || !authContext?.telegramLogin) return

    if (tgUser && !isLoggingIn) {
      const handleTelegramAutoLogin = async () => {
        setIsLoggingIn(true)
        addLog("Backendga login so'rovi yuborilmoqda...")
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
          console.error(err)
        } finally {
          setIsLoggingIn(false)
        }
      }

      handleTelegramAutoLogin()
    }
  }, [isReady, tgUser, isAuthenticated, authContext, initData, isLoggingIn])

  // Accessibility sozlamalari
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

  // Layoutni yashirish kerak bo'lgan sahifalar
  const noLayoutPages = ['login', 'get-token-my-id', 'register-guide', 'register-contractor']
  const shouldShowLayout = !noLayoutPages.some(page => pathname.includes(page))

  if (!shouldShowLayout) return <>{children}</>

  return (
    <div className={`flex min-h-screen flex-col ${isMobile ? 'tma-container' : ''}`}>
      {!isMobile && <CHeader />}
      
      <main className={`flex-grow ${isMobile ? 'pb-20' : 'container mx-auto px-4'}`}>
        {children}

        {/* DEBUG LOGGER SECTION - FAQAT MONITORING UCHUN */}
        <div className="mt-6 p-4 bg-gray-900 text-green-400 text-[11px] font-mono rounded-xl mx-2 shadow-2xl border border-gray-700">
          <div className="flex justify-between items-center mb-2 border-b border-gray-700 pb-2">
             <span className="font-bold uppercase tracking-wider text-xs">System Debug Logs</span>
             <span className="bg-green-900 text-[9px] px-2 py-0.5 rounded text-green-100">Live</span>
          </div>
          <div className="space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="border-l border-green-800 pl-2">{log}</div>
            ))}
            <div className="mt-2 pt-2 border-t border-gray-800 text-gray-400 grid grid-cols-2 gap-1">
               <div>Auth: <span className={isAuthenticated ? "text-green-500":"text-red-500"}>{isAuthenticated ? 'YES' : 'NO'}</span></div>
               <div>TMA Ready: <span>{isReady ? 'YES' : 'NO'}</span></div>
               <div>TG User: <span className="text-blue-400">{tgUser ? (tgUser.username || tgUser.id) : 'NONE'}</span></div>
               <div>Mobile: <span>{isMobile ? 'YES' : 'NO'}</span></div>
            </div>
          </div>
        </div>
      </main>

      {!isMobile && <CFooter />}
      {isMobile && <BottomNavigation />}
    </div>
  )
}

export default CLayout
