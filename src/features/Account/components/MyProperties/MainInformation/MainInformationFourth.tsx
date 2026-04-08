/* eslint-disable no-unused-vars */
import { getProhibitions } from '@/features/Account/api'
import { Button, Flex, Radio, Select, Spin, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useEffect, useState, type ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function MainInformationFourth({
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
  const { data: prohibitions, isLoading: isLoadingProhibitions } = useQuery({
    queryKey: ['prohibitions'],
    queryFn: () => getProhibitions(),
    refetchOnWindowFocus: false,
    select: (data) => data.results,
  })
  const [hoursArray, setHoursArray] = useState([]) as any

  useEffect(() => {
    for (let i = 0; i < 24; i++) {
      const hour = (i < 10 ? '0' : '') + i + ':00'

      setHoursArray((prev: any) => [...prev, { value: `${hour}:00`, label: hour }])
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const t = useTranslations()

  const prohibitionsHandleChange = (name: string, id: number, value: boolean) => {
    if (form.getValues(name).includes(id)) {
      form.setValue(
        name,
        form.getValues(name).filter((item: number) => item !== id)
      )
    } else {
      form.setValue(name, [...form.getValues(name), id])
    }
  }

  return (
    <Flex vertical>
      <Spin size="large" spinning={isLoadingProhibitions}>
        <Flex vertical gap={24}>
          {prohibitions?.map((prohibition: any) => (
            <Flex key={prohibition.id} vertical gap={12}>
              <Typography.Text>{prohibition.name}</Typography.Text>
              <Radio.Group
                onChange={(e) => {
                  prohibitionsHandleChange(
                    'mainInformation.prohibitions',
                    prohibition.id,
                    e.target.value
                  )
                }}
                value={form.watch(`mainInformation.prohibitions`)?.includes(prohibition.id)}
                defaultValue={false}
              >
                <Radio value={true}>{t('my-properties.yes')}</Radio>
                <Radio value={false}>{t('my-properties.no')}</Radio>
              </Radio.Group>
            </Flex>
          ))}

          <Flex gap={24}>
            <Flex vertical gap={12} className="w-full">
              <Typography.Text>{t('my-properties.check-in-from')}</Typography.Text>

              <Select
                placeholder={t('my-properties.select-time')}
                onChange={(value) => {
                  form.setValue('mainInformation.checkInFrom', value)
                }}
                value={form.watch('mainInformation.checkInFrom')}
                options={hoursArray}
                className={`h-[53px] w-full rounded-2xl !bg-[#F8F8FA] !text-primary-dark ${
                  errors?.['mainInformation.checkInFrom']
                    ? 'border-2 border-solid border-[#FF4D4F]'
                    : 'border-none'
                } custom-select-antd`}
              />
            </Flex>

            <Flex vertical gap={12} className="w-full">
              <Typography.Text>{t('my-properties.check-in-to')}</Typography.Text>

              <Select
                placeholder={t('my-properties.select-time')}
                className={`h-[53px] w-full rounded-2xl !bg-[#F8F8FA] !text-primary-dark ${
                  errors?.['mainInformation.checkInTo']
                    ? 'border-2 border-solid border-[#FF4D4F]'
                    : 'border-none'
                } custom-select-antd`}
                onChange={(value) => {
                  form.setValue('mainInformation.checkInTo', value)
                }}
                value={form.watch('mainInformation.checkInTo')}
                options={hoursArray}
              />
            </Flex>
          </Flex>

          <Flex gap={24}>
            <Flex vertical gap={12} className="w-full">
              <Typography.Text>{t('my-properties.check-out-from')}</Typography.Text>

              <Select
                placeholder={t('my-properties.select-time')}
                className={`h-[53px] w-full rounded-2xl !bg-[#F8F8FA] !text-primary-dark ${
                  errors?.['mainInformation.checkOutFrom']
                    ? 'border-2 border-solid border-[#FF4D4F]'
                    : 'border-none'
                } custom-select-antd`}
                onChange={(value) => {
                  form.setValue('mainInformation.checkOutFrom', value)
                }}
                value={form.watch('mainInformation.checkOutFrom')}
                options={hoursArray}
              />
            </Flex>
            <Flex vertical gap={12} className="w-full">
              <Typography.Text>{t('my-properties.check-out-to')}</Typography.Text>

              <Select
                placeholder={t('my-properties.select-time')}
                className={`h-[53px] w-full rounded-2xl !bg-[#F8F8FA] !text-primary-dark ${
                  errors?.['mainInformation.checkOutTo']
                    ? 'border-2 border-solid border-[#FF4D4F]'
                    : 'border-none'
                } custom-select-antd`}
                onChange={(value) => {
                  form.setValue('mainInformation.checkOutTo', value)
                }}
                value={form.watch('mainInformation.checkOutTo')}
                options={hoursArray}
              />
            </Flex>
          </Flex>
        </Flex>
      </Spin>

      <Flex className="mt-4">
        <div className="grid w-full grid-cols-2 gap-8">
          <Button
            aria-label={t('my-properties.prev')}
            className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
            onClick={() => {
              scrollToTop()
              setCurrentStep(3)
            }}
          >
            {t('my-properties.prev')}
          </Button>
          <Button
            aria-label={t('my-properties.next')}
            type="primary"
            onClick={() => {
              scrollToTop()
              setActiveTab('images')
            }}
            className="h-[58px] rounded-2xl bg-[#3276FF] shadow-none hover:!bg-[#3276FF]/70"
          >
            {t('my-properties.next')}
          </Button>
        </div>
      </Flex>
    </Flex>
  )
}
