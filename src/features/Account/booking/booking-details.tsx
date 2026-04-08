import { Button } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

import { getBookingsItem } from '@/features/Account/api'
import usePdfGenerator from '@/hooks/usePdfGenerator'

import CBreadcrumb from '@/components/common/CBreadcrumb'
import { useAuthStore } from '../auth/store/authStore'
import DetailsHeader from './containers/details-header'
import DetailsHotelInformation from './containers/details-hotel-information'
import DetailsPriceInformation from './containers/details-price-information'
import DetailsRoomsInformation from './containers/details-rooms-information'
import WelcomeText from './containers/welcome-text'
import DetailsMap from './components/details-map'
import DetailsFacilities from './containers/details-facilities'
import SpecialRequest from './containers/special-request'
import AdditionalNotes from './containers/additional-notes'
import { useMediaQuery } from '@/utils/useMediaQuery'

const BookingDetails = () => {
  const t = useTranslations()
  const { query } = useRouter()
  const isMedium = useMediaQuery('(max-width: 768px)')

  const { data } = useQuery({
    queryKey: ['bookings-detail'],
    queryFn: () => getBookingsItem(query.bookingId as any),
    enabled: Boolean(Number(query.bookingId)),
  })

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const fileName = `${data?.placement?.name}_${data?.start_date}_${data?.end_date}.pdf`
  const { contentRef, isLoading, generatePdf } = usePdfGenerator(fileName)

  const items = [
    {
      title: t('preferences.main'),
      href: isAuthenticated ? '/account/account-management/' : '/',
    },
    {
      title: t('booking.title'),
      href: isAuthenticated ? '/account/booking' : '/account/check-booking',
    },
    {
      title: t('booking.view-details'),
    },
  ]

  return (
    <div className="bg-secondary-light">
      <div className="container">
        <CBreadcrumb items={items} />
        <div
          ref={contentRef}
          className="container flex flex-col divide-y divide-[#B7BFD530] rounded-[24px] bg-white"
        >
          <DetailsHeader />
          <DetailsHotelInformation />
          <WelcomeText
            hotelName={data?.placement?.name}
            fullName={`${data?.first_name} ${data?.last_name}`}
          />
          <DetailsRoomsInformation />
          <DetailsFacilities />
          <DetailsMap />
          <SpecialRequest />
          <DetailsPriceInformation />
          <AdditionalNotes hotelName={data?.placement?.name} />
        </div>
        <div className="flex justify-center p-6">
          <Button
            type="primary"
            size={isMedium ? 'middle' : 'large'}
            aria-label={t('booking.print-booking')}
            onClick={generatePdf}
            loading={isLoading}
          >
            {t('booking.print-booking')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BookingDetails
