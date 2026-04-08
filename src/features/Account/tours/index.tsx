import { useTranslations } from 'next-intl'

import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import { Flex, Spin, Typography } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import NoDataBooking from '../components/Booking/NoDataBooking'
import PageHeader from '../components/PageHeader'
import { getTourAgentOrders } from './api'
import TourOrderCard from './components/tour-order-card'

function ToursBooking() {
  const t = useTranslations()
  const { query } = useRouter()
  const { data, isFetching } = useQuery({
    queryKey: ['notifications-categories', query.type],
    queryFn: (context) => getTourAgentOrders(context),
  })

  return (
    <AccountMainLayout
      menuType="booking"
      breadCrumbItems={[
        {
          title: t('preferences.main'),
          href: '/',
        },
        {
          title: t('booking.title'),
        },
      ]}
    >
      <div className="mb-6">
        <PageHeader title={t('booking.my-bookings')} description={t('booking.description')} />
      </div>
      <Spin spinning={isFetching}>
        {data?.results?.length ? (
          <Flex vertical gap={48}>
            {data?.results?.map((item, index) => (
              <Flex key={index} vertical>
                <Flex vertical className="mb-[24px]">
                  <Typography.Title level={5}>{item?.tour?.regions?.[0] || ''}</Typography.Title>
                  <Typography>
                    {t('booking.booking-period')}:{' '}
                    {dayjs(item?.tour?.start_date).format('DD MMM YYYY')} {' - '}{' '}
                    {dayjs(item?.tour?.end_date).format('DD MMM YYYY')}
                  </Typography>
                </Flex>

                <Flex vertical className="gap-4">
                  <TourOrderCard order={item} />
                </Flex>
              </Flex>
            ))}
          </Flex>
        ) : (
          <NoDataBooking />
        )}
      </Spin>
    </AccountMainLayout>
  )
}

export default ToursBooking
