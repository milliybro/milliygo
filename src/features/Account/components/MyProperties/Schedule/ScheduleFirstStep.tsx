/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  InputNumber,
  Select,
  Slider,
  Typography,
} from 'antd'
import SuccessIcon from '@/components/icons/success-icon'
import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import { formatNumber } from '@/helpers/number-formatter'
import { useQuery } from '@tanstack/react-query'
import { getPaymentTypes } from '@/features/Account/api'
import { useTranslations } from 'next-intl'
import { getCurrencies } from '@/api'
import { getMinMaxPrice, getPlacementTypes } from '../api'
import { useRouter } from 'next/router'
import DiscountHotelInput from './discountHotel'

const formatter = (value?: number | [number, number] | undefined): React.ReactNode => {
  if (typeof value === 'number') {
    return `${formatNumber(value)} UZS`
  } else if (Array.isArray(value)) {
    return [`${formatNumber(value[0])} UZS`, `${formatNumber(value[1])} UZS`]
  }
  return ''
}

function ScheduleFirstStep({
  setCurrentStep,
  setActiveTab,
  form,
  errors,
  currencies,
  placementInfo,
}: {
  setCurrentStep: (step: number) => void
  setActiveTab: (tab: string) => void
  form: any
  errors: any
  currencies: any
  placementInfo: any
}): React.ReactElement {
  const { query } = useRouter()

  const { data: placementTypes } = useQuery({
    queryKey: ['placementTypes'],
    queryFn: () => getPlacementTypes(),
    refetchOnWindowFocus: false,
    select: (data: any) => data?.results,
  })
  const [discount, setDiscount] = useState<number>(0) // Store the discount value in state

  const selectedKey = placementTypes?.find((type: any) => type.id === Number(query.type))?.key

  const {
    data: minMaxPrice,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['min-max-price', selectedKey], // selectedKey'ni queryKey'ga qo'shamiz
    queryFn: async () => {
      if (!selectedKey) return null // Agar selectedKey mavjud bo'lmasa, null qaytariladi
      const res = await getMinMaxPrice(selectedKey) // selectedKey ni argument sifatida yuboriladi
      return res
    },
    enabled: !!selectedKey, // selectedKey mavjud bo'lganda so'rov bajariladi
    refetchOnWindowFocus: false,
  })

  const min = minMaxPrice?.min_price ?? 10000 // Fallback to 10000 if undefined
  const max = minMaxPrice?.max_price ?? 99000 // Fallback to 99000 if undefined
  const nalog = 0.1

  const { data: paymentTypesData = [] } = useQuery({
    queryKey: ['paymentTypes'],
    queryFn: () => getPaymentTypes(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data) => data.results.map((item: any) => ({ label: item.name, value: item.id })),
  })

  const handleChange = (value: any) => {
    form.setValue('schedule.paymentTypes', value)
  }

  const handleChangeCurrency = (value: any) => {
    form.setValue('schedule.currency', value)
  }

  const t = useTranslations()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Flex vertical gap={24} className="mb-4">
      {query?.type === '1' || placementInfo?.type_id === 1 ? (
        <div>
          <Typography className="text-[#777E90]">{t('hotels.competitive')}</Typography>

          <Slider
            range
            value={[
              min,
              form.watch('schedule.price') === undefined
                ? (min + max) / 2
                : form.watch('schedule.price'),
              max,
            ]}
            onChange={(e) => {
              form.setValue('schedule.price', e[1])
            }}
            min={min}
            max={max}
            tooltip={{ open: true, formatter }}
            styles={{
              track: {
                background: 'transparent',
              },
              tracks: {
                background: `linear-gradient(90deg, #4DD282 2.86%, #FFC107 51.79%, #FF4E4E 100.71%)`,
              },
            }}
          />
        </div>
      ) : null}

      <Typography className="text-lg font-semibold">
        {t('my-properties.price-for-guests')}
      </Typography>

      <Typography className="text-[#777E90]">{t('my-properties.price-for-guests-desc')}</Typography>

      <Flex className="grid grid-cols-[5fr_1fr]">
        <Input
          className={`h-[53px] w-full rounded-2xl rounded-r-none !bg-[#F8F8FA] px-4 !text-primary-dark ${
            errors?.['schedule.price'] ? 'border-[#FF4D4F]' : 'border-none'
          }`}
          value={form.watch('schedule.price')}
          onChange={(e) => {
            form.setValue('schedule.price', e.target.value)
          }}
          placeholder={t('my-properties.price-for-guests-placeholder')}
          type="number"
          inputMode="numeric"
        />

        <Select
          size="middle"
          placeholder={t('my-properties.payment-types')}
          className={`h-[53px] w-full rounded-2xl rounded-l-none !bg-[#F8F8FA] !text-primary-dark ${
            errors?.['schedule.paymentTypes']
              ? 'border-2 border-solid border-[#FF4D4F]'
              : 'border-none'
          } custom-select-antd`}
          defaultValue={currencies.find((item: any) => item.value === 1)}
          onChange={handleChangeCurrency}
          style={{ width: '100%' }}
          options={currencies}
        />
      </Flex>

      <Typography className="text-[#777E90]">
        {t('my-properties.price-for-guests-desc-2')}
      </Typography>

      <Flex vertical className="gap-[16px]">
        <Flex className="flex items-center gap-[8px]">
          <SuccessIcon className="text-[#4DD282]" />
          <Typography className="text-[#777E90]">
            {t('my-properties.price-for-guests-desc-3')}
          </Typography>
        </Flex>

        <Flex className="flex items-center gap-[8px]">
          <SuccessIcon className="text-[#4DD282]" />
          <Typography className="text-[#777E90]">
            {t('my-properties.price-for-guests-desc-4')}
          </Typography>
        </Flex>

        <Flex className="flex items-center gap-[8px]">
          <SuccessIcon className="text-[#4DD282]" />
          <Typography className="text-[#777E90]">
            {t('my-properties.price-for-guests-desc-5')}
          </Typography>
        </Flex>
      </Flex>

      <Divider className="m-0" />

      <Flex className="items-center gap-[16px]">
        <Typography className="text-lg font-semibold">
          {form.watch('schedule.price')
            ? formatNumber(
                Math.round(form.watch('schedule.price') - form.watch('schedule.price') * nalog)
              )
            : 0}{' '}
          {currencies.find((item: any) => item.value === form.watch('schedule.currency'))?.label}
        </Typography>

        <Typography className="text-[#777E90]">
          {t('my-properties.price-for-guests-desc-6')}
        </Typography>
      </Flex>

      <Flex vertical gap={16} className="rounded-2xl border border-[#B7BFD54D] p-[16px]">
        <Typography className="text-lg font-semibold">
          {t('my-properties.discounted-price')}
        </Typography>

        <Checkbox
          onChange={(e) => {
            form.setValue('schedule.isDiscounted', e.target.checked)
          }}
          checked={form.watch('schedule.isDiscounted')}
        >
          {t('my-properties.discounted-price-desc')}
        </Checkbox>
        <span className="inline-block">
          {t('my-properties.discount')}
          <DiscountHotelInput
            className="mx-1"
            discount={discount}
            setDiscount={setDiscount}
            form={form}
          />{' '}
          - {t('my-properties.discounted-price-desc-2')}
        </span>
        {/* <Button type="link" className="w-max p-0 flex items-center">
          {t('my-properties.more')}
          <ArrowRightUp className='text-xs' />
        </Button> */}

        <Divider className="m-0" />

        <Flex gap={8} className="items-center">
          {form.watch('schedule.isDiscounted') && (
            <Typography className="notranslate text-base font-medium text-[#777E90] line-through">
              {form.watch('schedule.price')
                ? formatNumber(Math.round(form.watch('schedule.price')))
                : 0}{' '}
              {
                currencies.find((item: any) => item.value === form.watch('schedule.currency'))
                  ?.label
              }
            </Typography>
          )}
          <Typography className="notranslate text-lg font-semibold text-[#232E40]">
            {form.watch('schedule.isDiscounted')
              ? form.watch('schedule.price')
                ? formatNumber(
                    Math.round(
                      form.watch('schedule.price') - form.watch('schedule.price') * (discount / 100)
                    )
                  )
                : 0
              : form.watch('schedule.price')
                ? formatNumber(Math.round(form.watch('schedule.price')))
                : 0}{' '}
            {currencies.find((item: any) => item.value === form.watch('schedule.currency'))?.label}
          </Typography>
          <Typography className="text-base font-medium text-[#232E40]">
            ({t('preferences.night')})
          </Typography>
        </Flex>
      </Flex>

      <Typography className="text-lg font-semibold">
        {t('my-properties.payment-types-we-have')}
      </Typography>

      <Flex>
        <Select
          mode="multiple"
          size="large"
          placeholder={t('my-properties.payment-types')}
          className={`w-full rounded-2xl !bg-[#F8F8FA] !text-primary-dark ${
            errors?.['schedule.paymentTypes']
              ? 'border-2 border-solid border-[#FF4D4F]'
              : 'border-none'
          } custom-select-antd`}
          defaultValue={form.watch('schedule.paymentTypes')}
          onChange={handleChange}
          style={{ width: '100%' }}
          options={paymentTypesData}
        />
      </Flex>

      <Flex vertical gap={24}>
        <Flex vertical>
          <Flex className="mt-4">
            <div className="grid w-full grid-cols-2 gap-8">
              <Button
                aria-label={t('my-properties.prev')}
                className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
                onClick={() => {
                  scrollToTop()
                  setActiveTab('images')
                }}
              >
                {t('my-properties.prev')}
              </Button>
              <Button
                aria-label={t('my-properties.next')}
                type="primary"
                className="h-[58px] rounded-2xl bg-[#3276FF] shadow-none hover:!bg-[#3276FF]/70"
                onClick={() => {
                  scrollToTop()
                  setCurrentStep(2)
                }}
              >
                {t('my-properties.next')}
              </Button>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ScheduleFirstStep
