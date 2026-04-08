import { Button } from 'antd'
import { useTranslations } from 'next-intl'

import usePdfGenerator from '@/hooks/usePdfGenerator'

import CBreadcrumb from '@/components/common/CBreadcrumb'
import { useAuthStore } from '@/features/Account/auth/store/authStore'
import AdditionalNotes from './additional-notes'
import DetailsFacilities from './details-facilities'
import DetailsHeader from './details-header'
import DetailsHotelInformation from './details-hotel-information'
import DetailsMap from './details-map'
import DetailsPriceInformation from './details-price-information'
import DetailsRoomsInformation from './details-rooms-information'
import SpecialRequest from './special-request'
import { useBookingStore } from './store/useBookingStore'
import WelcomeText from './welcome-text'

const HotelBookingDetails = () => {
  const t = useTranslations()

  const { bookingData } = useBookingStore()

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const fileName = `${bookingData?.data?.placement?.name}_${bookingData?.data?.start_date}_${bookingData?.data?.end_date}.pdf`
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
    <>
      <div className="bg-secondary-light">
        <CBreadcrumb items={items} />
        <div
          ref={contentRef}
          className="container flex flex-col divide-y divide-[#B7BFD530] rounded-[24px] bg-white"
        >
          <DetailsHeader data={bookingData?.data} />
          <DetailsHotelInformation data={bookingData?.data} />
          <WelcomeText hotelName={bookingData?.data?.placement?.name} data={bookingData?.data} />
          <DetailsRoomsInformation />
          <DetailsFacilities data={bookingData?.data} />
          <DetailsMap data={bookingData?.data} />
          <SpecialRequest />
          <DetailsPriceInformation data={bookingData?.data} />
          <AdditionalNotes hotelName={bookingData?.data?.placement?.name} />
        </div>
        <div className="flex justify-center p-6">
          <Button
            type="primary"
            size="large"
            aria-label={t('booking.print-booking')}
            onClick={generatePdf}
            loading={isLoading}
          >
            {t('booking.print-booking')}
          </Button>
        </div>
      </div>
    </>
  )
}

export default HotelBookingDetails
