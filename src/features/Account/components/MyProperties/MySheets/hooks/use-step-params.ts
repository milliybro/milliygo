import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface UseStepParamsOptions {
  onFirstStepNext?: () => Promise<boolean> | boolean
}

const useStepParams = ({ onFirstStepNext }: UseStepParamsOptions = {}) => {
  const router = useRouter()
  const { query } = router

  const rawStep = query.step as string | undefined
  const [step, setStep] = useState(1)

  useEffect(() => {
    setStep(rawStep ? Number(rawStep) : 1)
  }, [rawStep])

  const updateStep = (newStep: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, step: String(newStep) },
    })
  }

  const prev = () => updateStep(step === 1 ? step : step - 1)

  const next = async () => {
    if (step === 1 && onFirstStepNext) {
      const canGo = await onFirstStepNext()
      if (!canGo) return
    }
    updateStep(step + 1)
  }

  const goTo = (newStep: number) => updateStep(newStep)

  return { step, setStep, prev, next, goTo }
}

export default useStepParams
