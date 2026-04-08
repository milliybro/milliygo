import CBreadcrumb from '@/components/common/CBreadcrumb'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import BedDoubleIcon from '@/components/icons/bed-double'
import CalendarIcon from '@/components/icons/calendar'
import MessageMultipleIcon from '@/components/icons/message-multiple'
import PieChartIcon from '@/components/icons/pie-chart'
import ScheduleIcon from '@/components/icons/schedule-icon'
import { getItem } from '@/helpers/menu-get-item'
import { Card, Col, Divider, Menu, MenuProps, Row } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getByidPlacement } from '../components/MyProperties/api'
import DashboardObjectAnalytics from '../components/MyProperties/DashboardObject/DashboardObjectAnalytics'
import DashboardObjectBooking from '../components/MyProperties/DashboardObject/DashboardObjectBooking'
import DashboardObjectCalendar from '../components/MyProperties/DashboardObject/DashboardObjectCalendar'
import DashboardObjectChatting from '../components/MyProperties/DashboardObject/DashboardObjectChatting'
import DashboardObjectEarnings from '../components/MyProperties/DashboardObject/DashboardObjectEarnings'

export default function PropertiesDashboardMain({
  queryId,
  queryAction,
}: {
  queryId: string
  queryAction?: string
}) {
  const router = useRouter()
  const menuRef = useRef(null)
  const [activeTab, setActiveTab] = useState<string>(queryAction ?? 'analytics') //queryAction can be 'calendar' after object activation
  const t = useTranslations()

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'properties') {
      router.push(`/account/properties`)
    } else {
      setActiveTab(e.key)
    }
  }

  const { data: placement = {} } = useQuery({
    queryKey: ['getByIdPlacement', queryId],
    queryFn: () => getByidPlacement(queryId),
    refetchOnWindowFocus: false,
  })

  const menuItems: MenuProps['items'] = [
    getItem(t('my-properties.title'), 'properties', <ArrowLeftIcon className="text-lg" />),
    getItem(t('my-properties.analytics'), `analytics`, <PieChartIcon className="text-[#777E90]" />),
    getItem(t('booking.title'), `booking`, <BedDoubleIcon className="text-lg !text-[#777E90]" />),
    getItem(
      t('chatting.title'),
      `chatting`,
      <MessageMultipleIcon className="mr-[2px] text-[22px] text-[#777E90]" />
    ),
    getItem(
      t('calendar.title'),
      `calendar`,
      <CalendarIcon className="text-[22px] !text-[#777E90]" />
    ),
    getItem(
      t('earning.title'),
      `earning`,
      <ScheduleIcon className="text-[22px] !text-[#777E90]" />
    ),
  ]

  const stepComponents = (() => {
    switch (activeTab) {
      case 'analytics':
        return <DashboardObjectAnalytics placement={placement} queryId={queryId} />
      case 'booking':
        return <DashboardObjectBooking queryId={queryId} />
      case 'chatting':
        return <DashboardObjectChatting queryId={queryId} />
      case 'calendar':
        return <DashboardObjectCalendar queryId={queryId} />
      case 'earning':
        return <DashboardObjectEarnings queryId={queryId} />
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
            title: placement.name,
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
