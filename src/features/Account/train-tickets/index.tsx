import { Button } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'
import { useTranslations } from 'next-intl'

import { getRailwayOrders } from '@/features/TrainsItem/api'
import { useMainSearchFormsStore } from '@/store/main-search-forms'

import PageHeader from '../components/PageHeader'
import ArrowLeftIcon from '@/components/icons/arrow-left'
import ActiveTrainCard from './components/ActiveTrainCard'
import TrainBookingCard from './components/TrainBookingCard'
import NoDataBooking from '../components/Booking/NoDataBooking'
import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'

function TrainsTickets() {
  const t = useTranslations()
  const { pathname, push, query } = useRouter()
  const { setCurrentTab } = useMainSearchFormsStore()

  const { data } = useQuery({
    queryKey: ['railway-orders'],
    queryFn: () => getRailwayOrders(),
    gcTime: 0,
    staleTime: 0,
  })

  const activeOrder = data?.results?.find((val) => val.id === Number(query?.id || '0'))

  return (
    <AccountMainLayout
      menuType="booking"
      breadCrumbItems={[{ title: t('preferences.main'), href: '/' }, { title: t('booking.title') }]}
    >
      <div className={twMerge('flex flex-col', activeOrder ? 'gap-6' : 'gap-2')}>
        {activeOrder ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <Button
                icon={<ArrowLeftIcon className="text-[24px]" />}
                type="text"
                className="text-secondary"
                onClick={() => push({ pathname })}
              />
              <PageHeader
                title={t('booking.my-bookings')}
                description={!activeOrder ? t('booking.description') : undefined}
              />
            </div>
            {activeOrder?.ticket_file ? (
              <a href={activeOrder.ticket_file} target="_blank" rel="noopener noreferrer">
                <Button>{t('transport.open-pdf-ticket')}</Button>
              </a>
            ) : (
              <Button disabled={!activeOrder.ticket_file}>{t('transport.open-pdf-ticket')}</Button>
            )}
          </div>
        ) : (
          <PageHeader title={t('booking.my-bookings')} description={t('booking.description')} />
        )}

        <div className="flex flex-col gap-5">
          {activeOrder?.passengers?.map((val, i) => (
            <ActiveTrainCard key={val.id} orderNumber={i + 1} {...val} data={activeOrder} />
          ))}
        </div>

        {!activeOrder && (
          <div className="flex flex-col gap-6">
            {data?.results?.map((val) => (
              <TrainBookingCard key={`main-railway-order-card-${val.id}`} {...val} />
            ))}
          </div>
        )}
      </div>

      {data && !data?.count && <NoDataBooking onClick={() => setCurrentTab('train')} />}
    </AccountMainLayout>
  )
}

export default TrainsTickets
