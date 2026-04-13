import { useEffect, useState } from 'react'

export const useTelegram = () => {
  const [tg, setTg] = useState<any>(null)
  const [user, setUser] = useState<any>(null)
  const [initData, setInitData] = useState<string>('')

  useEffect(() => {
    // Oynada Telegram WebApp borligini tekshirish
    const webapp = (window as any).Telegram?.WebApp

    if (webapp) {
      webapp.ready()
      webapp.expand()
      setTg(webapp)
      setUser(webapp.initDataUnsafe?.user)
      setInitData(webapp.initData)
    }
  }, [])

  return {
    tg,
    user,
    initData,
    onClose: () => tg?.close(),
  }
}