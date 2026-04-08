import BlurImage from '@/components/common/BlurImage'
import RouteIcon from '@/components/icons/route-icon'
import { ITourAgentOrderItem } from '../types'
import { useTranslations } from 'next-intl'

interface TourBookingOverviewProps {
  order: ITourAgentOrderItem | undefined
}

export default function TourBookingOverview({ order }: TourBookingOverviewProps) {
  const t = useTranslations()
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <BlurImage
        height={100}
        width={100}
        alt="Tour image"
        src={order?.tour?.tour_first_image_url || ''}
        className="h-[100px] w-[100px] rounded-3xl object-cover"
        fallbackEl={
          <RouteIcon className="flex h-[100px] w-[100px] items-center justify-center rounded-2xl bg-primary/5 text-2xl text-secondary" />
        }
      />
      <div className="flex flex-col">
        <div className="text-lg font-bold">{order?.tour?.name}</div>
        <div className="mt-auto flex flex-col gap-1 text-secondary">
          <div className="flex-wrap text-sm">
            <span className="mr-2 inline-block font-semibold text-black">
              {t('guides.meeting-place')}:
            </span>
            <span className="inline-block">{order?.tour?.regions?.join(', ')}</span>
          </div>
          <div className="flex-wrap text-sm">
            <span className="mr-2 inline-block font-semibold text-black">
              {t('tours.agent-phone')}:
            </span>
            <span className="inline-block">{order?.tour_agent?.phone_number || ''}</span>
          </div>
          <div className="flex-wrap text-sm">
            <span className="mr-2 inline-block font-semibold text-black">
              {t('personal-information.email')}:
            </span>
            <span className="inline-block">{order?.tour_agent?.email || ''}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
