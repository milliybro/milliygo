/* eslint-disable no-unused-vars */

import UserIconOutlined from '@/components/icons/user'
import { Avatar, Divider, Modal, Tabs, Typography } from 'antd'
import { TabsProps } from 'antd/lib'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'
import { getAccommodationGuest } from '../api'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

import { AnimatePresence, motion } from 'motion/react'

export default function GuestInfoModal({ openModal, setOpenModal }: any) {
  const t = useTranslations()
  const { query } = useRouter()

  const { data = {}, isLoading: placementLoading } = useQuery({
    queryKey: ['accommodation-guest', query.id],
    queryFn: () => getAccommodationGuest({ id: query?.id }),
    enabled: !!query?.id,
  })
  const options = [
    { value: 'work', label: t('visit-type.work') },
    { value: 'education', label: t('visit-type.education') },
    { value: 'tourist', label: t('visit-type.tourist') },
    { value: 'private', label: t('visit-type.private') },
    { value: 'other', label: t('visit-type.other') },
    {
      value: 'visiting_friends_relatives',
      label: t('visit-type.visiting_friends_relatives'),
    },
    {
      value: 'health_and_wellness_procedures',
      label: t('visit-type.health_and_wellness_procedures'),
    },
    {
      value: 'religion_pilgrimage',
      label: t('visit-type.religion_pilgrimage'),
    },
    { value: 'visiting_shops', label: t('visit-type.visiting_shops') },
    { value: 'transit', label: t('visit-type.transit') },
    { value: 'sports_and_culture', label: t('visit-type.sports_and_culture') },
    { value: 'for_leisure', label: t('visit-type.for_leisure') },
    { value: 'guest', label: t('visit-type.guest') },
    { value: 'official', label: t('visit-type.official') },
    { value: 'as_a_compatriot', label: t('visit-type.as_a_compatriot') },
    {
      value: 'as_an_honorary_citizen',
      label: t('visit-type.as_an_honorary_citizen'),
    },
    { value: 'as_an_investor', label: t('visit-type.as_an_investor') },
  ]
  const typeVisitLabel =
    options.find((opt) => opt.value === data?.information?.type_visit)?.label || '-'

  const guestInfo = [
    { label: 'ID', value: data?.information?.id },
    { label: t('my-properties.full-name-guest'), value: data?.information?.full_name },
    {
      label: t('personal-information.birth-date'),
      value: dayjs(data?.information?.birth_date).format('DD.MM.YYYY'),
    },
    { label: t('personal-information.citizenship'), value: data?.information?.birth_country },
    { label: t('my-properties.come-from'), value: data?.information?.country_of_came },
    { label: t('my-properties.arrived-on'), value: data?.stay_days },
    {
      label: t('personal-information.sex'),
      value: data?.information?.gender === 'male' ? t('genders.man') : t('genders.woman'),
    },
    {
      label: t('my-properties.register-date'),
      value: dayjs(data?.information?.register_date).format('DD.MM.YYYY / hh:mm:ss'),
    },
    { label: t('my-properties.type-visit'), value: typeVisitLabel },
  ]

  const guesttype = [
    {
      value: 'pensioner',
      label: t('guest-type.pensioner'),
    },
    {
      value: 'student',
      label: t('guest-type.student'),
    },
    {
      value: 'dependent',
      label: t('guest-type.dependent'),
    },
    {
      value: 'other',
      label: t('guest-type.other'),
    },
  ]

  const typeGuestLabel = guesttype.find((opt) => opt.value === data?.visa?.guest_type)?.label || '-'

  const AddGuestInfo = [
    { label: t('my-properties.type-guest'), value: typeGuestLabel },
    { label: t('transport.document.label'), value: '-' },
    { label: t('cultural-heritage.passport'), value: '-' },
    { label: t('my-properties.visa'), value: data?.visa?.visa_type },
    { label: t('my-properties.number-visa'), value: data?.visa?.visa_number },
    {
      label: t('my-properties.expire-visa'),
      value: dayjs(data?.visa?.expiry_date).format('DD.MM.YYYY'),
    },
    { label: t('my-properties.checkpoint-number'), value: data?.visa?.kpp_nomer },
    {
      label: t('my-properties.updated'),
      value: dayjs(data?.visa?.updated_at).format('DD.MM.YYYY / hh:mm:ss'),
    },
    { label: t('my-properties.registered'), value: '-' },
  ]

  const transaction = [
    { label: 'ID', value: '-' },
    { label: t('tours.date-payment'), value: '-' },
    { label: t('my-properties.tour-fee-amount'), value: '-' },
    { label: t('my-properties.paid-through'), value: data?.placement?.payment },
    {
      label: t('my-properties.status-payment'),
      value: (
        <div className="rounded-[8px] bg-[#4DD282] px-2 py-1 text-[12px] font-[500] text-white">
          -
        </div>
      ),
    },
  ]
  const address = [
    { label: t('personal-information.phone-number'), value: data?.placement?.phone_number },
    { label: t('my-properties.number-kadastr'), value: data?.placement?.cad_number },
    { label: t('transport.pinfl.label'), value: data?.placement?.pinfl },
    { label: t('personal-information.name'), value: data?.placement?.first_name },
    { label: t('personal-information.last_name'), value: data?.placement?.last_name },
    { label: t('personal-information.display-name'), value: data?.placement?.middle_name },
    { label: t('cultural-heritage.passport'), value: data?.placement?.passport_sn },
    { label: t('my-properties.region'), value: data?.placement?.region },
    { label: t('my-properties.region-district'), value: data?.placement?.district },
    { label: t('personal-information.address'), value: data?.placement?.address },
    { label: t('my-properties.for-commercial'), value: '-' },
  ]
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('my-properties.info'),
      children: (
        <div className="my-6 w-full rounded-[12px] border border-[#E5E7EB]">
          {guestInfo.map((item, index) => (
            <div key={index}>
              <div className="flex w-full justify-between p-3">
                <Typography.Text className="text-[16px] font-[500]">{item.label}</Typography.Text>
                <Typography.Text className="text-[16px] font-[700]">{item.value}</Typography.Text>
              </div>
              {index !== guestInfo.length - 1 && <Divider className="m-0" />}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '2',
      label: t('my-properties.add-info'),
      children: (
        <div className="my-6 w-full rounded-[12px] border border-[#E5E7EB]">
          {AddGuestInfo.map((item, index) => (
            <div key={index}>
              <div className="flex w-full justify-between p-3">
                <Typography.Text className="text-[16px] font-[500]">{item.label}</Typography.Text>
                <Typography.Text className="text-[16px] font-[700]">{item.value}</Typography.Text>
              </div>
              {index !== guestInfo.length - 1 && <Divider className="m-0" />}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '3',
      label: t('my-properties.child-info'),
      children: (
        <div className="space-y-6">
          {Array.isArray(data?.children) && data.children.length > 0 ? (
            data.children.map((child: any, index: number) => {
              const fields = [
                { label: t('my-properties.child-full-name'), value: child?.full_name },
                {
                  label: t('personal-information.birth-date'),
                  value: dayjs(child?.birth_date).format('DD.MM.YYYY'),
                },
                {
                  label: t('personal-information.sex'),
                  value: child?.gender === 'male' ? t('genders.man') : t('genders.woman'),
                },
              ]

              return (
                <div key={index} className="mt-3 w-full">
                  <div className="pt-0 text-start text-[16px] font-[600]">
                    {t('my-properties.child')} №{index + 1}
                  </div>
                  <div className="mb-4 mt-2 w-full rounded-[12px] border border-[#E5E7EB]">
                    {fields.map((item, i) => (
                      <div key={i}>
                        <div className="flex w-full justify-between p-3">
                          <Typography.Text className="text-[16px] font-[500]">
                            {item.label}
                          </Typography.Text>
                          <Typography.Text className="text-[16px] font-[700]">
                            {item.value}
                          </Typography.Text>
                        </div>
                        {i !== fields.length - 1 && <Divider className="m-0" />}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })
          ) : (
            <div className="my-36 text-[16px] font-[500] text-gray-500">
              {t('my-properties.no-children')}
            </div>
          )}
        </div>
      ),
    },
    {
      key: '4',
      label: t('my-properties.transaction'),
      children: (
        <div className="my-6 w-full rounded-[12px] border border-[#E5E7EB]">
          {transaction.map((item, index) => (
            <div key={index}>
              <div className="flex w-full justify-between p-3">
                <Typography.Text className="text-[16px] font-[500]">{item.label}</Typography.Text>
                <Typography.Text className="text-[16px] font-[700]">{item.value}</Typography.Text>
              </div>
              {index !== transaction.length - 1 && <Divider className="m-0" />}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: '5',
      label: t('personal-information.address'),
      children: (
        <div className="my-6 w-full overflow-hidden rounded-[12px] border border-[#E5E7EB]">
          {address.map((item, index) => (
            <div key={index}>
              <div className="flex w-full justify-between p-3">
                <Typography.Text className="text-[16px] font-[500]">{item.label}</Typography.Text>
                <Typography.Text className="text-[16px] font-[700]">{item.value}</Typography.Text>
              </div>
              {index !== address.length - 1 && <Divider className="m-0" />}
            </div>
          ))}
        </div>
      ),
    },
  ]
  const [activeKey, setActiveKey] = useState('1')

  return (
    <>
      <Modal
        width={926}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        onOk={() => setOpenModal(false)}
        footer={null}
        classNames={{ body: 'max-h-[1000px]' }}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Avatar
            shape="circle"
            size={62}
            className={twMerge('mb-5 border-[7px] border-[#EFF6FF] bg-[#DBEAFE]')}
            icon={<UserIconOutlined className={twMerge('text-[26px] text-primary')} />}
          />
          <Typography.Text className="text-[24px] font-[700]">
            {t('my-properties.info-guest')}
          </Typography.Text>
          <Typography.Text className="mb-6 mt-[10px] text-[16px] font-[400] text-secondary">
            {t('my-properties.info-guest-desc')}
          </Typography.Text>
          <motion.div animate={{ height: 'max-content' }}></motion.div>
          <Tabs
            className="custom-tabs"
            activeKey={activeKey}
            onChange={setActiveKey}
            items={items.map((item) => ({
              ...item,
              children: (
                <AnimatePresence mode="wait">
                  {activeKey === item.key && (
                    <motion.div
                      key={item.key}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      {item.children}
                    </motion.div>
                  )}
                </AnimatePresence>
              ),
            }))}
          />
        </div>
      </Modal>
    </>
  )
}
