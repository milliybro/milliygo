import React, { useEffect, useState } from 'react'
import { Button, Flex, Progress, Typography } from 'antd'
import PageHeader from '@/features/Account/components/PageHeader'
import InfoIcon from '@/components/icons/info-icon'
import CloseIcon from '@/components/icons/close'
import ScheduleFirstStep from '@/features/Account/components/MyProperties/Schedule/ScheduleFirstStep'
import ScheduleSecondStep from '@/features/Account/components/MyProperties/Schedule/ScheduleSecondStep'
import ScheduleThirdStep from '@/features/Account/components/MyProperties/Schedule/ScheduleThirdStep'
import { useTranslations } from 'next-intl'

function Schedule({ form, setActiveTab, errors, currencies, placementInfo }: any) {
  const t = useTranslations()
  const [progressPercents, setProgressPercents] = useState<number>(20)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [suggestions, setSuggestions] = useState([
    {
      visible: true,
      title: t('my-properties.suggest7-title'),
      description: [t('my-properties.suggest7-text1')],
    },
  ])

  useEffect(() => {
    setProgressPercents((100 / 3) * currentStep)
  }, [currentStep])

  const steps = [
    {
      component: (
        <ScheduleFirstStep
          errors={errors}
          setCurrentStep={setCurrentStep}
          form={form}
          currencies={currencies}
          setActiveTab={setActiveTab}
          placementInfo={placementInfo}
        />
      ),
      step: 1,
    },
    {
      component: (
        <ScheduleSecondStep setCurrentStep={setCurrentStep} form={form} currencies={currencies} />
      ),
      step: 2,
    },
    {
      component: (
        <ScheduleThirdStep
          setCurrentStep={setCurrentStep}
          form={form}
          setActiveTab={setActiveTab}
        />
      ),
      step: 3,
    },
  ]

  const handleClose = (index: number) => {
    setSuggestions((prevSuggestions) => {
      const updatedSuggestions = [...prevSuggestions]
      updatedSuggestions[index].visible = false
      return updatedSuggestions
    })
  }

  return (
    <Flex className="grid grid-cols-[2fr_1fr]" gap={24}>
      <Flex vertical gap={24}>
        <PageHeader
          title={t('my-properties.prices-and-calendar')}
          description={t('my-properties.prices-and-calendar-desc')}
        />
        <Progress
          percent={progressPercents}
          showInfo={false}
          strokeColor="#4DD282"
          strokeWidth={4}
        />
        <Flex vertical gap={24}>
          {steps[currentStep - 1].component}
        </Flex>
      </Flex>

      <Flex vertical gap={24}>
        {suggestions.map(
          (val, index) =>
            val.visible && (
              <Flex key={val.title} className="bg-[#F8F8FA] rounded-2xl p-[16px]" vertical>
                <Flex className="justify-between">
                  <InfoIcon className="text-[22px]" />
                  <Button
                    aria-label="close schedule"
                    type="text"
                    onClick={() => handleClose(index)}
                  >
                    <CloseIcon className="text-sm" />
                  </Button>
                </Flex>

                <Flex vertical>
                  <Typography.Title level={5}>{val.title}</Typography.Title>

                  {val.description.map((desc) => (
                    <Typography.Text key={desc}>{desc}</Typography.Text>
                  ))}
                </Flex>
              </Flex>
            )
        )}
      </Flex>
    </Flex>
  )
}

export default Schedule
