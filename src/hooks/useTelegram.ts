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
      const webapp = (window as any).Telegram?.WebApp
      
      if (webapp) {
        addLog("SDK topildi!")
        webapp.ready()
        webapp.expand()
        setTg(webapp)
        
        if (webapp.initDataUnsafe?.user) {
          addLog(`User ma'lumoti olindi: ${webapp.initDataUnsafe.user.id}`)
          setUser(webapp.initDataUnsafe.user)
          setInitData(webapp.initData || '')
        } else {
          addLog("User ma'lumoti topilmadi (InitDataUnsafe bo'sh).")
        }
        setIsReady(true)
      }
    }

    if ((window as any).Telegram?.WebApp) {
      initWebApp()
    } else {
      const interval = setInterval(() => {
        const webapp = (window as any).Telegram?.WebApp
        if (webapp) {
          initWebApp()
          clearInterval(interval)
        } else {
          addLog("SDK hali kutilyapti...")
        }
      }, 500)
      
      setTimeout(() => {
        clearInterval(interval)
        if (!isReady) {
          addLog("SDK kutish vaqti tugadi (Timeout 5s).")
          setIsReady(true)
        }
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [])

  return {
    tg,
    user,
    initData,
    isReady,
    logs,
    addLog,
    onClose: () => tg?.close(),
  }
}
