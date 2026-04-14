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
    // SDK ni faqat useEffect ichida (brauzerda) yuklaymiz
    const initTMA = async () => {
      try {
        addLog("SDK yuklanmoqda (twa-dev/sdk)...")
        const WebApp = (await import('@twa-dev/sdk')).default

        WebApp.ready()
        WebApp.expand()
        WebApp.enableClosingConfirmation()

        const data = WebApp.initDataUnsafe

        if (data && data.user) {
          addLog(`Foydalanuvchi aniqlandi: ${data.user.id}`)
          setUser(data.user)
          setInitData(WebApp.initData)
        } else {
          addLog("Foydalanuvchi ma'lumoti yo'q.")
        }
        setIsReady(true)
      } catch (err: any) {
        addLog(`SDK Xatoligi: ${err.message}`)
        setIsReady(true)
      }
    }

    initTMA()
  }, [])

  return { user, initData, isReady, logs, addLog }
}
