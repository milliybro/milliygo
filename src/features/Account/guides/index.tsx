import { useTranslations } from 'next-intl'
import { useMainSearchFormsStore } from '@/store/main-search-forms'

import NoDataBooking from '../components/Booking/NoDataBooking'
import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'

function Guides() {
  const t = useTranslations()
  const { setCurrentTab } = useMainSearchFormsStore()

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
      <NoDataBooking onClick={() => setCurrentTab('guide')} />
    </AccountMainLayout>
  )
}

export default Guides
