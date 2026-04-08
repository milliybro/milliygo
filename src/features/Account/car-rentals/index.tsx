import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import { useCarRentalOrder } from '@/features/RentCarItem/model/car-rental-order'
import { useTranslations } from 'next-intl'
import NoDataBooking from '../components/Booking/NoDataBooking'
import PageHeader from '../components/PageHeader'
import CarRentalBookingCard from './components/car-rental-booking-card'

export default function CarRentalBookings() {
  const t = useTranslations()
  const { order } = useCarRentalOrder()
  const breadCrumbItems = [
    { title: t('preferences.main'), href: '/' },
    { title: t('booking.title') },
  ]

  return (
    <AccountMainLayout menuType="booking" breadCrumbItems={breadCrumbItems}>
      <div className="flex h-full flex-col">
        <PageHeader title={t('booking.my-bookings')} description={t('booking.description')} />
        {order !== null && <CarRentalBookingCard />}
        {order === null && <NoDataBooking />}
      </div>
    </AccountMainLayout>
  )
}
