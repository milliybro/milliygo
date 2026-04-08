/* eslint-disable no-unused-vars */
import { getListCities, getListCountries, getListDistricts } from '@/features/Account/api'
import { capitalizeFirstLetters } from '@/helpers/capitalize-first-letters'
import { Button, Flex, Input, Select, Typography } from 'antd'
import { getCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import { ReactElement, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function AddressFirstStep({
  setCurrentStep,
  setActiveTab,
  form,
  errors,
}: {
  setCurrentStep: (step: number) => void
  setActiveTab: (tab: string) => void
  form: any
  errors: any
}): ReactElement {
  const t = useTranslations()
  const [search, setSearch] = useState('')

  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    const dataUser = JSON.parse((getCookie('userInfo') as string) || '{}')
    setUserInfo(dataUser)
  }, [])

  const { data: cities, isFetching: isCitiesFetching } = useQuery({
    queryKey: ['cities', form.watch('address.country')],
    queryFn: async () => {
      const res = await getListCities(form.watch('address.country') || '')
      return res
    },
    refetchOnWindowFocus: false,
    select: (data) =>
      data.results.map((city: { name: string; id: string }) => ({
        value: city.id,
        label: city.name,
      })),
    enabled: true,
  })

  const { data: districts, isFetching: isDistrictsFetching } = useQuery({
    queryKey: ['districts', form.watch('address.city')],
    queryFn: async () => {
      const res = await getListDistricts(form.watch('address.city') || '')
      return res
    },
    refetchOnWindowFocus: false,
    select: (data) =>
      data.results.map((district: { name: string; id: string }) => ({
        value: district.id,
        label: district.name,
      })),
    enabled: Boolean(form.watch('address.city')),
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Flex vertical>
      <Flex vertical gap={24}>
        {/* <Flex vertical gap={12}>
          <Typography.Text>{t('my-properties.country/ter')}</Typography.Text>
          <Select
            showSearch
            loading={isCountryLoading}
            value={form.watch('address.country') || undefined}
            placeholder={t('my-properties.select-country')}
            optionFilterProp="label"
            className={`!text-primary-dark w-full h-[53px] !bg-[#F8F8FA] rounded-2xl ${
              errors?.['address.country'] ? 'border-solid border-2 border-[#FF4D4F]' : 'border-none'
            } custom-select-antd`}
            onChange={(e) => {
              form.setValue('address.country', e)
              form.setValue('address.city', undefined)
              form.setValue('address.district', undefined)
            }}
            onSearch={setSearch}
            searchValue={search}
            filterOption={false}
            options={countries}
          />
        </Flex> */}

        <Flex vertical gap={12}>
          <Typography.Text>{t('my-properties.district')}</Typography.Text>
          <Select
            allowClear
            showSearch
            value={form.watch('address.city') || undefined}
            loading={isCitiesFetching}
            placeholder={t('my-properties.select-city')}
            optionFilterProp="children"
            className={`h-[53px] w-full rounded-2xl !bg-[#F8F8FA] !text-primary-dark ${
              errors?.['address.city'] ? 'border-2 border-solid border-[#FF4D4F]' : 'border-none'
            } custom-select-antd`}
            onChange={(e) => {
              form.setValue('address.city', e)
              form.setValue('address.district', undefined)
            }}
            filterOption={(input, option) => {
              const label = option?.label
              return typeof label === 'string' && label.toLowerCase().includes(input.toLowerCase())
            }}
            options={cities}
          />
        </Flex>

        <Flex vertical gap={12}>
          <Typography.Text>{t('my-properties.city')}</Typography.Text>

          <Select
            allowClear
            showSearch
            value={form.watch('address.district') || undefined}
            loading={isDistrictsFetching}
            placeholder={t('my-properties.select-district')}
            optionFilterProp="children"
            className={`h-[53px] w-full rounded-2xl !bg-[#F8F8FA] !text-primary-dark ${
              errors?.['address.district']
                ? 'border-2 border-solid border-[#FF4D4F]'
                : 'border-none'
            } custom-select-antd`}
            onChange={(e) => {
              form.setValue('address.district', e)
            }}
            options={districts}
            filterOption={(input, option) => {
              const label = option?.label
              return typeof label === 'string' && label.toLowerCase().includes(input.toLowerCase())
            }}
          />
        </Flex>

        <Flex vertical gap={12}>
          <Typography.Text>{t('my-properties.street-num-home')}</Typography.Text>
          <Input
            className={`h-[53px] w-full rounded-2xl !bg-[#F8F8FA] px-4 !text-primary-dark ${
              errors?.['address.street'] ? 'border-[#FF4D4F]' : 'border-none'
            }`}
            placeholder={t('my-properties.select-street-num-home')}
            onChange={(e) => {
              form.setValue('address.street', e.target.value)
            }}
            value={form.watch('address.street') || ''}
          />
        </Flex>

        <Flex vertical gap={12}>
          <Typography.Text>{t('my-properties.mail')}</Typography.Text>
          <Input
            className={`h-[53px] w-full rounded-2xl !bg-[#F8F8FA] px-4 !text-primary-dark ${
              errors?.['address.zip'] ? 'border-[#FF4D4F]' : 'border-none'
            }`}
            placeholder={t('my-properties.select-mail')}
            onChange={(e) => {
              form.setValue('address.zip', e.target.value)
            }}
            value={form.watch('address.zip') || ''}
          />
        </Flex>
      </Flex>

      <Flex className="mt-4">
        <div className="grid w-full grid-cols-2 gap-8">
          <Button
            aria-label={t('my-properties.prev')}
            className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
            onClick={() => setActiveTab('detailed-object')}
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
            className="h-[58px] rounded-2xl bg-[#3276FF] shadow-none hover:!bg-[#3276FF]/70"
          >
            {t('my-properties.next')}
          </Button>
        </div>
      </Flex>
    </Flex>
  )
}
