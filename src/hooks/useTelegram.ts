import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Telegram: any
  }
}

export const useTelegram = () => {
  const [tg, setTg] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tgApp = window.Telegram.WebApp
      tgApp.ready()
      tgApp.expand()
      setTg(tgApp)
    }
  }, [])

  const onClose = () => {
    tg?.close()
  }

  const onToggleButton = () => {
    if (tg?.MainButton.isVisible) {
      tg?.MainButton.hide()
    } else {
      tg?.MainButton.show()
    }
  }

  return {
    onClose,
    onToggleButton,
    tg,
    user: tg?.initDataUnsafe?.user,
    queryId: tg?.initDataUnsafe?.query_id,
  }
}
