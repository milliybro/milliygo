import CBreadcrumb from '@/components/common/CBreadcrumb'
import { BreadcrumbProps, Button, Divider } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'

import usePdfGenerator from '@/hooks/usePdfGenerator'
import TourBookingHeader from '@/features/Account/tour-booking-item/components/tour-booking-header'
import TourBookingOverview from '@/features/Account/tour-booking-item/components/tour-booking-overview'
import TourBookingTouristText from '@/features/Account/tour-booking-item/components/tour-booking-tourist-text'
import TourBookingInfoCards from '@/features/Account/tour-booking-item/components/tour-booking-info-cards'
import TourBookingMeetingPoint from '@/features/Account/tour-booking-item/components/tour-booking-meeting-point'
import { useBookingStore } from './store/useBookingStore'
import TourBookingDetails from '@/features/Account/tour-booking-item/components/tour-booking-details'

export default function TourBookingDetail() {
  const t = useTranslations()
  const { query } = useRouter()
  const { contentRef, generatePdf, isLoading } = usePdfGenerator(
    'tour-booking-' + (query.tourId || 'null')
  )

  const { bookingData } = useBookingStore()

  const breadCrumbs: BreadcrumbProps['items'] = [
    {
      title: t('preferences.main'),
      href: '/account',
    },
    {
      title: t('booking.title'),
      href: '/account/tours',
    },
    {
      title: t('booking.view-details'),
    },
  ]

  return (
    <div className="container">
      <CBreadcrumb items={breadCrumbs} className="font-medium" />
      <div className="mx-auto max-w-[950px] rounded-3xl bg-white">
        <div className="flex flex-col gap-5 p-6" ref={contentRef}>
          <TourBookingHeader order={bookingData?.data} />
          <Divider className="m-0" />
          <TourBookingOverview order={bookingData?.data} />
          <Divider className="m-0" />
          <TourBookingTouristText order={bookingData?.data} />
          <Divider className="m-0" />
          <TourBookingInfoCards order={bookingData?.data} />
          <Divider className="m-0" />
          <TourBookingDetails order={bookingData?.data} />

          <TourBookingMeetingPoint />
        </div>
        <div className="p-6 pt-0">
          <Divider className="m-0 mb-5" />
          <Button
            className="mx-auto"
            type="primary"
            size="large"
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
