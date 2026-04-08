import CustomModal from '@/components/common/CModal'
import CommentIcon from '@/components/icons/comment'
import InfoSquareIcon from '@/components/icons/info-square'
import { IReviewsCategory, ListResponse } from '@/types'
import { Button, Card, Flex, Form, FormInstance, Input, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'
import { UseMutateFunction } from '@tanstack/react-query'

function ReviewModal({
  checkBookingModal,
  setCheckBookingModal,

  setCommentModalOpen,
  onSend,
  sendLoading,
  formCheckBooking,
  bookingNotFound,
  setBookingNotFound,
}: {
  checkBookingModal: boolean
  setCheckBookingModal: Dispatch<SetStateAction<boolean>>
  sendLoading: boolean
  formCheckBooking: FormInstance
  onSend: UseMutateFunction<
    ListResponse<IReviewsCategory[]>,
    unknown,
    {
      booking: number
      code: number
    },
    unknown
  >

  setCommentModalOpen: Dispatch<SetStateAction<boolean>>
  bookingNotFound: boolean
  setBookingNotFound: Dispatch<SetStateAction<boolean>>
}) {
  const t = useTranslations()

  return (
    <CustomModal
      width={636}
      open={checkBookingModal}
      onOk={() => {
        setCheckBookingModal(false)
        setCommentModalOpen(true)
      }}
      onCancel={() => {
        setCheckBookingModal(false)

        formCheckBooking.resetFields()
        setBookingNotFound(false)
      }}
      closable
      classNames={{ content: 'p-4 md:p-[40px]' }}
      modalTitle={t('hotels.type-info-booking')}
      modalDesc={t('hotels.open-mail')}
      modalIcon={
        <CommentIcon className="flex items-center justify-center text-2xl md:text-[42px]" />
      }
      modalIconClassName="w-[60px] h-[60px] md:w-[80px] md:h-[80px]"
    >
      {bookingNotFound && (
        <Card
          style={{ padding: !bookingNotFound ? 0 : 16 }}
          className={`rounded-lg border-danger bg-secondary-light duration-200 ${
            !bookingNotFound ? 'h-0 opacity-0' : ''
          }`}
        >
          <Flex gap={16} className="text-danger">
            <InfoSquareIcon className="text-2xl" />
            <Typography.Text className="text-danger">
              {t('hotels.booking-not-found')}
            </Typography.Text>
          </Flex>
        </Card>
      )}

      <Form layout="vertical" form={formCheckBooking} name="control-hooks" onFinish={onSend}>
        <Form.Item
          name="booking"
          label={t('hotels.number-booking')}
          rules={[
            {
              required: true,
              message: t('booking.please-fill-this-field'),
            },
          ]}
        >
          <Input size="large" placeholder="№" />
        </Form.Item>
        <Form.Item
          name="code"
          label={t('hotels.pin')}
          rules={[
            {
              required: true,
              message: t('booking.please-fill-this-field'),
            },
          ]}
        >
          <Input size="large" placeholder="####" />
        </Form.Item>

        <Form.Item className="m-0">
          <Button
            aria-label={t('buttons.rate-your-stay')}
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={sendLoading}
          >
            {t('buttons.rate-your-stay')}
          </Button>
        </Form.Item>
      </Form>

      <Typography.Text className="text-center text-sm text-secondary">
        {t('hotels.comment-only-guests')}
      </Typography.Text>
    </CustomModal>
  )
}

export default ReviewModal
