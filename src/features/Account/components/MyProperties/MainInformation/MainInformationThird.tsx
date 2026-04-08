/* eslint-disable no-unused-vars */
import { Button, Flex, Radio, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import type { ReactElement } from 'react'

export default function MainInformationThird({
  setCurrentStep,
  form,
}: {
  setCurrentStep: (step: number) => void
  form: any
}): ReactElement {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const t = useTranslations()
  return (
    <Flex vertical>
      <Flex vertical gap={24}>
        <Flex vertical gap={12}>
          <Typography.Text className="text-sm font-normal text-[#777E90]">
            {t('my-properties.breakfast')}
          </Typography.Text>
          <Radio.Group
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            onChange={(e) => {
              form.setValue('mainInformation.breakfast', e.target.value)
            }}
            defaultValue={form.getValues('mainInformation.breakfast')}
          >
            <Radio value={true}>{t('my-properties.yes')}</Radio>
            <Radio value={false}>{t('my-properties.no')}</Radio>
          </Radio.Group>
        </Flex>

        <Flex vertical gap={12}>
          <Typography.Text className="text-sm font-normal text-[#777E90]">
            {t('my-properties.parking')}
          </Typography.Text>

          <Radio.Group
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
            onChange={(e) => {
              form.setValue('mainInformation.parking', e.target.value)
            }}
            defaultValue={form.getValues('mainInformation.parking')}
          >
            <Radio value={1}>{t('my-properties.yes-free')}</Radio>
            <Radio value={2}>{t('my-properties.yes-paid')}</Radio>
            <Radio value={0}>{t('my-properties.no')}</Radio>
          </Radio.Group>
        </Flex>
      </Flex>

      <Flex className="mt-4">
        <div className="grid grid-cols-2 gap-8 w-full">
          <Button
            aria-label={t('my-properties.prev')}
            className="h-[58px] rounded-2xl shadow-none font-medium bg-secondary-light/10 text-primary-dark"
            onClick={() => {
              scrollToTop()
              setCurrentStep(2)
            }}
          >
            {t('my-properties.prev')}
          </Button>
          <Button
            aria-label={t('my-properties.next')}
            type="primary"
            onClick={() => {
              scrollToTop()
              setCurrentStep(4)
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
