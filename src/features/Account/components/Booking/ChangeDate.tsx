import CustomModal from '@/components/common/CModal'
import CalendarIcon from '@/components/icons/calendar'
import SuccessIcon from '@/components/icons/success-icon'
import WarningIcon from '@/components/icons/warningIcon'
import { formatNumber } from '@/helpers/number-formatter'
import { Button, DatePicker, Divider, Flex, Typography } from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { checkDateById, updateBooking } from '../../api'

interface IProps {
  changeDateModal: boolean

  setChangeDateModal: (_value: boolean) => void
  booking: any
  refetch: any
}

interface IDate {
  start: string | undefined
  end: string | undefined
}

function ChangeDate({ changeDateModal, setChangeDateModal, booking, refetch }: IProps) {
  const t = useTranslations()
  const [status, setStatus] = useState('selectDate')
  const [newDate, setNewDate] = useState<IDate>({
    start: booking.start_date,
    end: booking.end_date,
  })

  useEffect(() => {
    setStatus('selectDate')
  }, [changeDateModal])

  const { mutate: updateBookingDate, isPending: updateBookingDateLoading } = useMutation({
    mutationFn: updateBooking,
    onSuccess: () => {
      refetch()
      setStatus('finish')
    },
  })

  const { mutate: checkingFreeDate, isPending: checkingFreeDateLoading } = useMutation({
    mutationFn: checkDateById,
    onSuccess: () => {
      setStatus('free')
    },
    onError: () => {
      setStatus('busy')
    },
  })

  const checkDate = () => {
    checkingFreeDate({
      id: booking.id,
      start_date: dayjs(newDate.start).format('YYYY-MM-DD'),
      end_date: dayjs(newDate.end).format('YYYY-MM-DD'),
    })
  }

  return (
    <CustomModal
      modalTitle={status === 'finish' ? t('booking.congratulations') : t('booking.changing-date')}
      modalDesc={
        status === 'free'
          ? t('booking.free-date')
          : status === 'finish'
            ? t('booking.finish-select')
            : t('booking.select-date')
      }
      modalIcon={
        status === 'finish' ? (
          <SuccessIcon className="text-4xl" />
        ) : (
          <CalendarIcon className="text-[40px]" />
        )
      }
      width={615}
      open={changeDateModal}
      onOk={() => {
        setChangeDateModal(false)
      }}
      onCancel={() => {
        setChangeDateModal(false)
      }}
    >
      {status === 'selectDate' || status === 'busy' ? (
        <>
          <div>
            <div>
              <Typography className="mb-2">{t('booking.check-in')}</Typography>

              <DatePicker
                size="small"
                allowClear
                format={'YYYY/MM/DD'}
                defaultValue={dayjs(booking?.start_date, 'YYYY/MM/DD')}
                placeholder={t('my-properties.select-time')}
                showToday={false}
                className="mb-4 h-[56px] w-full border-none p-4 text-base placeholder:text-base"
                onChange={(e) =>
                  setNewDate({
                    ...newDate,
                    start: e?.format('YYYY/MM/DD'),
                  })
                }
                disabledDate={(current) => current && current < dayjs().startOf('day')}
                suffixIcon={<CalendarIcon className="text-2xl" />}
              />
            </div>

            <div>
              <Typography className="mb-2">{t('booking.check-out')}</Typography>

              <DatePicker
                allowClear
                format={'YYYY/MM/DD'}
                showToday={false}
                defaultValue={dayjs(booking?.end_date, 'YYYY/MM/DD')}
                placeholder={t('my-properties.select-time')}
                className="mb-4 h-[56px] w-full border-none p-4 text-base placeholder:text-base"
                onChange={(e) =>
                  setNewDate({
                    ...newDate,
                    end: e?.format('YYYY/MM/DD'),
                  })
                }
                disabledDate={(current) => {
                  const startDate = dayjs(booking?.start_date, 'YYYY/MM/DD')
                  return current && current < startDate.startOf('day')
                }}
                suffixIcon={<CalendarIcon className="text-2xl" />}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <Button
              aria-label={t('buttons.cancel')}
              className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
              onClick={() => {
                setChangeDateModal(false)
              }}
            >
              {t('buttons.cancel')}
            </Button>
            <Button
              aria-label={t('booking.check')}
              type="primary"
              loading={checkingFreeDateLoading}
              className="h-[58px] rounded-2xl bg-primary shadow-none hover:!bg-primary/70"
              onClick={() => {
                checkDate()
              }}
            >
              {t('booking.check')}
            </Button>
          </div>

          {status === 'busy' && (
            <Flex className="items-start gap-[16px] rounded-2xl border border-[#FF4E4E] bg-[#FF4E4E14] p-[16px]">
              <WarningIcon className="text-[22px]" />

              <Typography className="text-[#FF4E4E]">{t('booking.busy-date')}</Typography>
            </Flex>
          )}
        </>
      ) : status === 'free' ? (
        <div>
          <div>
            <div className="flex justify-between rounded-2xl bg-[#F8F8FA] px-[16px] py-[8px]">
              <Typography className="font-medium">{t('booking.current-date')}</Typography>

              <div className="flex gap-2">
                <Typography>{t('user.price')}:</Typography>
                <Typography className="font-semibold">{formatNumber(booking.total)} UZS</Typography>
              </div>
            </div>

            <div className="grid grid-cols-2 px-[16px] py-[8px]">
              <div className="flex flex-col gap-[8px]">
                <Typography>
                  {t('booking.check-in')} ({t('booking.current-date')})
                </Typography>
                <Typography className="font-semibold">
                  {dayjs(booking.start_date).format('DD MMM YYYY')}
                </Typography>
                <Typography className="font-light">
                  С{' '}
                  {dayjs(
                    dayjs().format('YYYY-MM-DD') + 'T' + booking?.placement?.checkin_start
                  ).format('HH:mm')}
                </Typography>
              </div>
              <div className="flex flex-col gap-[8px]">
                <Typography>
                  {t('booking.check-in')} ({t('booking.current-date')})
                </Typography>
                <Typography className="font-semibold">
                  {dayjs(booking.end_date).format('DD MMM YYYY')}
                </Typography>
                <Typography className="font-light">
                  С{' '}
                  {dayjs(
                    dayjs().format('YYYY-MM-DD') + 'T' + booking?.placement?.checkout_end
                  ).format('HH:mm')}
                </Typography>
              </div>
            </div>
          </div>

          <div className="mt-[32px]">
            <div className="flex justify-between rounded-2xl bg-[#F8F8FA] px-[16px] py-[8px]">
              <Typography className="font-medium">{t('booking.new-date')}</Typography>

              <div className="flex gap-2">
                <Typography>Цена:</Typography>
                <Typography className="font-semibold">{formatNumber(booking.total)} UZS</Typography>
              </div>
            </div>

            <div className="grid grid-cols-2 px-[16px] py-[8px]">
              <div className="flex flex-col gap-[8px]">
                <Typography>
                  {t('booking.check-in')} ({t('booking.new-date')})
                </Typography>
                <Typography className="font-semibold">
                  {dayjs(newDate.start).format('DD MMM YYYY')}
                </Typography>
                <Typography className="font-light">
                  С{' '}
                  {dayjs(
                    dayjs().format('YYYY-MM-DD') + 'T' + booking?.placement?.checkin_start
                  ).format('HH:mm')}
                </Typography>
              </div>
              <div className="flex flex-col gap-[8px]">
                <Typography>
                  {t('booking.check-in')} ({t('booking.new-date')})
                </Typography>
                <Typography className="font-semibold">
                  {dayjs(newDate.end).format('DD MMM YYYY')}
                </Typography>
                <Typography className="font-light">
                  С{' '}
                  {dayjs(
                    dayjs().format('YYYY-MM-DD') + 'T' + booking?.placement?.checkout_end
                  ).format('HH:mm')}
                </Typography>
              </div>
            </div>
          </div>

          <Divider className="m-0" />

          <div className="flex items-center justify-between py-[24px]">
            <Typography className="font-medium">{t('booking.difference')}</Typography>

            <Typography className="font-medium">0 UZS</Typography>
          </div>

          <Divider className="m-0" />

          <div className="mt-[32px] grid grid-cols-2 gap-8">
            <Button
              aria-label={t('booking.see-other-dates')}
              onClick={() => setStatus('selectDate')}
              className="h-[58px] rounded-2xl bg-secondary-light/10 font-medium text-primary-dark shadow-none"
            >
              {t('booking.see-other-dates')}
            </Button>
            <Button
              aria-label={t('booking.confirm-edit')}
              type="primary"
              loading={updateBookingDateLoading}
              onClick={() =>
                updateBookingDate({
                  id: booking.id,
                  start_date: dayjs(newDate.start).format('YYYY-MM-DD'),
                  end_date: dayjs(newDate.end).format('YYYY-MM-DD'),
                })
              }
              className="h-[58px] rounded-2xl bg-primary shadow-none hover:!bg-primary/70"
            >
              {t('booking.confirm-edit')}
            </Button>
          </div>
        </div>
      ) : status === 'finish' ? (
        <div>
          <div className="mt-[32px]">
            <Button
              aria-label={t('buttons.close')}
              type="primary"
              onClick={() => setChangeDateModal(false)}
              className="h-[58px] w-full rounded-2xl bg-primary shadow-none hover:!bg-primary/70"
            >
              {t('buttons.close')}
            </Button>
          </div>
        </div>
      ) : (
        ''
      )}
    </CustomModal>
  )
}

export default ChangeDate
