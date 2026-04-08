/* eslint-disable no-unused-vars */
import MeterSquareIcon from '@/components/icons/meter-square-icon'
import { Button, Flex, Input, InputNumber, Radio, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import type { ReactElement } from 'react'

export default function MainInformationFirst({
  setCurrentStep,
  setActiveTab,
  form,
  errors,
  placement,
  typeId,
}: {
  setCurrentStep: (step: number) => void
  setActiveTab: (tab: string) => void
  form: any
  errors: any
  placement: any
  typeId?: string
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
          <Typography.Text>{t('my-properties.how-many-rooms')}</Typography.Text>

          <InputNumber
            value={form.watch('mainInformation.bedroom') || 1}
            onChange={(e) => form.setValue('mainInformation.bedroom', e)}
            className={`!text-primary-dark w-full h-[53px] !bg-[#F8F8FA] rounded-2xl px-4 ${errors?.['mainInformation.bedroom'] ? 'border-[#FF4D4F]' : 'border-none'}`}
            min={1}
            defaultValue={1}
          />
        </Flex>

        {(typeId === '1' || placement.type_id === 1) && (
          <Flex vertical gap={12}>
            <Typography.Text>{t('my-properties.what-floor')}</Typography.Text>

            <InputNumber
              value={form.watch('mainInformation.room_floor') || 1}
              onChange={(e) => form.setValue('mainInformation.room_floor', e)}
              className={`!text-primary-dark w-full h-[53px] !bg-[#F8F8FA] rounded-2xl px-4 ${errors?.['mainInformation.room_floor'] ? 'border-[#FF4D4F]' : 'border-none'}`}
              min={1}
              defaultValue={1}
            />
          </Flex>
        )}

        {(typeId === '1' || placement.type_id === 1) && (
          <Flex vertical gap={12}>
            <Typography.Text>{t('my-properties.how-many-floors')}</Typography.Text>

            <InputNumber
              value={form.watch('mainInformation.floor_count') || 1}
              onChange={(e) => form.setValue('mainInformation.floor_count', e)}
              className={`!text-primary-dark w-full h-[53px] !bg-[#F8F8FA] rounded-2xl px-4 ${errors?.['mainInformation.floor_count'] ? 'border-[#FF4D4F]' : 'border-none'}`}
              min={1}
              defaultValue={1}
            />
          </Flex>
        )}

        <Flex vertical gap={12}>
          <Typography.Text>{t('my-properties.how-many-bathrooms')}</Typography.Text>

          <InputNumber
            value={form.watch('mainInformation.bathroom') || 1}
            onChange={(e) => form.setValue('mainInformation.bathroom', e)}
            className={`!text-primary-dark w-full h-[53px] !bg-[#F8F8FA] rounded-2xl px-4 ${errors?.['mainInformation.bathroom'] ? 'border-[#FF4D4F]' : 'border-none'}`}
            min={1}
            defaultValue={1}
          />
        </Flex>

        <Flex vertical gap={12}>
          <Typography.Text>{t('my-properties.how-many-people')}</Typography.Text>

          <InputNumber
            value={form.watch('mainInformation.person_count') || 1}
            onChange={(e) => form.setValue('mainInformation.person_count', e)}
            className={`!text-primary-dark w-full h-[53px] !bg-[#F8F8FA] rounded-2xl px-4 ${errors?.['mainInformation.person_count'] ? 'border-[#FF4D4F]' : 'border-none'}`}
            min={1}
            defaultValue={1}
          />
        </Flex>

        <Flex vertical gap={12}>
          <Typography.Text>{t('my-properties.stay-with-children')}</Typography.Text>
          <Radio.Group
            onChange={(e) => form.setValue('mainInformation.stayWithChildren', e.target.value)}
            value={form.watch('mainInformation.stayWithChildren') || false}
          >
            <Radio value={true}>{t('my-properties.yes')}</Radio>
            <Radio value={false}>{t('my-properties.no')}</Radio>
          </Radio.Group>
        </Flex>

        <Flex vertical gap={12}>
          <Typography.Text>{t('my-properties.provide-kid-cots')}</Typography.Text>

          <Radio.Group
            onChange={(e) => form.setValue('mainInformation.provideKidCots', e.target.value)}
            value={form.watch('mainInformation.provideKidCots') || false}
          >
            <Radio value={true}>{t('my-properties.yes')}</Radio>
            <Radio value={false}>{t('my-properties.no')}</Radio>
          </Radio.Group>
        </Flex>

        <Flex vertical gap={12}>
          <Typography.Text>{t('my-properties.area')}</Typography.Text>
          <Input
            onChange={(e) => form.setValue('mainInformation.area', e.target.value)}
            value={form.watch('mainInformation.area') || ''}
            suffix={<MeterSquareIcon className="text-2xl" />}
            className={`!text-primary-dark w-full h-[53px] !bg-[#F8F8FA] rounded-2xl px-4 ${errors?.['mainInformation.area'] ? 'border-[#FF4D4F]' : 'border-none'}`}
            min={1}
            defaultValue={1}
          />
        </Flex>
      </Flex>

      <Flex className="mt-4">
        <div className="grid grid-cols-2 gap-8 w-full">
          <Button
            aria-label={t('my-properties.prev')}
            className="h-[58px] rounded-2xl shadow-none font-medium bg-secondary-light/10 text-primary-dark"
            onClick={() => setActiveTab('address-object')}
          >
            {t('my-properties.prev')}
          </Button>
          <Button
            aria-label={t('my-properties.next')}
            type="primary"
            onClick={() => {
              scrollToTop()
              setCurrentStep(2)
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
