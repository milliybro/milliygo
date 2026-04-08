import React, { useEffect, useState } from 'react'
import { Button, Flex, Progress, Typography } from 'antd'
import PageHeader from '@/features/Account/components/PageHeader'
import DetailedThirdStep from '@/features/Account/components/MyProperties/DetailedObjects/DetailedThirdStep'
import InfoIcon from '@/components/icons/info-icon'
import CloseIcon from '@/components/icons/close'
import { useTranslations } from 'next-intl'

function DetailedObject({
  form,
  setActiveTab,
  errors,
}: {
  form: any
  setActiveTab: any
  errors: any
}) {
  const [progressPercents, setProgressPercents] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const t = useTranslations()

  const [suggestions, setSuggestions] = useState([
    {
      visible: true,
      title: t('my-properties.suggest1-title'),
      description: [
        t('my-properties.suggest1-text1'),
        t('my-properties.suggest1-text2'),
        t('my-properties.suggest1-text3'),
      ],
    },
    {
      visible: true,
      title: t('my-properties.suggest2-title'),
      description: [t('my-properties.suggest2-text1')],
    },
  ])

  useEffect(() => {
    setCurrentStep(1)
  }, [])

  useEffect(() => {
    setProgressPercents((100 / 1) * currentStep)
  }, [currentStep])

  const steps = [
    {
      component: <DetailedThirdStep form={form} setActiveTab={setActiveTab} errors={errors} />,
      title: t('my-properties.detail-object'),
      description: t('my-properties.howcalls-property'),
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
    <Flex className={`grid grid-cols-[2fr_1fr]`} gap={24}>
      <Flex vertical gap={24}>
        <PageHeader
          title={steps[currentStep - 1].title}
          description={steps[currentStep - 1].description}
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
                    aria-label="close detailed object"
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

export default DetailedObject
