import { useEffect, useState } from 'react'

export const useTelegram = () => {
  const [isReady, setIsReady] = useState(false)
  const [tg, setTg] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [initData, setInitData] = useState<string>('')

  useEffect(() => {
    const initWebApp = () => {
      const webapp = (window as any).Telegram?.WebApp
      
      if (webapp) {
        webapp.ready()
        webapp.expand()
        setTg(webapp)
        
        if (webapp.initDataUnsafe?.user) {
          setUser(webapp.initDataUnsafe.user)
          setInitData(webapp.initData || '')
          // alert(`DEBUG: TMA User found: ${webapp.initDataUnsafe.user.id}`)
        } else {
          // alert("DEBUG: TMA WebApp detected, but NO user data found.")
        }
        
        setIsReady(true)
      }
    }

    // Attempt to initialize immediately if SDK is already loaded
    if ((window as any).Telegram?.WebApp) {
      initWebApp()
    } else {
      // Otherwise, poll for a short period
      const interval = setInterval(() => {
        if ((window as any).Telegram?.WebApp) {
          initWebApp()
          clearInterval(interval)
        }
      }, 100)
      
      const timeout = setTimeout(() => {
        clearInterval(interval)
        // If not in TMA environment, we still set ready to true so app can continue
        if (!isReady) setIsReady(true)
      }, 3000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [isReady])

  return {
    tg,
    user,
    initData,
    isReady,
    onClose: () => tg?.close(),
  }
}
