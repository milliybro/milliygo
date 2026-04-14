// src/hooks/useTelegram.ts
import { useEffect, useState } from 'react'

export const useTelegram = () => {
  const [user, setUser] = useState<any>(null)
  const [isReady, setIsReady] = useState(false)
  const [initData, setInitData] = useState<string>('')
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])
  }

  useEffect(() => {
    const checkTMA = () => {
      addLog("Oddiy window tekshiruvi...")

      // Siz aytgan usulda tekshiramiz:
      const tg = (window as any).Telegram?.WebApp

      if (tg) {
        addLog("window.Telegram.WebApp TOPILDI!")

        const userData = tg.initDataUnsafe?.user
        if (userData) {
          addLog(`Muvaffaqiyat! User ID: ${userData.id}`)
          setUser(userData)
          setInitData(tg.initData)
        } else {
          addLog("Xatolik: WebApp bor, lekin initDataUnsafe.user BO'SH")
          addLog(`Xom ma'lumot: ${JSON.stringify(tg.initDataUnsafe || {})}`)
        }
      } else {
        addLog("window.Telegram mavjud emas.")
      }

      setIsReady(true)
    }

    // Brauzer yuklanishi uchun biroz kutamiz
    if (document.readyState === 'complete') {
      checkTMA()
    } else {
      window.addEventListener('load', checkTMA)
      return () => window.removeEventListener('load', checkTMA)
    }
  }, [])

  return { user, initData, isReady, logs, addLog }
}
