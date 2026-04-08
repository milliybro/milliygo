import { useRouter } from 'next/router'

import { useTranslations } from 'next-intl'
import dayjs from 'dayjs'
import { Flex, Spin, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'

import { getBookings } from '../api'

import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import BookingItem from '@/features/Account/components/Booking/BookingItem'
import NoDataBooking from '@/features/Account/components/Booking/NoDataBooking'
import PageHeader from '@/features/Account/components/PageHeader'

const placementTypeMap: any = {
  apartment: '1',
  hotel: '3',
  sanatorium: '4',
  hostel: '5',
}

function Booking() {
  const t = useTranslations()
  const { query } = useRouter()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['notifications-categories', query.type],
    queryFn: () =>
      getBookings({
        placement__type: placementTypeMap?.[query?.type as string],
      }),
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
      <div className="mb-4 md:mb-6">
        <PageHeader title={t('booking.my-bookings')} description={t('booking.description')} />
      </div>
      <Spin spinning={isLoading}>
        {data?.results?.length ? (
          <Flex vertical gap={48}>
            {data?.results.map((item, index: number) => (
              <Flex key={index} vertical>
                <Flex vertical className="mb-[24px]">
                  <Typography.Title level={5} className="translate">
                    {item?.placement?.address}
                  </Typography.Title>
                  <Typography>
                    {t('booking.booking-period')}: {dayjs(item.start_date).format('DD MMM YYYY')}{' '}
                    {' - '} {dayjs(item.end_date).format('DD MMM YYYY')}
                  </Typography>
                </Flex>

                <Flex vertical className="gap-4">
                  <BookingItem booking={item} refetch={refetch} />
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

export default Booking
