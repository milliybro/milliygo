/* eslint-disable no-unused-vars */
import HotelIcon from '@/components/icons/hotel'
import { Button, Flex, Spin, Typography } from 'antd'
import React, { useState } from 'react'
import PageHeader from '../PageHeader'
import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getOwnerAccomodation, getPlacementTypes } from './api'
import { useTranslations } from 'next-intl'

export default function CreateProperty({
  setIsCreating,
}: {
  setIsCreating: (value: boolean) => void
}) {
  const [step, setStep] = useState(1)
  const [selectedPropertyKadastr, setSelectedPropertyKadastr] = useState<any>(null)
  const router = useRouter()
  const t = useTranslations()

  const { data: placementsOwner = [], isLoading } = useQuery({
    queryKey: ['placementsOwner'],
    queryFn: getOwnerAccomodation,
    refetchOnWindowFocus: false,
    select: (data) => data?.results,
  })

  const { data: placementTypes } = useQuery({
    queryKey: ['placementTypes'],
    queryFn: getPlacementTypes,
    refetchOnWindowFocus: false,
    select: (data: any) => {
      return data?.results
    },
  })

  return step === 1 ? (
    <Flex vertical gap={24}>
      {placementsOwner.length > 0 && (
        <Flex className="items-center justify-between">
          <PageHeader
            title={t('my-properties.add-properties-get-guests-title')}
            description={t('my-properties.add-properties-get-guests-text')}
          />

          <Button type="link" className="flex items-center" onClick={() => setIsCreating(false)}>
            {t('my-properties.go-to-list')}
            <ArrowRightUpIcon />
          </Button>
        </Flex>
      )}

      <Spin spinning={isLoading}>
        <Flex className="gap-[16px]" vertical>
          {placementsOwner.length > 0 ? (
            placementsOwner?.map((property: any) => (
              <Flex
                key={property.id}
                className="w-full gap-[16px] rounded-2xl border border-[#F8F8FA] p-[16px]"
              >
                <Flex className="h-[44px] w-[44px] items-center justify-center rounded-lg bg-[#F8F8FA]">
                  <HotelIcon className="text-2xl" />
                </Flex>

                <Flex vertical>
                  <Typography className="text-base font-semibold">{property.tipText}</Typography>

                  <ul className="mb-[12px] list-disc pl-[20px] font-normal text-[#777E90]">
                    <li>
                      {t('my-properties.number-kadastr')}: {property.cad_number}
                    </li>
                    <li>
                      {t('my-properties.name-kadastr')}: {property.dom_num}
                    </li>
                    <li>
                      {t('my-properties.address')}: {property.address}
                    </li>
                    <li>
                      {t('my-properties.region')} : {property.region + ', ' + property.district}
                    </li>
                    <li>
                      {t('my-properties.street')}: {property.street}
                    </li>
                    <li>
                      {t('my-properties.mfy')}: {property.neighborhood}
                    </li>
                  </ul>

                  <Button
                    type="link"
                    disabled={property.placement !== null}
                    className="flex items-center p-0 font-medium"
                    onClick={() => {
                      setStep(2)
                      setSelectedPropertyKadastr(property.id)
                    }}
                  >
                    {t('my-properties.reg-property')}
                    <ArrowRightUpIcon />
                  </Button>
                </Flex>
              </Flex>
            ))
          ) : (
            <Flex vertical gap={24}>
              <div className="mt-[20%] flex h-full flex-col items-center justify-center">
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-[#F8F8FA]">
                  <HotelIcon className="text-2x" />
                </div>
                <Typography className="mb-6 max-w-[412px] text-center">
                  <Typography.Title level={3}>{t('my-properties.no-data')}</Typography.Title>
                  <Typography.Text>{t('my-properties.no-data-desc')}</Typography.Text>
                </Typography>
              </div>
            </Flex>
          )}
        </Flex>
      </Spin>
    </Flex>
  ) : (
    <Flex vertical gap={24}>
      <Flex className="items-center justify-between">
        <PageHeader
          title={t('my-properties.select-type')}
          description={t('my-properties.add-for-get-guest')}
        />

        <Button type="link" className="flex items-center" onClick={() => setIsCreating(false)}>
          {t('my-properties.go-to-list')}
          <ArrowRightUpIcon />
        </Button>
      </Flex>

      <Flex className="grid grid-cols-2 gap-[24px]">
        {placementTypes?.map((type: any) => (
          <Flex
            key={type.id}
            className="w-full gap-[16px] rounded-2xl border border-[#F8F8FA] p-[16px]"
          >
            <Flex className="h-[44px] w-[44px] min-w-[44px] items-center justify-center overflow-hidden rounded-lg bg-[#F8F8FA]">
              {type.icon}
            </Flex>

            <Flex vertical>
              <Typography className="mb-[4px] font-semibold">{type.name}</Typography>

              <Typography className="mb-[12px]">{type.description}</Typography>

              <Button
                type="link"
                className="flex h-max items-center p-0"
                onClick={() => {
                  router.push(
                    `/account/properties/create?type=${type.id}&property=${selectedPropertyKadastr}`
                  )
                }}
              >
                {t('buttons.continue')}
                <ArrowRightUpIcon />
              </Button>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
