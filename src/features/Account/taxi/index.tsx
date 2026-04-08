import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import { useTranslations } from 'next-intl'
import NoDataBooking from '../components/Booking/NoDataBooking'
import PageHeader from '../components/PageHeader'
import TaxiBookingCard from './components/taxi-booking-card'
import { useQuery } from '@tanstack/react-query'
import { getTaxiOrders } from '../api'
import { Divider } from 'antd'

export default function TaxiBookings() {
  const t = useTranslations()
  const breadCrumbItems = [
    { title: t('preferences.main'), href: '/' },
    { title: t('booking.title') },
  ]

  const { data: orders, isLoading } = useQuery({
    queryKey: ['taxiOrders'],
    queryFn: getTaxiOrders,
  })

  return (
    <AccountMainLayout menuType="booking" breadCrumbItems={breadCrumbItems}>
      <div className="h-full">
        <PageHeader title={t('booking.my-bookings')} description={t('booking.description')} />

        {isLoading && <p>Loading...</p>}
        {Array.isArray(orders?.results) && orders.count > 0
          ? orders?.results.map((order, idx) => (
              <>
                <TaxiBookingCard key={order.id || idx} order={order} />
                <Divider />
              </>
            ))
          : !isLoading && <NoDataBooking />}
      </div>
    </AccountMainLayout>
  )
}
