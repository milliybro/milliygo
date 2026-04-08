/* eslint-disable no-unused-vars */
import { getFacilities, getRFacilities } from '@/features/Account/api'
import { Button, Checkbox, Flex, Spin, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useMemo, type ReactElement } from 'react'
import { useQuery } from '@tanstack/react-query'

export default function MainInformationSecond({
  setCurrentStep,
  form,
}: {
  setCurrentStep: (step: number) => void
  form: any
}): ReactElement {
  const { data: facilities = [], isLoading: isLoadingFacilities } = useQuery({
    queryKey: ['facilities'],
    queryFn: () => getFacilities('apartment'),
    refetchOnWindowFocus: false,
    select: (data) => data.results,
  })

  const { data: rFacilities = [], isLoading: isLoadingRFacilities } = useQuery({
    queryKey: ['rFacilities'],
    queryFn: () => getRFacilities('apartment'),
    refetchOnWindowFocus: false,
    select: (data) => data.results,
  })

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const t = useTranslations()

  const facilitiesHandleChange = (name: string, id: number) => {
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
      <Spin size="large" spinning={isLoadingFacilities || isLoadingRFacilities}>
        <Flex vertical gap={24}>
          {facilities?.map((facility: any) => (
            <Flex key={facility.id} vertical gap={12}>
              <Typography.Text className="text-sm font-normal text-[#777E90]">
                {facility.name}
              </Typography.Text>

              {facility?.facilities?.map((f: any) => (
                <Checkbox
                  key={f.id}
                  onChange={() => {
                    facilitiesHandleChange('mainInformation.placement', f.id)
                  }}
                  checked={form.watch(`mainInformation.placement`)?.includes(f.id)}
                >
                  {f.name}
                </Checkbox>
              ))}
            </Flex>
          ))}

          {rFacilities?.map((facility: any) => (
            <Flex key={facility.id} vertical gap={12}>
              <Typography.Text className="text-sm font-normal text-[#777E90]">
                {facility.name}
              </Typography.Text>

              {facility?.r_facilities?.map((f: any) => (
                <Checkbox
                  key={f.id}
                  onChange={() => {
                    facilitiesHandleChange('mainInformation.room', f.id)
                  }}
                  checked={form.watch(`mainInformation.room`)?.includes(f.id)}
                >
                  {f.name}
                </Checkbox>
              ))}
            </Flex>
          ))}
        </Flex>
      </Spin>

      <Flex className="mt-4">
        <div className="grid w-full grid-cols-2 gap-8">
          <Button
            aria-label={t('my-properties.prev')}
            className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
            onClick={() => {
              scrollToTop()
              setCurrentStep(1)
            }}
          >
            {t('my-properties.prev')}
          </Button>
          <Button
            aria-label={t('my-properties.next')}
            type="primary"
            onClick={() => {
              scrollToTop()
              setCurrentStep(3)
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
