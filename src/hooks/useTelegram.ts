import { useEffect, useState } from 'react'

export const useTelegram = () => {
  const [isReady, setIsReady] = useState(false)
  const [tg, setTg] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [initData, setInitData] = useState<string>('')
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])
  }

  useEffect(() => {
    addLog("SDK qidirish boshlandi...")

    const initWebApp = () => {
      if (typeof window === 'undefined') return

      const webapp = (window as any).Telegram?.WebApp

      if (webapp && webapp.initDataUnsafe?.user) {
        addLog("SDK va User topildi!")
        webapp.ready()
        webapp.expand()
        setTg(webapp)
        setUser(webapp.initDataUnsafe.user)
        setInitData(webapp.initData || '')
        setIsReady(true)
      } else if (webapp) {
        addLog("SDK bor, lekin foydalanuvchi ma'lumoti yo'q.")
        setTg(webapp)
        setIsReady(true)
      }
    }

    // Agarda SDK 3 soniya ichida topilmasa, tayyor deb hisoblab davom etamiz
    const timeout = setTimeout(() => {
      if (!isReady) {
        addLog("SDK kutish tugadi (Browser rejimida davom etiladi).")
        setIsReady(true)
      }
    }, 3000)

    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      initWebApp()
    } else {
      const interval = setInterval(() => {
        if ((window as any).Telegram?.WebApp?.initDataUnsafe?.user) {
          initWebApp()
          clearInterval(interval)
        }
      }, 500)
      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [isReady])

  return { tg, user, initData, isReady, logs, addLog, onClose: () => tg?.close() }
}
