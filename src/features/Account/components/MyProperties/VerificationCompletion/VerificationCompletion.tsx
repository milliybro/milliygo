import CustomModal from '@/components/common/CModal'
import CloseIcon from '@/components/icons/close'
import InfoIcon from '@/components/icons/info-icon'
import SuccessIcon from '@/components/icons/success-icon'
import { newCreatePlacement, newUpdatePlacement } from '@/features/Account/api'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import PageHeader from '@/features/Account/components/PageHeader'
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  Progress,
  Radio,
  Space,
  Typography,
  message,
} from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { sendRejectReason } from '../api'

interface AuthStore {
  logout: () => void
  userInfo: {
    id: number
    last_login: string
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
  }
}

function VerificationCompletion({
  form,
  queryId,
  setActiveTab,
  setErrors,
  currencies,
  placementInfo,
}: {
  form: any
  queryId: string
  setActiveTab: any
  setErrors: any
  errors: any
  currencies: any
  placementInfo: any
}): React.ReactElement {
  const [progressPercents, _setProgressPercents] = useState<number>(20)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false)
  const router = useRouter()
  const t = useTranslations()
  const [suggestions, setSuggestions] = useState([
    {
      visible: true,
      title: t('my-properties.suggest8-title'),
      description: [t('my-properties.suggest8-text1')],
    },
  ])

  const { mutate: rejectReasonMutate } = useMutation({
    mutationFn: sendRejectReason,
    onSuccess: () => {
      message.success(t('my-properties.success'))
    },
  })

  const reasonByNumber = (number: number) => {
    switch (number) {
      case 1:
        return t('my-properties.cancel-reason-1')
      case 2:
        return t('my-properties.cancel-reason-2')
      case 3:
        return t('my-properties.cancel-reason-3')
      case 4:
        return t('my-properties.cancel-reason-4')
      default:
        return 'Другая причина'
    }
  }

  const rejectReason = () => {
    const formValues = form.getValues()
    const data = {
      reason:
        formValues?.legacy.reasonCancellation === 5
          ? formValues?.legacy.reasonDescription
          : reasonByNumber(formValues?.legacy.reasonCancellation),
    }
    rejectReasonMutate(data)
  }

  const searchParams = useSearchParams()
  const type = searchParams.get('type') || ''
  const accommodation_id = searchParams.get('property') || ''

  const authContext = useContext(AuthContext)
  const { authStore } = authContext as { authStore: AuthStore }
  const { userInfo } = authStore

  const { mutate: newCreatePlacementMutate, isPending: isLoadingNewPlacement } = useMutation({
    mutationFn: newCreatePlacement,
    onSuccess: () => {
      message.success(t('my-properties.success'))
      setOpenSuccessModal(true)
    },
  })

  const { mutate: newUpdatePlacementMutate } = useMutation({
    mutationFn: newUpdatePlacement,
    onSuccess: () => {
      message.success(t('safety.two-factor-auth-success'))
      setOpenSuccessModal(true)
    },
  })

  function extractPath(url: string) {
    const prefix = 'https://api.emehmon.xdevs.uz/media/'
    if (url?.includes(prefix)) {
      return url.replace(prefix, '')
    }

    return url
  }

  const changeActiveTabRequiredField = (tab: string, errorMessage: string) => {
    message.open({
      type: 'error',
      content: errorMessage,
    })
    setActiveTab(tab)
  }

  const checkRequiredFields = () => {
    const formValues = form.getValues()
    const validationRules = [
      {
        key: 'detailedObject.nameObject',
        message: t('error.detailedObjectnameObject'),
        tab: 'detailed-object',
      },
      {
        key: 'detailedObject.description',
        message: t('error.detailedObjectdescription'),
        tab: 'detailed-object',
      },
      {
        key: 'address.street',
        message: t('error.addressstreet'),
        tab: 'address-object',
      },
      {
        key: 'images',
        message: t('error.images'),
        tab: 'images',
      },
      {
        key: 'address.coordinates.0',
        message: t('error.addresscoordinates'),
        tab: 'address-object',
      },
      {
        key: 'address.zip',
        message: t('error.addresszip'),
        tab: 'address-object',
      },
      {
        key: 'mainInformation.checkInFrom',
        message: t('error.mainInformationcheckInFrom'),
        tab: 'main-information',
      },
      {
        key: 'mainInformation.checkInTo',
        message: t('error.mainInformationcheckInTo'),
        tab: 'main-information',
      },
      {
        key: 'mainInformation.checkOutFrom',
        message: t('error.mainInformationcheckOutFrom'),
        tab: 'main-information',
      },
      {
        key: 'mainInformation.checkOutTo',
        message: t('error.mainInformationcheckOutTo'),
        tab: 'main-information',
      },
      {
        key: 'legacy.secondAgreement',
        message: t('error.legacysecondAgreement'),
        tab: 'verification-completion',
      },
      {
        key: 'address.country',
        message: t('error.addresscountry'),
        tab: 'address-object',
      },
      {
        key: 'address.city',
        message: t('error.addresscity'),
        tab: 'address-object',
      },
      {
        key: 'address.district',
        message: t('error.addressdistrict'),
        tab: 'address-object',
      },
      {
        key: 'schedule.paymentTypes',
        message: t('error.schedulepaymentTypes'),
        tab: 'schedule',
      },
      {
        key: 'mainInformation.area',
        message: t('error.mainInformationarea'),
        tab: 'main-information',
      },
      {
        key: 'mainInformation.bathroom',
        message: t('error.mainInformationbathroom'),
        tab: 'main-information',
      },
      {
        key: 'mainInformation.bedroom',
        message: t('error.mainInformationbedroom'),
        tab: 'main-information',
      },
      {
        key: 'mainInformation.person_count',
        message: t('error.mainInformationperson_count'),
        tab: 'main-information',
      },
      {
        key: 'schedule.price',
        message: t('error.scheduleprice'),
        tab: 'schedule',
      },
    ]

    for (const rule of validationRules) {
      const value = Array.isArray(rule.key)
        ? rule.key.reduce((obj, key) => obj?.[key], formValues)
        : form.getValues(rule.key)

      if (!value) {
        setErrors((prev: any) => ({ ...prev, [rule.key as string]: rule.message }))
        changeActiveTabRequiredField(rule.tab, rule.message)
        return
      }
    }
  }

  const publishObject = () => {
    const formValues = form.getValues()

    const newData = {
      translations: {
        'uz-latin': {
          name: formValues?.detailedObject?.nameObject,
          description: formValues?.detailedObject?.description,
          address: formValues?.address?.street,
        },
        ru: {
          name: formValues?.detailedObject?.nameObject,
          description: formValues?.detailedObject?.description,
          address: formValues?.address?.street,
        },
        en: {
          name: formValues?.detailedObject?.nameObject,
          description: formValues?.detailedObject?.description,
          address: formValues?.address?.street,
        },
      },
      image: extractPath(
        formValues?.image ??
          formValues?.images?.find((val: any) => val.isMain)?.image ??
          formValues?.images[0]?.image
      ),
      accommodation_id: accommodation_id || placementInfo.accommodation_id,
      lat: formValues?.address?.coordinates?.[0],
      long: formValues?.address?.coordinates?.[1],
      post_code: formValues?.address?.zip,
      status: true,
      long_stay_allowed: formValues?.schedule?.allowLongTerm,
      discount: formValues?.schedule?.discounted,
      checkin_start: formValues?.mainInformation?.checkInFrom,
      checkin_end: formValues?.mainInformation?.checkInTo,
      checkout_start: formValues?.mainInformation?.checkOutFrom,
      published_at: dayjs(formValues?.schedule?.startDate ?? new Date()).format(),
      checkout_end: formValues?.mainInformation?.checkOutTo,
      breakfast: formValues?.mainInformation?.breakfast ? 1 : 0,
      parking: formValues?.mainInformation?.parking,
      free_booking_cancellation: formValues?.schedule?.freeCancellation,
      accidental_booking_protection: formValues?.schedule?.protectionBooking,
      general_terms: formValues?.legacy?.secondAgreement,
      is_approved: 'new',
      type: type || formValues?.type,

      country: 1,
      region: formValues?.address?.city,
      district: formValues?.address?.district,
      organization: userInfo?.organization,
      accomodation_id: formValues?.mainInformation?.accomodation_id,
      payment_types: formValues?.schedule?.paymentTypes,
      prohibitions: formValues?.mainInformation?.prohibitions ?? [],
      facilities: formValues?.mainInformation?.placement ?? [],
      images: formValues?.images?.map((val: any) => {
        return {
          image: extractPath(val.image),
        }
      }),
      rooms: {
        translations: {
          ru: {
            name: formValues?.detailedObject?.nameObject,
            description: formValues?.detailedObject?.description,
          },
          en: {
            name: formValues?.detailedObject?.nameObject,
            description: formValues?.detailedObject?.description,
          },
          'uz-latin': {
            name: formValues?.detailedObject?.nameObject,
            description: formValues?.detailedObject?.description,
          },
        },
        area: formValues?.mainInformation?.area,
        bathrooms: formValues?.mainInformation?.bathroom,
        bedrooms: formValues?.mainInformation?.bedroom,
        person_count: formValues?.mainInformation?.person_count,
        floor_count: formValues?.mainInformation?.floor_count,
        room_floor: formValues?.mainInformation?.room_floor,

        children_allowed: formValues?.mainInformation?.stayWithChildren,
        crib_provided: formValues?.mainInformation?.provideKidCots,
        room_count: 1,
        price:
          formValues?.schedule?.price *
          (currencies.find((item: any) => item.value === formValues?.schedule?.currency)?.rate ??
            1),
        currency_price: formValues?.schedule?.currency,
        facilities: formValues?.mainInformation?.room ?? [],
      },
    }

    checkRequiredFields()
    if (queryId === 'create') {
      newCreatePlacementMutate(newData)
    } else {
      newUpdatePlacementMutate({
        ...newData,
        id: queryId,
      })
    }
  }

  const handleClose = (index: number) => {
    setSuggestions((prevSuggestions) => {
      const updatedSuggestions = [...prevSuggestions]
      updatedSuggestions[index].visible = false
      return updatedSuggestions
    })
  }

  return (
    <Flex className="grid grid-cols-[2fr_1fr]" gap={24}>
      <Flex vertical gap={24}>
        <PageHeader
          title={t('my-properties.legacy-completion')}
          description={t('my-properties.legacy-completion-description')}
        />

        <Progress
          percent={progressPercents}
          showInfo={false}
          strokeColor="#4DD282"
          strokeWidth={4}
        />

        <Flex vertical gap={24}>
          <Flex vertical className="gap-[16px]">
            <Flex className="flex gap-[8px]">
              <SuccessIcon className="text-[#4DD282]" />
              <Flex vertical>
                <Typography className="font-semibold">
                  {t('my-properties.legacy-completion-1')}
                </Typography>
                <Typography className="text-[#777E90]">
                  {t('my-properties.legacy-completion-1-description')}
                </Typography>
              </Flex>
            </Flex>

            <Flex className="flex gap-[8px]">
              <SuccessIcon className="text-[#4DD282]" />
              <Flex vertical>
                <Typography className="font-semibold">
                  {t('my-properties.legacy-completion-2')}
                </Typography>
                <Typography className="text-[#777E90]">
                  {t('my-properties.legacy-completion-2-description')}
                </Typography>
              </Flex>
            </Flex>

            <Flex className="flex gap-[8px]">
              <SuccessIcon className="text-[#4DD282]" />
              <Flex vertical>
                <Typography className="font-semibold">
                  {t('my-properties.legacy-completion-3')}
                </Typography>
                <Typography className="text-[#777E90]">
                  {t('my-properties.legacy-completion-3-description')}
                </Typography>
              </Flex>
            </Flex>
          </Flex>

          <Divider className="m-0" />

          <Checkbox
            className="flex items-start"
            onChange={(e) => form.setValue('legacy.firstAgreement', e.target.checked)}
            checked={form.watch('legacy.firstAgreement')}
          >
            {t('my-properties.legacy-completion-4')}
          </Checkbox>

          <Checkbox
            onChange={(e) => form.setValue('legacy.secondAgreement', e.target.checked)}
            checked={form.watch('legacy.secondAgreement')}
          >
            {t('my-properties.legacy-completion-5')}
          </Checkbox>

          <Flex vertical gap={24}>
            <Flex vertical>
              <Flex className="mt-4">
                <div className="grid w-full grid-cols-2 gap-8">
                  <Button
                    aria-label={t('my-properties.dont-ready')}
                    onClick={() => setOpenModal(true)}
                    className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
                  >
                    {t('my-properties.dont-ready')}
                  </Button>
                  <Button
                    aria-label={t('my-properties.publish')}
                    type="primary"
                    className="h-[58px] rounded-2xl bg-[#3276FF] shadow-none hover:!bg-[#3276FF]/70"
                    onClick={publishObject}
                    loading={isLoadingNewPlacement}
                  >
                    {t('my-properties.publish')}
                  </Button>
                </div>
              </Flex>
            </Flex>
          </Flex>

          <CustomModal
            width={700}
            modalTitle={t('my-properties.cancel-reason')}
            modalDesc={t('my-properties.cancel-reason-description')}
            open={openModal}
            onOk={() => setOpenModal(false)}
            onCancel={() => setOpenModal(false)}
          >
            <Flex vertical>
              <Radio.Group
                onChange={(e) => form.setValue('legacy.reasonCancellation', e.target.value)}
                value={form.watch('legacy.reasonCancellation')}
              >
                <Space direction="vertical">
                  <Radio value={1}>{t('my-properties.cancel-reason-1')}</Radio>
                  <Radio value={2}>{t('my-properties.cancel-reason-2')}</Radio>
                  <Radio value={3}>{t('my-properties.cancel-reason-3')}</Radio>
                  <Radio value={4}>{t('my-properties.cancel-reason-4')}</Radio>
                  <Radio value={5}>{t('my-properties.cancel-reason-5')}</Radio>
                </Space>
              </Radio.Group>

              {form.watch('legacy.reasonCancellation') === 5 && (
                <Flex vertical className="mt-[32px]">
                  <Typography className="mb-[12px]">
                    {t('my-properties.cancel-reason-description-2')}
                  </Typography>

                  <Input.TextArea
                    className="h-[122px] w-full rounded-2xl border-none !bg-[#F8F8FA] p-4 !text-primary-dark"
                    placeholder={t('my-properties.cancel-reason-placeholder')}
                    value={form.watch('legacy.reasonDescription')}
                    onChange={(e) => form.setValue('legacy.reasonDescription', e.target.value)}
                  />
                </Flex>
              )}

              <Flex vertical gap={24}>
                <Flex vertical>
                  <Flex className="mt-4">
                    <div className="grid w-full grid-cols-2 gap-8">
                      <Button
                        aria-label={t('my-properties.cancel')}
                        onClick={() => setOpenModal(false)}
                        className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
                      >
                        {t('my-properties.cancel')}
                      </Button>
                      <Button
                        aria-label={t('my-properties.send')}
                        type="primary"
                        className="h-[58px] rounded-2xl bg-[#3276FF] shadow-none hover:!bg-[#3276FF]/70"
                        onClick={rejectReason}
                        loading={isLoadingNewPlacement}
                      >
                        {t('my-properties.send')}
                      </Button>
                    </div>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </CustomModal>

          <CustomModal
            width={600}
            modalIcon={<SuccessIcon className="text-4xl text-[#777E90]" />}
            modalTitle={t('my-properties.success')}
            modalDesc={t('my-properties.success-description')}
            open={openSuccessModal}
            onOk={() => setOpenSuccessModal(false)}
            onCancel={() => setOpenSuccessModal(false)}
          >
            <Button
              aria-label={t('my-properties.go-to-my-properties')}
              type="primary"
              className="h-[58px] rounded-2xl bg-[#3276FF] shadow-none hover:!bg-[#3276FF]/70"
              onClick={() => router.push('/account/properties')}
            >
              {t('my-properties.go-to-my-properties')}
            </Button>
          </CustomModal>
        </Flex>
      </Flex>

      <Flex vertical gap={24}>
        {suggestions.map(
          (val, index) =>
            val.visible && (
              <Flex key={val.title} className="rounded-2xl bg-[#F8F8FA] p-[16px]" vertical>
                <Flex className="justify-between">
                  <InfoIcon className="text-[22px]" />
                  <Button
                    aria-label="close verification completion"
                    type="text"
                    onClick={() => handleClose(index)}
                  >
                    <CloseIcon className="text-sm" />
                  </Button>
                </Flex>

                <Flex vertical>
                  <Typography.Title level={5}>{val.title}</Typography.Title>

                  {val.description.map((desc) => (
                    <Typography.Text key={desc}>{desc}</Typography.Text>
                  ))}
                </Flex>
              </Flex>
            )
        )}
      </Flex>
    </Flex>
  )
}

export default VerificationCompletion
