import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import NoDataBooking from '../components/Booking/NoDataBooking'
import { useTranslations } from 'next-intl'
import { useQuery } from '@tanstack/react-query'
import { getAviaOrders } from '../api'
import AviaorderCardRound from './components/AviaorderCardRound'
import AviaOrderCard from './components/AviaOrderCard'

function AirLineTickets() {
  const t = useTranslations()

  const { data: orders } = useQuery({
    queryKey: ['avia-orders'],
    queryFn: getAviaOrders,
  })

  const data = orders?.results

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
      <div className="flex h-full flex-col gap-6">
        {Array.isArray(data) && data?.length ? (
          data.map((item: any, index: number) => {
            if (item?.with_rt === true) {
              return <AviaorderCardRound key={index + '-round'} data={item} />
            }

            if (item?.with_rt === false) {
              return (item?.flights || []).map((flight: any, i: number) => (
                <AviaOrderCard key={index + '-' + i + '-single'} data={item} destination={flight} />
              ))
            }

            return null
          })
        ) : (
          <NoDataBooking />
        )}
      </div>
    </AccountMainLayout>
  )
}

export default AirLineTickets
