import { useTranslations } from 'next-intl'

import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import { ListResponse } from '@/types'
import { Flex, Spin, Typography } from 'antd'
import dayjs from 'dayjs'
import { useQuery } from '@tanstack/react-query'
import NoDataBooking from '../components/Booking/NoDataBooking'
import PageHeader from '../components/PageHeader'
import { getExcursionOrders } from './api'
import ExcursionOrderCard from './components/excursion-order-card'
import { IExcursionOrder } from './types'

function Excursions() {
  const t = useTranslations()
  const { data, isLoading } = useQuery<ListResponse<IExcursionOrder[]>>({
    queryKey: ['excursion-booking'],
    queryFn: () => getExcursionOrders({ type: 'excursion' }), // agar params kerak bo‘lsa
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
      <Spin spinning={isLoading} wrapperClassName="h-full [&_.ant-spin-container]:h-full">
        {data?.count ? (
          <Flex vertical gap={24}>
            <PageHeader title={t('booking.my-bookings')} description={t('booking.description')} />
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
                    <ExcursionOrderCard order={item} />
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        ) : (
          <NoDataBooking />
        )}
      </Spin>
    </AccountMainLayout>
  )
}

export default Excursions
