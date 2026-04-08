import { useTranslations } from 'next-intl'

import { useMainSearchFormsStore } from '@/store/main-search-forms'

import StatusPopup from '@/components/common/StatusPopup'
import LoadingIcon from '@/components/icons/loading'
import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import { Flex, Typography } from 'antd'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import NoDataBooking from '../components/Booking/NoDataBooking'
import { getBusTickets } from './api'
import BusTicketCard from './components/bus-ticket-card'
import BusTicketModal from './components/bus-ticket-modal'

function BusTickets() {
  const t = useTranslations()
  const { setCurrentTab } = useMainSearchFormsStore()
  const [tripId, setTripId] = useState<number | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['bus-tickets'],
    queryFn: getBusTickets,
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
      <div className="flex h-full flex-col">
        <Typography.Title level={3} className="text-2xl">
          {t('booking.bus-tickets')}
        </Typography.Title>
        <Typography.Paragraph className="text-sm text-secondary">
          {t('booking.no-booking')}
        </Typography.Paragraph>
        {data?.results?.length === 0 && <NoDataBooking onClick={() => setCurrentTab('bus')} />}
        {isLoading && (
          <Flex justify="center" className="mt-[150px]">
            <StatusPopup
              icon={<LoadingIcon className="animate-spin text-[40px]" />}
              title={t('others.loading')}
              description={t('others.loading-description')}
            />
          </Flex>
        )}
        {!isLoading && (
          <div className="flex flex-col gap-4">
            {data?.results?.map((item) => (
              <BusTicketCard trip={item} key={item?.id} onPrint={setTripId} />
            ))}
          </div>
        )}
        <BusTicketModal tripId={tripId || 0} open={!!tripId} onCancel={() => setTripId(null)} />
      </div>
    </AccountMainLayout>
  )
}

export default BusTickets
