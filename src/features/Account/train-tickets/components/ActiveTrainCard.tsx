import dayjs from 'dayjs'
import { Button } from 'antd'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import ConfirmTicketReturn from './ConfirmTicketReturn'

import type { FC } from 'react'
import type { IRailwayOrderResponse, Passenger } from '@/features/TrainsItem/types'

interface IProps extends Passenger {
  orderNumber: number
  data: IRailwayOrderResponse
}

const ActiveTrainCard: FC<IProps> = (props) => {
  const t = useTranslations()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const returnHandler = () => {
    if (!props.returned) {
      setIsModalVisible(true)
    }
  }
  const departureDateTime = dayjs(`${props?.data?.departure_date} ${props?.data?.departure_time}`)
  const now = dayjs()
  const isLessThanOneDayLeft = departureDateTime.diff(now, 'second') < 86400

  return (
    <>
      <div className="rounded-[24px] border bg-white p-6">
        <div className="flex flex-wrap items-center justify-between">
          <p className="font-medium text-primary-dark">
            {t.rich('transport.passenger-seat-count', {
              passenger: props?.orderNumber,
              seat: parseFloat(props?.seats),
              span: (children) => <span className="text-primary">{children}</span>,
            })}
          </p>

          <Button
            type="text"
            danger
            className="p-0 text-[14px] font-medium"
            onClick={returnHandler}
            disabled={isLessThanOneDayLeft}
          >
            {t('transport.ticket-return')}
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-gray-500">{t('transport.last_name.label')}</p>
            <p className="font-medium text-primary-dark">{props?.last_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('transport.first_name.label')}</p>
            <p className="font-medium text-primary-dark">{props?.first_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('transport.middle_name.label')}</p>
            <p className="font-medium text-primary-dark">{props?.middle_name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('transport.birth_date.label')}</p>
            <p className="font-medium text-primary-dark">
              {dayjs(props?.birth_date, 'YYYY-MM-DD').format('DD.MM.YYYY')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('transport.gender.label')}</p>
            <p className="font-medium text-primary-dark">{t(`genders.${props?.gender}`)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('transport.document.label')}</p>
            <p className="font-medium text-primary-dark">
              {t(`transport.document.${props?.doc_type}`)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('transport.document_number.label')}</p>
            <p className="font-medium text-primary-dark">{props?.doc}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('transport.citizenship.label')}</p>
            <p className="font-medium text-primary-dark">{props?.citizenship?.name}</p>
          </div>
        </div>
      </div>

      <ConfirmTicketReturn
        ticketId={props?.id}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
      />
    </>
  )
}

export default ActiveTrainCard
