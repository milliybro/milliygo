/* eslint-disable no-unused-vars */
import { Avatar, Button, Card, Flex, Form, Modal, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import {
  createAccommodationGuest,
  findGuest,
  getOwnerAccomodation,
  getPlacementTypes,
} from '../api'
import BookingSteps from './AddGuestSteps'
import useNewBookingConfirmationStore from './store/new-booking-confirmation-store'
import FirstContent from './FirstContent'
import { capitalizeFirstLetters } from '@/helpers/capitalize-first-letters'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import SecondContent from './SecondContent'
import ThirdContent from './ThirdContent'
import ForthContent from './ForthContent'
import useStepParams from './hooks/use-step-params'
import { truthyObject } from '@/helpers/truthy-object'
import { getListCountries } from '@/features/Account/api'
import dayjs from 'dayjs'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { twMerge } from 'tailwind-merge'
import LicenseDraftIcon from '@/components/icons/license-draft-icon'
import CloseIcon from '@/components/icons/close'

const INITIAL_COUNTRIES = [16, 2, 69, 71]
interface AuthStore {
  logout: () => void
  userInfo: {
    id: number
    pinfl?: string
    last_login: string
    is_guide: boolean
    is_superuser: boolean
    username: string
    first_name: string
    middle_name: string
    last_name: string
    email: string
    avatar: string
    phone: string
    passport_sn: string
    passport_given_by: string
    passport_expire_date: string
    position: string
    address: string
    is_staff: boolean
    is_active: boolean
    date_joined: string
    region: string
    district: string
    type: string
    deleted: string
    deleted_by_cascade: boolean
    birth_date: string
    gender: string
    unsubscribe_reason: string
    created_at: string
    updated_at: string
    organization: string
    country: string
    passport_first_name: string
    passport_last_name: string
    groups: { id: number; name: string }[]
  }
}

export default function AddGuest({
  setIsCreateGuest,
  registerDate,
}: {
  setIsCreateGuest: (value: boolean) => void
  registerDate: any
}) {
  const { mutateAsync: findGuestData } = useMutation({ mutationFn: findGuest })

  const { step, next, prev, goTo } = useStepParams({
    onFirstStepNext: async () => {
      const values = form.getFieldsValue()
      if (!values.serialnumber_or_pinfl || !values.birth_date || !values.citizenship) {
        return false
      }
      try {
        const data = await findGuestData({
          serialnumber_or_pinfl: values.serialnumber_or_pinfl,
          birth_date: values.birth_date.format('YYYY-MM-DD'),
          citizenship: values.citizenship === 239 ? 'resident' : 'no-rezident',
        })

        form.setFieldsValue({
          pinfl: data?.pinfl,
          document_given_date: data?.datebegin ? dayjs(data?.datebegin, 'YYYY-MM-DD') : null,
          document_given_by: data?.docgiveplace,
          last_name: data?.last_name,
          first_name: data?.first_name,
          gender: data?.gender,
          phone: data?.phone,
          middle_name: data?.middle_name,
          passport_issued_by: data?.passport_issued_by,
          nationality: data?.nationality,
          birth_country: data?.country?.id,
        })

        return true
      } catch (e) {
        console.error('Guest not found', e)
        return false
      }
    },
  })

  const router = useRouter()
  const [form] = Form.useForm()
  const t = useTranslations()
  const { setShow } = useNewBookingConfirmationStore((state) => state)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [formData, setFormData] = useState(null)
  const [passportInfo, setPassportInfo] = useState<any>()
  const authContext = useContext(AuthContext)
  const { authStore } = authContext as { authStore: AuthStore }
  const { userInfo } = authStore

  const { mutate } = useMutation({
    mutationFn: createAccommodationGuest,
    onSuccess: (res) => {
      setIsCreateGuest(false)
      router.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, step: undefined },
        },
        undefined,
        { shallow: true }
      )
    },
  })

  const nextHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const fieldsByStep: { [key: number]: string[] } = {
        1: ['citizenship', 'birth_date', 'serialnumber_or_pinfl'],
        2: [
          'cadastr',
          'document_given_date',
          'document_given_by',
          'middle_name',
          'first_name',
          'last_name',
          'country_of_came',
          'gender',
          'register_date',
          'transit_country',
          'stay_days',
        ],
        3: [
          'visa_type',
          'visa_number',
          'start_date',
          'expiry_date',
          'kpp_nomer',
          'kpp_date',
          'type_visit',
          'guest_type',
        ],
      }

      if (step < 4) {
        const currentFields = fieldsByStep[step]
        if (currentFields) {
          await form.validateFields(currentFields)
        }
        next()
      } else if (step === 4) {
        await form.validateFields()
        form.submit()
      }
    } catch (errorInfo: any) {
      const checkErrorField = (fieldName: string, stepNumber: number) => {
        const isFieldError = errorInfo.errorFields.some((field: any) => field.name[0] === fieldName)
        if (isFieldError) {
          goTo(stepNumber)
        }
      }

      const fieldsWithSteps = [
        { field: 'visa_type', step: 3 },
        { field: 'visa_number', step: 3 },
        { field: 'start_date', step: 3 },
        { field: 'expiry_date', step: 3 },
        { field: 'kpp_nomer', step: 3 },
        { field: 'kpp_date', step: 3 },
        { field: 'type_visit', step: 3 },
        { field: 'guest_type', step: 3 },

        { field: 'cadastr', step: 2 },
        { field: 'document_given_date', step: 2 },
        { field: 'document_given_by', step: 2 },
        { field: 'middle_name', step: 2 },
        { field: 'first_name', step: 2 },
        { field: 'last_name', step: 2 },
        { field: 'country_of_came', step: 2 },
        { field: 'gender', step: 2 },
        { field: 'register_date', step: 2 },
        { field: 'transit_country', step: 2 },
        { field: 'stay_days', step: 2 },

        { field: 'citizenship', step: 1 },
        { field: 'birth_date', step: 1 },
        { field: 'serialnumber_or_pinfl', step: 1 },
      ]

      fieldsWithSteps.forEach(({ field, step }) => checkErrorField(field, step))

      if (errorInfo.errorFields.length > 0) {
        const firstErrorField = errorInfo.errorFields[0]
        const name = firstErrorField.name[0]

        const fieldInstance = form?.getFieldInstance(name)
        if (fieldInstance) {
          fieldInstance?.focus()
        }
      }
    }
  }

  const [countrySearch, setCountrySearch] = useState<string | undefined>(undefined)
  const [openModal, setOpenModal] = useState<boolean>(false)

  const { data } = useQuery({
    queryKey: ['countries', countrySearch],
    queryFn: () => getListCountries(truthyObject({ search: countrySearch })),
    refetchOnWindowFocus: false,
    select: (data) => {
      const uniqueId: number[] = []
      return [
        ...data.results
          .map((country, i) => ({
            value: country.id,
            label: capitalizeFirstLetters(country.name),
            key: i,
          }))
          .filter((country) => {
            if (uniqueId.includes(country.value)) {
              return false
            } else {
              uniqueId.push(country.value)
              return true
            }
          })
          .sort((a, b) => a.label.localeCompare(b.label)),
      ]
    },
    enabled: true,
  })

  useEffect(() => {
    if (registerDate) {
      form.setFieldsValue({
        register_date: dayjs(registerDate, 'YYYY-MM-DD HH:mm'),
      })
    }
  }, [registerDate, form])

  return (
    <Flex vertical gap={24}>
      <Typography.Text className="text-[20px] font-[700]">
        {t('my-properties.add-new-guest')}
      </Typography.Text>
      <BookingSteps />
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          const payload = {
            register_date: values.register_date.format('YYYY-MM-DD'),
            phone_number: userInfo?.phone,
            first_name: values.first_name,
            last_name: values.last_name,
            middle_name: values.middle_name,
            birth_date: values.birth_date.format('YYYY-MM-DD'),
            gender: values.gender,
            accommodation: values.cadastr,
            country_of_came: values.country_of_came,
            stay_days: Number(values.stay_days),
            children:
              values.children?.map((child: any) => ({
                full_name: child.full_name,
                birth_date: child.birth_date.format('YYYY-MM-DD'),
                gender: child.gender,
              })) || [],
            visa: [
              {
                visa_number: values.visa_number,
                visa_type: values.visa_type,
                start_date: values.start_date.format('YYYY-MM-DD'),
                expiry_date: values.expiry_date.format('YYYY-MM-DD'),
                kpp_nomer: values.kpp_nomer,
                kpp_date: values.kpp_date.format('YYYY-MM-DD'),
                type_visit: values.type_visit,
                guest_type: values.guest_type,
              },
            ],
          }

          mutate(payload)
          setShow(true)
        }}
      >
        <Card
          className="card-actions-shadow flex h-full flex-col"
          actions={[
            <div className="flex items-center justify-between" key="card-actions">
              <Button
                className="border-none text-danger"
                onClick={() => {
                  setIsCreateGuest(false)
                  router.replace(
                    {
                      pathname: router.pathname,
                      query: { ...router.query, step: undefined }, // ❌ step ni olib tashlash
                    },
                    undefined,
                    { shallow: true }
                  )
                }}
              >
                {t('my-properties.cancel-processs')}
              </Button>

              <div className="flex">
                <Button
                  htmlType="button"
                  type="text"
                  className={`flex items-center gap-1 disabled:text-secondary disabled:opacity-50 ${
                    step >= 1 ? 'text-primary' : 'text-secondary/50'
                  }`}
                  onClick={prev}
                  disabled={step === 1}
                  size="small"
                  icon={<ArrowLeftOutlined className="text-[20px]" />}
                  iconPosition="start"
                >
                  {t('buttons.back')}
                </Button>

                <Button
                  htmlType="button"
                  type="text"
                  className="flex gap-1 justify-self-end text-primary disabled:text-secondary/50"
                  onClick={nextHandler}
                  icon={<ArrowRightOutlined className="text-[20px]" />}
                  iconPosition="end"
                  size="small"
                  disabled={step === 5}
                >
                  {t('buttons.continue')}
                </Button>
              </div>
            </div>,
          ]}
        >
          <div className={step === 1 ? '' : 'hidden'}>
            <FirstContent
              countries={data}
              setPage={setPage}
              page={page}
              setSearch={setCountrySearch}
              search={countrySearch}
              setFormData={setFormData}
            />
          </div>

          <div className={step === 2 ? '' : 'hidden'}>
            <SecondContent
              countries={data}
              setPage={setPage}
              page={page}
              setSearch={setSearch}
              passportInfo={passportInfo}
            />
          </div>

          <div className={step === 3 ? '' : 'hidden'}>
            <ThirdContent form={form} />
          </div>

          <div className={step === 4 ? '' : 'hidden'}>
            <ForthContent />
          </div>
        </Card>
      </Form>
      <Modal
        centered
        width={600}
        open={openModal}
        onCancel={() => setIsCreateGuest(false)}
        footer={null}
      >
        <div className="my-5 flex flex-col items-center justify-center text-center">
          <Avatar
            shape="circle"
            size={62}
            className={twMerge('mb-5 border-[7px] border-[#ff000005] bg-[#ff000045]')}
            icon={<CloseIcon className={twMerge('text-[26px] text-danger')} />}
          />
          <Typography.Text className="text-[24px] font-[700]">
            {t('my-properties.been-denied')}
          </Typography.Text>
          <Typography.Text className="mt-3 text-[16px] font-[500] text-secondary">
            {t('my-properties.been-denied-content')}
          </Typography.Text>
        </div>
      </Modal>
    </Flex>
  )
}
