import { Steps } from 'antd'
import { useTranslations } from 'next-intl'
import useStepParams from './hooks/use-step-params'

const steps = [
  { title: 'search-guest', step: 1 },
  { title: 'info', step: 2 },
  { title: 'add-info', step: 3 },
  { title: 'child-info', step: 4 },
]

const BookingSteps = () => {
  const { step } = useStepParams()
  const t = useTranslations()

  const items = steps.map((item) => ({
    key: item.title,
    title: t('my-properties.' + item.title),
    action: item.step,
  }))

  return <Steps current={step - 1} items={items} className="" />
}

export default BookingSteps
