/* eslint-disable no-unused-vars */
import { ReactElement, useState } from 'react'
import { Button, Flex, Select } from 'antd'
import YandexMap from '@/features/Account/components/MyProperties/AddressObject/maps/yandex-map'
import { useTranslations } from 'next-intl'

export default function AddressSecondStep({
  setCurrentStep,
  form,
  setActiveTab,
  errors,
}: {
  setCurrentStep: (step: number) => void
  form: any
  setActiveTab: (tab: string) => void
  errors: any
}): ReactElement {
  const [selectedMapType, setSelectedMapType] = useState<string>('yandex')
  const t = useTranslations()
  const maps = [
    {
      id: 'yandex',
      component: <YandexMap form={form} />,
    },
  ]

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Flex vertical gap={24}>
      <Flex vertical gap={24}>
        {/* <Select
          className="!text-primary-dark w-full h-[53px] !bg-[#F8F8FA] rounded-2xl border-none custom-select-antd"
          options={[
            {
              label: 'Yandex',
              value: 'yandex',
            },
          ]}
          value={selectedMapType}
          onChange={(value) => {
            setSelectedMapType(value)
          }}
        /> */}

        <Flex className="h-[450px]">
          {maps.find((val) => val.id === selectedMapType)?.component}
        </Flex>
      </Flex>

      <Flex>
        <div className="grid grid-cols-2 gap-8 w-full">
          <Button
            aria-label={t('my-properties.prev')}
            className="h-[58px] rounded-2xl shadow-none font-medium bg-secondary-light/10 text-primary-dark"
            onClick={() => setCurrentStep(1)}
          >
            {t('my-properties.prev')}
          </Button>
          <Button
            aria-label={t('my-properties.next')}
            type="primary"
            onClick={() => {
              scrollToTop()
              setActiveTab('main-information')
            }}
            className="h-[58px] bg-[#3276FF] hover:!bg-[#3276FF]/70 rounded-2xl shadow-none"
          >
            {t('my-properties.next')}
          </Button>
        </div>
      </Flex>
    </Flex>
  )
}
