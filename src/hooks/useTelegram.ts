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
      if (typeof window === 'undefined') return

      const tg = (window as any).Telegram?.WebApp
      let rawInitData = tg?.initData || ''
      let userData = tg?.initDataUnsafe?.user
      addLog("TO'LIQ URL: " + window.location.href)

      // 1. Agar redirect bo'lgan bo'lsa, ma'lumotlarni LocalStorage'dan tekshiramiz
      if (!userData) {
        const savedData = localStorage.getItem('tma_init_data')
        const savedUser = localStorage.getItem('tma_user')
        if (savedData && savedUser) {
          addLog("Ma'lumotlar LocalStorage'dan tiklandi.")
          rawInitData = savedData
          userData = JSON.parse(savedUser)
        }
      }

      if (tg && tg.initDataUnsafe?.user) {
        addLog("window.Telegram orqali yangi ma'lumot olindi.")
        // Ma'lumotlarni keyingi redirect uchun saqlab qo'yamiz
        localStorage.setItem('tma_init_data', tg.initData)
        localStorage.setItem('tma_user', JSON.stringify(tg.initDataUnsafe.user))

        userData = tg.initDataUnsafe.user
        rawInitData = tg.initData
      }

      if (userData) {
        addLog(`User aniqlangan: ${userData.id}`)
        setUser(userData)
        setInitData(rawInitData)
      } else {
        addLog("Hech qanday ma'lumot topilmadi (Storage ham bo'sh).")
      }

      setIsReady(true)
    }

    checkTMA()
  }, [])

  return { user, initData, isReady, logs, addLog }
}
