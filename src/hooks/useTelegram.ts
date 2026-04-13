import { useEffect, useState } from 'react'

export const useTelegram = () => {
  const [tg, setTg] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [initData, setInitData] = useState<string>('')

  useEffect(() => {
    const initWebApp = () => {
      const webapp = (window as any).Telegram?.WebApp
      
      if (webapp && webapp.initDataUnsafe?.user) {
        webapp.ready()
        webapp.expand()
        setTg(webapp)
        setUser(webapp.initDataUnsafe.user)
        setInitData(webapp.initData)
      }
    }

    // 1. Agar SDK allaqachon yuklangan bo'lsa
    if ((window as any).Telegram?.WebApp) {
      initWebApp()
    } else {
      // 2. Agar SDK kechikayotgan bo'lsa (interval bilan tekshirish)
      const interval = setInterval(() => {
        if ((window as any).Telegram?.WebApp) {
          initWebApp()
          clearInterval(interval)
        }
      }, 100)
      
      // 2 soniyadan keyin tekshirishni to'xtatish
      setTimeout(() => clearInterval(interval), 2000)
      
      return () => clearInterval(interval)
    }
  }, [])

  return {
    tg,
    user,
    initData,
    onClose: () => tg?.close(),
  }
}
