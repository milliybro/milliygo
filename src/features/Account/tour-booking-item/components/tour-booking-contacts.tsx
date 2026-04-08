import { useTranslations } from 'next-intl'
import CustomerServiceIcon from '@/components/icons/customer-service-icon'
import SectionHeader from '@/features/Account/tour-booking-item/components/section-header'
import { IOrderDetail } from '../types'

type IProps = {
  data?: IOrderDetail
}

function formatUzPhone(phone: string) {
  if (!phone) return ''

  const cleaned = phone.replace(/\s+/g, '')

  const match = cleaned.match(/^(\+998)(\d{2})(\d{3})(\d{4})$/)
  if (!match) return phone

  return `${match[1]}${match[2]} ${match[3]} ${match[4]}`
}

const TourBookingContacts = ({ data }: IProps) => {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-3">
      <SectionHeader
        icon={<CustomerServiceIcon className="text-2xl text-[#2563EB]" />}
        title={t('tours.contact')}
        desc={t('tours.section-desc')}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
          <p className="text-sm text-secondary">{t('tours.emergency-line')}</p>
          <p className="text-sm font-semibold text-primary-dark">
            {formatUzPhone(data?.tour_agent?.phone_number || '')}
          </p>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-4 py-3">
          <p className="text-sm text-secondary">{t('tours.accept-country')}</p>
          <p className="text-sm font-semibold text-primary-dark">{data?.tour_agent?.brand_name}</p>
        </div>
      </div>
    </div>
  )
}

export default TourBookingContacts
