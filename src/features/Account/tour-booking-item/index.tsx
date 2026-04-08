import CBreadcrumb from '@/components/common/CBreadcrumb'
import { BreadcrumbProps, Button, Divider } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'
import { getTourBooking } from './api'
import TourBookingHeader from './components/tour-booking-header'
import TourBookingMeetingPoint from './components/tour-booking-meeting-point'
import usePdfGenerator from '@/hooks/usePdfGenerator'
import TourBookingTouristInfo from './components/tour-booking-tourist-info'
import TourBookingTransport from './components/tour-booking-transport'
import TourBookingContacts from './components/tour-booking-contacts'

export default function TourBookingItem() {
  const t = useTranslations()
  const { query } = useRouter()
  const tourId = query.tourId
  const { contentRef, generatePdf, isLoading } = usePdfGenerator(
    'tour-booking-' + (query.tourId || 'null')
  )

  const { data } = useQuery({
    queryKey: ['tour-booking', tourId],
    queryFn: (context) => getTourBooking(context, tourId as string),
  })

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
      <CBreadcrumb items={breadCrumbs} className="px-0 pb-[52px] font-medium" />
      <div className="rounded-3xl bg-white">
        <div className="flex flex-col gap-5 p-9" ref={contentRef}>
          <TourBookingHeader tourId={tourId} data={data} />
          <Divider className="m-0" />
          <TourBookingTouristInfo data={data} />
          <Divider className="m-0" />
          {/* <TourBookingLivingDetails />
          <Divider className="m-0" /> */}
          <TourBookingTransport data={data} />
          <Divider className="m-0" />
          <TourBookingContacts data={data} />
          <Divider className="m-0" />
          <TourBookingMeetingPoint
            latitude={data?.tour?.start_location?.lat}
            longitude={data?.tour?.start_location?.long}
          />
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
