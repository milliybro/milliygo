import { BreadcrumbProps, Button, Card, Col, Divider, Menu, MenuProps, Row } from 'antd'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'

import CBreadcrumb from '@/components/common/CBreadcrumb'

import AirplaneIcon from '@/components/icons/airplane-icon'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import BriefcaseIcon from '@/components/icons/briefcase'
import BusIcon2 from '@/components/icons/bus-icon2'
import CarIcon from '@/components/icons/car-icon'
import CommentIcon from '@/components/icons/comment'
import ComplaintIcon from '@/components/icons/complaints-icon'
import GuideIcon from '@/components/icons/guide-icon'
import HeartIcon from '@/components/icons/heart-icon'
import HotelIcon from '@/components/icons/hotel'
import MapsLocationIcon from '@/components/icons/maps-location'
import NotificationIcon from '@/components/icons/notification'
import SpeedTrainIcon from '@/components/icons/speed-train'
import TouristWithCameraIcon from '@/components/icons/tourist-with-camera'
import UserCircleIcon from '@/components/icons/user-circle'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { getItem } from '@/helpers/menu-get-item'
import { ItemType } from 'antd/es/menu/interface'
import { getCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import type { ReactElement, ReactNode } from 'react'

interface AuthStore {
  logout: () => void
  userInfo: {
    id: number
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

interface IProps {
  breadCrumbItems?: BreadcrumbProps['items']
  menuItems?: MenuProps['items']
  menuType?: 'default' | 'booking'
  children: ReactNode
}

export default function AccountMainLayout({
  breadCrumbItems,
  menuItems,
  children,
  menuType,
}: IProps): ReactElement {
  const menuRef = useRef(null)
  const router = useRouter()
  const pathname = usePathname()
  const activeTab = pathname.slice(0, -1)
  const t = useTranslations()
  const [userInformation, setUserInfo] = useState<any | null>(null)

  const authContext = useContext(AuthContext)
  const { authStore } = authContext as { authStore: AuthStore }
  const { userInfo } = authStore


  useEffect(() => {
    const dataUser = JSON.parse((getCookie('userInfo') as string) || '{}')
    setUserInfo(dataUser)
  }, [])
  let defaultItems: MenuProps['items'] = [
    getItem(
      t('account-management.title'),
      '/account/account-management',
      <UserCircleIcon className="text-2xl text-secondary" />
    ),
    getItem(
      t('booking.title'),
      '/account/booking',
      <BriefcaseIcon className="text-2xl text-secondary" />
    ),
    getItem(
      t('reviews.title'),
      '/account/reviews',
      <CommentIcon className="text-2xl text-secondary" />
    ),
    getItem(
      t('others.notifications'),
      '/account/notifications',
      <NotificationIcon className="text-2xl text-secondary" />
    ),
    getItem(
      t('others.saved'),
      '/account/favorites',
      <HeartIcon className="text-2xl text-secondary" />
    ),
    getItem(
      t('account-complaints.title'),
      '/account/complaints',
      <ComplaintIcon className="text-2xl text-secondary" />
    ),
  ]

  const bookingItems: MenuProps['items'] = useMemo(
    () => [
      getItem(
        t('buttons.back'),
        '/account/account-management',
        <ArrowLeftIcon className="text-2xl text-secondary" />
      ),
      getItem(
        t('booking.residence'),
        '/account/booking',
        <HotelIcon className="text-2xl text-secondary" />,
        [
          getItem(
            t('booking.hotels'),
            '/account/booking?type=hotel',
            <HotelIcon className="text-2xl text-secondary" />
          ),

          getItem(
            t('booking.hostel'),
            '/account/booking?type=hostel',
            <HotelIcon className="text-2xl text-secondary" />
          ),
          getItem(
            t('booking.apartment'),
            '/account/booking?type=apartment',
            <HotelIcon className="text-2xl text-secondary" />
          ),
          getItem(
            t('booking.sanatorium'),
            '/account/booking?type=sanatorium',
            <HotelIcon className="text-2xl text-secondary" />
          ),
        ]
      ),
      getItem(
        t('booking.airline-tickets'),
        '/account/airline-tickets',
        <AirplaneIcon className="text-2xl text-secondary" />
      ),
      getItem(
        t('booking.train-tickets'),
        '/account/train-tickets',
        <SpeedTrainIcon className="text-2xl text-secondary" />
      ),
      getItem(
        t('booking.bus-tickets'),
        '/account/bus-tickets',
        <BusIcon2 className="text-2xl text-secondary" />
      ),
      getItem(
        t('travel-package.taxi'),
        '/account/taxi',
        <CarIcon className="text-2xl text-secondary" />
      ),
      getItem(
        t('routes.tours'),
        '/account/tours',
        <MapsLocationIcon className="text-2xl text-secondary" />
      ),
      getItem(
        t('booking.excursions'),
        '/account/excursions',
        <TouristWithCameraIcon className="text-2xl text-secondary" />
      ),
      getItem(
        t('booking.guides'),
        '/account/guides',
        <MapsLocationIcon className="text-2xl text-secondary" />
      ),
      getItem(
        t('booking.museum-tickets'),
        '/account/museum-tickets',
        <HotelIcon className="text-2xl text-secondary" />
      ),
      getItem(
        t('rent-car.rent'),
        '/account/car-rentals',
        <CarIcon className="text-2xl text-secondary" />
      ),
    ],
    []
  )

  const finalItems: Record<'default' | 'booking', ItemType[] | undefined> = {
    booking: bookingItems,
    default: defaultItems,
  }
  const contentRef = useRef<HTMLDivElement>(null)

  const permissionForCreatingApartment = userInformation?.groups?.find(
    (group: any) => group.name === 'Apartment create'
  )

  if (permissionForCreatingApartment) {
    defaultItems.splice(
      2,
      0,
      getItem(
        t('my-properties.title'),
        '/account/properties',
        <HotelIcon className="text-2xl text-secondary" />
      )
    )
  }

  const onClick: MenuProps['onClick'] = (e) => {
    e.domEvent.preventDefault()

    router.push(e.key, undefined, { shallow: true })

    if (window.innerWidth < 768) {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="container mb-20">
      <CBreadcrumb items={breadCrumbItems} />
      <Card
        variant="borderless"
        className="h-full min-h-[700px] overflow-hidden !rounded-[24px] !shadow-none"
        style={{ padding: 0 }}
      >
        <Row className="h-full min-h-[700px] dmd:grid-cols-1" gutter={[16, 16]} wrap>
          <Col span={6} xs={24} md={6}>
            <div className="flex h-full flex-col">
              <Menu
                ref={menuRef}
                className="flex h-full select-none flex-col gap-4 !border-none before:hidden after:hidden [&>li]:font-medium [&>li]:text-primary-dark"
                onClick={onClick}
                defaultSelectedKeys={[activeTab]}
                mode="inline"
                items={menuItems ? menuItems : finalItems[menuType || 'default']}
                rootClassName="custom-menu"
              />

            </div>
          </Col>
          <Col span={1} xs={24} md={1} className="flex justify-center">
            <Divider type="vertical" className="m-0 h-full !border-[#F8F8FA]" />
          </Col>
          <Col span={17} xs={24} md={17}>
            <div ref={contentRef} className="h-full">
              {children}
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
