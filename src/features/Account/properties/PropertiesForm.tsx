import CBreadcrumb from '@/components/common/CBreadcrumb'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import CheckingIcon from '@/components/icons/checking-icon'
import DetailedIcon from '@/components/icons/detailed-icon'
import GalleryIcon from '@/components/icons/gallery-icon'
import MainInformationIcon from '@/components/icons/main-information-icon'
import MapIcon from '@/components/icons/map-icon'
import ScheduleIcon from '@/components/icons/schedule-icon'
import AddressObject from '@/features/Account/components/MyProperties/AddressObject/AddressObject'
import DetailedObject from '@/features/Account/components/MyProperties/DetailedObjects/DetailedObject'
import Images from '@/features/Account/components/MyProperties/Images/Images'
import MainInformation from '@/features/Account/components/MyProperties/MainInformation/MainInformation'
import Schedule from '@/features/Account/components/MyProperties/Schedule/Schedule'
import VerificationCompletion from '@/features/Account/components/MyProperties/VerificationCompletion/VerificationCompletion'
import { getItem } from '@/helpers/menu-get-item'
import { Card, Col, Divider, Menu, MenuProps, Row } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { getImagesPlacements } from '../api'
import { getByidPlacement, getByidRoom } from '../components/MyProperties/api'
import { getCurrencies } from '@/api'

interface IProps {
  queryId: string
  typeId?: string
}

function PropertiesForm({ queryId, typeId }: IProps) {
  const router = useRouter()
  const menuRef = useRef(null)
  const [activeTab, setActiveTab] = useState<string>('detailed-object')
  const form = useForm()
  const [placementInfo, setPlacementInfo] = useState<any>({})
  const [roomInfo, setRoomInfo] = useState<any>({})
  const [images, setImages] = useState<any>([])
  const t = useTranslations()
  const [errors, setErrors] = useState<any>({})

  const accId = router.query?.property

  const { data: currencies = [] } = useQuery({
    queryKey: ['currencies'],
    queryFn: getCurrencies,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    select: (data) =>
      data.map((item: any) => ({ label: item.short_name, value: item.id, rate: item.rate })),
  })

  const { data: placement = {} } = useQuery({
    queryKey: ['getByIdPlacement', queryId],
    queryFn: () => getByidPlacement(queryId),
    refetchOnWindowFocus: false,
    enabled: queryId !== 'create',
  })

  useEffect(() => {
    if (placement) {
      setPlacementInfo(placement)
    }
  }, [placement])

  const { data: roomData } = useQuery({
    queryKey: ['getDataRoom', queryId],
    queryFn: () => getByidRoom(queryId),
    refetchOnWindowFocus: false,
    enabled: queryId !== 'create',
  })

  useEffect(() => {
    if (roomData) {
      setRoomInfo(roomData?.results?.[0])
    }
  }, [roomData])

  const { data: imagesData } = useQuery({
    queryKey: ['getDataImages', queryId],
    queryFn: () => getImagesPlacements(queryId),
    refetchOnWindowFocus: false,
    enabled: queryId !== 'create',
  })

  useEffect(() => {
    if (imagesData) {
      setImages(imagesData?.results)
    }
  }, [imagesData])

  useEffect(() => {
    if (placementInfo && roomInfo && images) {
      form.reset({
        detailedObject: {
          nameObject: placementInfo?.name,
          description: placementInfo?.description,
        },
        address: {
          street: placementInfo?.address,
          coordinates: [placementInfo?.lat, placementInfo?.long],
          zip: placementInfo?.post_code,
          country: placementInfo?.country_id,
          city: placementInfo?.region_id,
          district: placementInfo?.district_id,
        },
        mainInformation: {
          checkInFrom: placementInfo?.checkin_start,
          checkInTo: placementInfo?.checkin_end,
          checkOutFrom: placementInfo?.checkout_start,
          checkOutTo: placementInfo?.checkout_end,
          breakfast: placementInfo?.breakfast === 1 ? true : false,
          parking: placementInfo?.parking,
          bedroom: roomInfo?.bedrooms,
          bathroom: roomInfo?.bathrooms,
          person_count: roomInfo?.person_count,
          room_floor: roomInfo?.room_floor,
          floor_count: roomInfo?.floor_count,
          area: roomInfo?.area,
          stayWithChildren: roomInfo?.children_allowed,
          provideKidCots: roomInfo?.crib_provided,
          prohibitions: placementInfo?.prohibitions,
          placement: placementInfo?.facilities,
          room: roomInfo?.facilities?.map((item: any) => item.id),
          accommodation_id: placementInfo ? placementInfo?.accommodation_id : Number(accId),
        },
        schedule: {
          freeCancellation: placementInfo?.free_booking_cancellation,
          protectionBooking: placementInfo?.accidental_booking_protection,
          paymentTypes: placementInfo?.payment_types,
          price: roomInfo?.price,
          currency: roomInfo?.currency_id?.currency_price,
          startDate: placementInfo?.published_at,
          readyToGuests: 2,
          allowLongTerm: placementInfo?.long_stay_allowed,
        },
        legacy: {
          firstAgreement: placementInfo?.legal_property,
          secondAgreement: placementInfo?.general_terms,
        },
        images: images.map((image: any) => {
          return {
            ...image,
            isMain: placementInfo?.image === image?.image,
          }
        }),
        type: placementInfo?.type_id,
      })
    }
  }, [roomInfo, placementInfo, images])

  useEffect(() => {
    if (queryId === 'create') {
      form.reset({
        images: [],
        mainInformation: {
          bedroom: 1,
          bathroom: 1,
          room_floor: 1,
          floor_count: 1,
          person_count: 1,
          provideKidCots: true,
          stayWithChildren: true,
          breakfast: false,
          room: [],
          placement: [],
          prohibitions: [],
        },
        schedule: {
          currency: 1,
          isDiscounted: false,
          freeCancellation: 0,
          protectionBooking: false,
          secondAgreement: false,
          readyToGuests: 1,
          startDate: new Date(),
        },
      })
    }
  }, [])

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'properties') {
      router.push(`/account/properties`)
    } else {
      setActiveTab(e.key)
    }
  }

  const menuItems: MenuProps['items'] = [
    getItem(t('my-properties.my-properties'), 'properties', <ArrowLeftIcon className="text-lg" />),
    getItem(
      t('my-properties.detail-object'),
      `detailed-object`,
      <DetailedIcon className="text-xl !text-[#777E90]" />
    ),
    getItem(
      t('my-properties.address-object'),
      `address-object`,
      <MapIcon className="text-[22px] !text-[#777E90]" />
    ),
    getItem(
      t('my-properties.main-information'),
      `main-information`,
      <MainInformationIcon className="mr-[2px] text-[22px] !text-[#777E90]" />
    ),
    getItem(
      t('my-properties.images'),
      `images`,
      <GalleryIcon className="text-[22px] !text-[#777E90]" />
    ),
    getItem(
      t('my-properties.prices-and-calendar'),
      `schedule`,
      <ScheduleIcon className="text-[22px] !text-[#777E90]" />
    ),
    getItem(
      t('my-properties.check-finish'),
      `verification-completion`,
      <CheckingIcon className="text-[22px] !text-[#777E90]" />
    ),
  ]

  const stepComponents = (() => {
    switch (activeTab) {
      case 'detailed-object':
        return <DetailedObject form={form} setActiveTab={setActiveTab} errors={errors} />
      case 'address-object':
        return <AddressObject form={form} setActiveTab={setActiveTab} errors={errors} />
      case 'main-information':
        return (
          <MainInformation
            placement={placement}
            errors={errors}
            form={form}
            setActiveTab={setActiveTab}
            typeId={typeId}
          />
        )
      case 'images':
        return <Images form={form} setActiveTab={setActiveTab} queryId={queryId} />
      case 'schedule':
        return (
          <Schedule
            form={form}
            setActiveTab={setActiveTab}
            errors={errors}
            currencies={currencies}
            placementInfo={placementInfo}
          />
        )
      case 'verification-completion':
        return (
          <VerificationCompletion
            form={form}
            queryId={queryId}
            setActiveTab={setActiveTab}
            setErrors={setErrors}
            errors={errors}
            currencies={currencies}
            placementInfo={placementInfo}
          />
        )
    }
  })()

  return (
    <div className="container">
      <CBreadcrumb
        items={[
          {
            title: t('preferences.main'),
            href: '/',
          },
          {
            title: t('my-properties.title'),
            href: '/account/properties',
          },
          {
            title: queryId === 'create' ? t('my-properties.new-object') : t('my-properties.title'),
          },
        ]}
      />
      <Card
        variant="borderless"
        className="h-full min-h-[700px] overflow-hidden !rounded-[24px] !shadow-none"
        style={{ padding: 0 }}
      >
        <Row className="h-full">
          <Col span={6}>
            <div className="p-6 pr-0">
              <Menu
                ref={menuRef}
                className="flex flex-col gap-4 !border-none before:hidden after:hidden [&>li]:font-medium [&>li]:text-primary-dark"
                onClick={onClick}
                defaultSelectedKeys={[activeTab]}
                selectedKeys={[activeTab]}
                mode="inline"
                items={menuItems}
              />
            </div>
          </Col>
          <Col span={1} className="flex justify-center">
            <Divider type="vertical" className="m-0 h-full !border-[#F8F8FA]" />
          </Col>
          <Col span={17}>
            <div className="p-6 pl-0">{stepComponents}</div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default PropertiesForm
