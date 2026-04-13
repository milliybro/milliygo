import { useEffect, useState } from 'react'

export const useTelegram = () => {
  const [tgData, setTgData] = useState<{ tg: any; user: any }>({ tg: null, user: null })

  useEffect(() => {
    const initTg = () => {
      // Oynada Telegram WebApp borligini tekshirish
      if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const webapp = window.Telegram.WebApp
        webapp.ready()
        webapp.expand()
        setTgData({
          tg: webapp,
          user: webapp.initDataUnsafe?.user,
        })
      }
    }

    // SDK yuklanishi uchun kichik kechikish bilan tekshirish
    if (window.Telegram?.WebApp) {
      initTg()
    } else {
      const timer = setTimeout(initTg, 500)
      return () => clearTimeout(timer)
    }
  }, [])

  return {
    tg: tgData.tg,
    user: tgData.user,
    onClose: () => tgData.tg?.close(),
  }
}