import { useCallback, useEffect, useRef } from 'react'

const IDLE_TIME = 1 * 60 * 1000

export function useIdleRefresh(onIdle: () => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      onIdle()
    }, IDLE_TIME)
  }, [onIdle])

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    startTimer()
    return stopTimer
  }, [startTimer, stopTimer])

  return {
    restartTimer: startTimer,
    stopTimer,
  }
}
