import React, { useEffect, useState } from 'react'
import { Button, Flex, Progress, Typography } from 'antd'
import PageHeader from '@/features/Account/components/PageHeader'
import MainInformationFirst from '@/features/Account/components/MyProperties/MainInformation/MainInformationFirst'
import MainInformationSecond from '@/features/Account/components/MyProperties/MainInformation/MainInformationSecond'
import MainInformationFourth from '@/features/Account/components/MyProperties/MainInformation/MainInformationFourth'
import MainInformationThird from '@/features/Account/components/MyProperties/MainInformation/MainInformationThird'
import InfoIcon from '@/components/icons/info-icon'
import CloseIcon from '@/components/icons/close'
import { useTranslations } from 'next-intl'

function MainInformation({
  form,
  setActiveTab,
  errors,
  placement,
  typeId,
}: {
  form: any
  setActiveTab: any
  errors: any
  placement: any
  typeId?: string
}): React.ReactElement {
  const [progressPercents, setProgressPercents] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const t = useTranslations()
  const [suggestions, setSuggestions] = useState([
    {
      visible: true,
      title: t('my-properties.suggest5-title'),
      description: [t('my-properties.suggest5-text1')],
    },
  ])

  useEffect(() => {
    setProgressPercents((100 / 4) * currentStep)
  }, [currentStep])

  const steps = [
    {
      component: (
        <MainInformationFirst
          errors={errors}
          setActiveTab={setActiveTab}
          setCurrentStep={setCurrentStep}
          placement={placement}
          form={form}
          typeId={typeId}
        />
      ),
      title: t('my-properties.about-placement'),
      description: t('my-properties.about-placement-desc1'),
      step: 1,
    },
    {
      component: <MainInformationSecond setCurrentStep={setCurrentStep} form={form} />,
      title: t('my-properties.about-placement'),
      description: t('my-properties.about-placement-desc2'),
      step: 2,
    },
    {
      component: <MainInformationThird setCurrentStep={setCurrentStep} form={form} />,
      title: t('my-properties.about-placement'),
      description: t('my-properties.about-placement-desc3'),
      step: 3,
    },
    {
      component: (
        <MainInformationFourth
          setCurrentStep={setCurrentStep}
          form={form}
          errors={errors}
          setActiveTab={setActiveTab}
        />
      ),
      title: t('my-properties.about-placement'),
      description: t('my-properties.about-placement-desc3'),
      step: 4,
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
            val.visible &&
            currentStep === 4 && (
              <Flex key={val.title} className="bg-[#F8F8FA] rounded-2xl p-[16px]" vertical>
                <Flex className="justify-between">
                  <InfoIcon className="text-[22px]" />
                  <Button
                    aria-label="close main information"
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

export default MainInformation
