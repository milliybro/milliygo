import { Flex, MenuProps, Spin, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { getBookingsItem } from '../api'
import { useBookingId } from '@/features/HotelsItemSteps/hooks/useBookingId'
import PageHeader from '../components/PageHeader'
import { useTranslations } from 'next-intl'
import NoDataBooking from '../components/Booking/NoDataBooking'
import dayjs from 'dayjs'
import BookingItem from '../components/Booking/BookingItem'
import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import { getItem } from '@/helpers/menu-get-item'
import BriefcaseIcon from '@/components/icons/briefcase'

function SingleBooking() {
  const { bookingId } = useBookingId()
  const t = useTranslations()
  const {
    data: item,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['single-booking', bookingId],
    queryFn: async () => {
      if (!bookingId) return null

      return await getBookingsItem(bookingId)
    },
    enabled: !!bookingId,
  })

  const items: MenuProps['items'] = [
    getItem(t('booking.title'), '/account/check-booking', <BriefcaseIcon className="text-2xl" />),
  ]

  return (
    <AccountMainLayout
      breadCrumbItems={[
        {
          title: t('preferences.main'),
          href: '/',
        },
        {
          title: t('booking.title'),
          href: '/account/check-booking',
        },
      ]}
      menuItems={items}
    >
      <div className="container flex items-center justify-center">
        <Spin spinning={isLoading}>
          {item ? (
            <Flex vertical gap={24}>
              <PageHeader title={t('booking.my-bookings')} description={t('booking.description')} />
              <Flex vertical gap={48}>
                <Flex vertical>
                  <Flex vertical className="mb-[24px]">
                    <Typography.Title level={5}>{item?.placement?.address}</Typography.Title>
                    <Typography>
                      {t('booking.booking-period')}: {dayjs(item.start_date).format('DD MMM YYYY')}{' '}
                      {' - '} {dayjs(item.end_date).format('DD MMM YYYY')}
                    </Typography>
                  </Flex>

                  <Flex vertical className="gap-4">
                    <BookingItem booking={item} refetch={refetch} href="/account/booking/" />
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          ) : (
            <NoDataBooking />
          )}
        </Spin>
      </div>
    </AccountMainLayout>
  )
}

export default SingleBooking
