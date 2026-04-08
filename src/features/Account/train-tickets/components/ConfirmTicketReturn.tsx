import { Button, Divider, Typography } from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { formatNumber } from '@/helpers/number-formatter'
import useCurrencyStore from '@/store/currency'
import { getReturnTicketInfo, returnTicket } from '../api'

import CustomModal from '@/components/common/CModal'
import CancelIcon from '@/components/icons/cancel'

import type { FC } from 'react'

interface IProps {
  visible: boolean
  onCancel: () => void
  ticketId: number
}

const ConfirmTicketReturn: FC<IProps> = ({ visible, onCancel, ticketId }) => {
  const { query } = useRouter()
  const queryClient = useQueryClient()
  const t = useTranslations()
  const { currency } = useCurrencyStore((state) => state)

  const { data: ticketData, isLoading } = useQuery({
    queryKey: ['return-ticket-info', query.id, ticketId, visible],
    queryFn: () => getReturnTicketInfo({ order: query.id as any, ticket: ticketId }),
    enabled: Boolean(query.id && ticketId && visible),
  })

  const cost = (ticketData?.cost || 0) / (currency?.rate || 1)
  const returnCost = (ticketData?.return_tariff || 0) / (currency?.rate || 1)

  const { mutate: mutateReturnTicket, isPending: isReturnLoading } = useMutation({
    mutationFn: () => returnTicket({ order: query.id as any, ticket: ticketId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['railway-orders'] })
      onCancel()
    },
  })

  return (
    <CustomModal
      open={visible}
      onCancel={onCancel}
      footer={null}
      centered
      width={636}
      classNames={{ content: 'p-[40px]' }}
    >
      <div>
        <div className="text-center">
          <CancelIcon className="mb-8 rounded-3xl bg-secondary-light p-6 text-[28px] text-secondary" />
          <Typography.Title level={4} className="mb-4 text-[24px] font-bold">
            {t('booking.cancelling-booking')}
          </Typography.Title>
          <Typography.Text className="mx-auto mb-4 block max-w-[486px] text-[18px] text-secondary">
            {t('booking.cancelling-booking-text')}
          </Typography.Text>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold">
            {[ticketData?.last_name, ticketData?.first_name, ticketData?.middle_name]
              .filter(Boolean)
              .join(' ')}
          </span>
          <span className="text-sm text-secondary">
            {t('transport.order')}:{' '}
            <span className="font-medium text-black">{ticketData?.express_id}</span>
          </span>
        </div>

        <Divider className="my-4" />

        <div className="mb-6">
          <div className="mb-4 grid grid-cols-2 gap-6">
            <div>
              <span className="mb-1 block text-sm text-secondary">{t('transport.from-where')}</span>
              <span className="mb-1 block font-semibold">{ticketData?.station_from}</span>
              <span className="text-sm text-secondary">
                {dayjs(ticketData?.departure_date, 'DD.MM.YYYY').format('dd, D MMM')}
              </span>
            </div>
            <div className="border-l pl-6">
              <span className="mb-1 block text-sm text-secondary">{t('transport.to-where')}</span>
              <span className="mb-1 block font-semibold">{ticketData?.station_to}</span>
              <span className="text-sm text-secondary">
                {dayjs(ticketData?.arrival_date, 'DD.MM.YYYY').format('dd, D MMM')}
              </span>
            </div>
          </div>

          <div>
            <span className="mb-1 block text-sm text-secondary">{t('transport.travel-time')}:</span>
            <span className="font-semibold">
              {ticketData?.timeinway?.split(':').slice(0, 2).join(':')}
            </span>
          </div>
        </div>

        <Divider />
        <div className="mb-6">
          <div className="mb-2 flex justify-between">
            <span className="text-[20px] text-secondary">{t('transport.price')}:</span>
            <span className="text-[20px] font-semibold text-primary-dark/50 line-through">
              {formatNumber(cost)} {currency?.short_name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[20px] text-secondary">{t('transport.refund-amount')}:</span>
            <span className="text-[20px] font-semibold text-primary-dark">
              {formatNumber(returnCost)} {currency?.short_name}
            </span>
          </div>
        </div>

        <div className="mt-8 grid w-full grid-cols-2 gap-8">
          <Button
            type="primary"
            className="text-white"
            danger
            size="large"
            loading={isReturnLoading}
            onClick={() => mutateReturnTicket()}
            disabled={isLoading}
          >
            {t('transport.ticket-refund')}
          </Button>
          <Button
            type="text"
            className="bg-[#F8F8FA] text-secondary"
            size="large"
            onClick={onCancel}
            disabled={isReturnLoading || isReturnLoading}
          >
            {t('transport.keep')}
          </Button>
        </div>
      </div>
    </CustomModal>
  )
}

export default ConfirmTicketReturn
