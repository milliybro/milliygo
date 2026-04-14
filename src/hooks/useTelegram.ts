import { useEffect, useState } from 'react'
import WebApp from '@twa-dev/sdk'

export const useTelegram = () => {
  const [user, setUser] = useState<any>(null)
  const [isReady, setIsReady] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])
  }

  useEffect(() => {
    try {
      addLog("SDK yuklanmoqda (twa-dev/sdk)...")

      // WebApp ni tayyorlash
      WebApp.ready()
      WebApp.expand()
      WebApp.enableClosingConfirmation()

      const initData = WebApp.initDataUnsafe

      if (initData && initData.user) {
        addLog(`Foydalanuvchi ma'lumotlari olindi: ${initData.user.id}`)
        setUser(initData.user)
      } else {
        addLog("DIQQAT: Foydalanuvchi ma'lumoti yo'q (InitDataUnsafe bo'sh)")
      }

      setIsReady(true)
    } catch (err: any) {
      addLog(`SDK XATOLIGI: ${err.message}`)
      setIsReady(true) // Xato bo'lsa ham app davom etishi uchun
    }
  }, [])

  return {
    user,
    initData: WebApp.initData,
    isReady,
    logs,
    addLog,
    WebApp
  }
}
