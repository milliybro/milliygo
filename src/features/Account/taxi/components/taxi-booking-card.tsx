import { Divider } from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'

export default function TaxiBookingCard({ order }: any) {
  const t = useTranslations()

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex-grow">
        <h2 className="mb-2 text-lg font-bold">Millenium Taxi</h2>
        <div className="flex flex-col items-start justify-between gap-3 text-sm lg:flex-row lg:items-center">
          <div>
            <div className="font-semibold">
              {t('taxi.driver-name')}:{' '}
              <span className="font-normal text-gray-700">{order?.driver_name}</span>
            </div>

            <div className="font-semibold">
              {t('taxi.modul-car')}:{' '}
              <span className="font-normal text-gray-700">{order?.car_model}</span>
            </div>

            <div className="font-semibold">
              {t('taxi.color-car')}:{' '}
              <span className="font-normal text-gray-700">{order?.car_color}</span>
            </div>
          </div>

          <div className="flex max-w-full flex-col items-start gap-3 sm:flex-row sm:gap-0 lg:max-w-[450px]">
            <div className="max-w-full lg:max-w-[200px]">
              <div className="text-left lg:text-right">{t('taxi.delivery')}</div>
              <div className="text-left font-bold lg:text-right">
                {order?.addresses?.length ? order.addresses[0].address : 'Адрес не найден'}
              </div>
              <div className="text-left text-sm text-gray-500 lg:text-right">
                {dayjs(order?.source_time).format('ddd, DD MMM, · HH:mm')}
              </div>
            </div>
            <Divider type="vertical" className="mx-6 hidden h-16 sm:block" />
            <div className="max-w-full lg:max-w-[200px]">
              <div className="text-left md:col-start-2 lg:text-right">{t('taxi.destination')}</div>
              <div className="text-left font-bold md:col-start-2 lg:text-right">
                {' '}
                {order?.addresses?.length ? order.addresses[1].address : 'Адрес не найден'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
