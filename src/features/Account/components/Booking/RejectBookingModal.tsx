import CustomModal from '@/components/common/CModal'
import Delete from '@/components/icons/delete'
import SuccessIcon from '@/components/icons/success-icon'
import { formatNumber } from '@/helpers/number-formatter'
import useCurrencyStore from '@/store/currency'
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Space,
  Typography,
} from 'antd'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { cencelBooking } from '../../api'

interface IProps {
  rejectBookingModal: boolean
  setRejectBookingModal: (_value: boolean) => void
  booking: any
  refetch: any
}

function RejectBookingModal({
  rejectBookingModal,
  setRejectBookingModal,
  booking,
  refetch,
}: IProps) {
  const { currency } = useCurrencyStore((state) => state)
  const t = useTranslations()
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [value, setValue] = useState(1)
  const [form] = Form.useForm()

  const onChange = (e: RadioChangeEvent) => setValue(e.target.value)

  const reasons = [
    { id: 1, text: t('booking.cencelling-visa-problem') },
    { id: 2, text: t('booking.cencelling-flight') },
    { id: 3, text: t('booking.cencelling-found-option') },
    {
      id: 4,
      text: t('booking.cencelling-bad-weather'),
    },
    { id: 5, text: t('complain.different-problem') },
  ]

  const { mutate: cencelBookingMutate } = useMutation({
    mutationFn: cencelBooking,
    onSuccess: () => {
      message.success(t('Bandlov muvafaqiyatli bekor qilindi!'))
      setReportModalOpen(false)
      setRejectBookingModal(false)
      refetch()
    },
  })
  const deleteBookingHandler = async () => {
    let statusText = reasons.find((reason) => reason.id === value)?.text || ''

    if (value === 5) {
      try {
        const values = await form.validateFields() // Formdan foydalanuvchi kiritgan qiymatni olamiz
        statusText = `${statusText}: ${values.reason}`
      } catch (err) {
        return // Agar form validatsiyadan o'tmasa, funksiyani tugatamiz
      }
    }

    cencelBookingMutate({
      id: booking?.id,
      status_text: statusText,
    })
  }

  return (
    <>
      <CustomModal
        modalTitle={t('booking.cancelling-booking')}
        modalDesc={t('booking.cancelling-booking-text')}
        onCancel={() => setRejectBookingModal(false)}
        modalIcon={<Delete />}
        width={630}
        open={rejectBookingModal}
      >
        <div>
          <div className="mb-[12px] flex flex-col gap-[4px]">
            <Typography className="font-bold">{booking?.placement?.name}</Typography>
            {/* <Typography className="font-medium text-[#777E90]">
            1 × Двухместный номер с 2 отдельными кроватями
          </Typography> */}
          </div>

          <Divider className="m-0 mb-[16px] mt-[12px]" />

          <div className="mb-[16px] flex">
            <div className="w-full border-r">
              <Typography className="text-sm">{t('booking.check-in')}</Typography>
              <Typography className="mb-[4px] mt-[8px] text-base font-semibold">
                {dayjs(booking?.start_date).format('ddd, DD MMM. YYYY')}
              </Typography>
              <Typography className="font-sm text-[#777E90]">
                {t('user.dan', { time: dayjs(booking?.start_date).format('hh:mm') })}
              </Typography>
            </div>

            <div className="w-full pl-[24px]">
              <Typography className="text-sm">{t('booking.check-out')}</Typography>
              <Typography className="mb-[4px] mt-[8px] text-base font-semibold">
                {dayjs(booking?.end_date).format('ddd, DD MMM. YYYY')}
              </Typography>
              <Typography className="font-sm text-[#777E90]">
                {t('user.gacha', { time: dayjs(booking?.end_date).format('hh:mm') })}
              </Typography>
            </div>
          </div>

          <div className="mb-[16px]">
            <Typography className="mb-[8px] font-medium text-[#777E90]">
              {t('booking.length-of-stay')}:
            </Typography>
            <Typography className="text-base font-semibold">
              {dayjs(booking.end_date).diff(booking?.start_date, 'day')} {t('booking.night')}
            </Typography>
          </div>

          <div className="flex items-center gap-[8px] text-[#4DD282]">
            <SuccessIcon className="text-[#4DD282]" />
            {t('booking.prepayment-required')}
          </div>

          <Divider className="m-0 my-[16px]" />

          <div className="mb-[32px] flex justify-between">
            <Typography className="text-xl font-medium text-[#777E90]">
              {t('user.price')}:
            </Typography>
            <Typography className="notranslate text-xl font-semibold text-[#232E40]">
              {formatNumber(booking?.total)} {currency?.short_name}
            </Typography>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <Button
              aria-label={t('booking.reject-booking')}
              type="primary"
              onClick={() => {
                setReportModalOpen(true)
              }}
              className="h-[58px] rounded-2xl bg-[#FF4E4E] shadow-none"
            >
              {t('booking.reject-booking')}
            </Button>

            <Button
              aria-label={t('booking.stay')}
              className="h-[58px] rounded-2xl border-0 bg-[#F8F8FA] text-[#777E90] shadow-none"
              onClick={() => setRejectBookingModal(false)}
            >
              {t('booking.stay')}
            </Button>
          </div>
        </div>
      </CustomModal>
      <CustomModal
        width={641}
        open={reportModalOpen}
        onOk={() => setReportModalOpen(false)}
        onCancel={() => setReportModalOpen(false)}
      >
        <Flex vertical>
          <Flex vertical align="center" className="mb-6">
            <Typography.Title level={2} className="mb-2">
              {t('booking.cancelling-booking')}
            </Typography.Title>
            <Typography.Text className="text-center text-[18px] text-secondary">
              {t('booking.cencelling-reason')}
            </Typography.Text>
          </Flex>

          <Radio.Group onChange={onChange} value={value} className="mb-8">
            <Space direction="vertical" className="gap-6">
              {reasons.map((val) => (
                <Radio key={`report-reason-${val.id}`} value={val.id}>
                  {val.text}
                </Radio>
              ))}
            </Space>
          </Radio.Group>

          {value === 5 && (
            <Form form={form} layout="vertical" name="complainForm">
              <Form.Item
                name="reason"
                label={t('complain.describe-problem')}
                rules={[{ required: true, message: 'Пожалуйста, введите детали.' }]}
              >
                <Input.TextArea
                  className="h-[122px] resize-none p-4"
                  placeholder={t('complain.describe-problem-example')}
                />
              </Form.Item>
            </Form>
          )}

          <Flex gap={32}>
            <Button
              aria-label={t('buttons.cancel')}
              className="flex-1 border-none bg-secondary-light font-medium"
              size="large"
              type="default"
              onClick={() => setReportModalOpen(false)}
            >
              {t('buttons.cancel')}
            </Button>
            <Button
              aria-label={t('buttons.delete')}
              size="large"
              type="primary"
              danger
              className="flex-1 text-white"
              onClick={deleteBookingHandler}
            >
              {t('booking.reject-booking')}
            </Button>
          </Flex>
        </Flex>
      </CustomModal>
    </>
  )
}

export default RejectBookingModal
