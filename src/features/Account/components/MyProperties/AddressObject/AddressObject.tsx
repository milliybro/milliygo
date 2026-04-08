import React, { useEffect, useState } from 'react'
import { Button, Flex, Progress, Typography } from 'antd'
import PageHeader from '@/features/Account/components/PageHeader'
import AddressFirstStep from '@/features/Account/components/MyProperties/AddressObject/AddressFirstStep'
import AddressSecondStep from '@/features/Account/components/MyProperties/AddressObject/AddressSecondStep'
import InfoIcon from '@/components/icons/info-icon'
import CloseIcon from '@/components/icons/close'
import { useTranslations } from 'next-intl'

function AddressObject({ form, setActiveTab, errors }: any) {
  const [progressPercents, setProgressPercents] = useState<number>(0)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const t = useTranslations()
  const [suggestions, setSuggestions] = useState([
    {
      visible: true,
      title: t('my-properties.suggest3-title'),
      description: [
        t('my-properties.suggest3-text1'),
        t('my-properties.suggest3-text2'),
        t('my-properties.suggest3-text3'),
        t('my-properties.suggest3-text4'),
        t('my-properties.suggest3-text5'),
      ],
    },
    {
      visible: true,
      title: t('my-properties.suggest4-title'),
      description: [t('my-properties.suggest4-text1')],
    },
  ])

  useEffect(() => {
    setProgressPercents((100 / 2) * currentStep)
  }, [currentStep])

  const steps = [
    {
      component: (
        <AddressFirstStep
          setCurrentStep={setCurrentStep}
          setActiveTab={setActiveTab}
          form={form}
          errors={errors}
        />
      ),
      title: t('my-properties.whereis-property'),
      description: t('my-properties.address-property-desc'),
      step: 1,
    },
    {
      component: (
        <AddressSecondStep
          setCurrentStep={setCurrentStep}
          form={form}
          setActiveTab={setActiveTab}
          errors={errors}
        />
      ),
      title: t('my-properties.location-property'),
      description: t('my-properties.location-property-desc'),
      step: 2,
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
          percent={progressPercents - 10}
          showInfo={false}
          strokeColor="#4DD282"
          strokeWidth={4}
        />

        <Flex vertical gap={24}>
          {steps[currentStep - 1].component}
        </Flex>
      </Flex>

      {currentStep === 1 && (
        <Flex vertical gap={24}>
          {suggestions.map(
            (val, index) =>
              val.visible &&
              currentStep === 1 && (
                <Flex key={val.title} className="bg-[#F8F8FA] rounded-2xl p-[16px]" vertical>
                  <Flex className="justify-between">
                    <InfoIcon className="text-[22px]" />
                    <Button
                      aria-label="close address object"
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
      )}
    </Flex>
  )
}

export default AddressObject
