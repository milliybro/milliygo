import CustomModal from '@/components/common/CModal'
import CRate from '@/components/common/CRate'
import CommentIcon from '@/components/icons/comment'
import { sendComment } from '@/features/HotelsItem/api'
import { IReviewsCategory, ListResponse } from '@/types'
import { Button, Flex, Form, FormInstance, Input, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Dispatch, SetStateAction } from 'react'
import { useMutation } from '@tanstack/react-query'

function CommentModal({
  commentModalOpen,
  setCheckBookingModal,
  setCommentModalOpen,
  setReviewsModalOpen,
  data: reviewsCategories,
  formCheckBooking,
  setCommentedModalOpen,
  placementId,
}: {
  commentModalOpen: boolean
  setCommentModalOpen: Dispatch<SetStateAction<boolean>>
  setReviewsModalOpen: Dispatch<SetStateAction<boolean>>
  setCheckBookingModal: Dispatch<SetStateAction<boolean>>
  data: ListResponse<IReviewsCategory[]> | undefined
  formCheckBooking: FormInstance
  setCommentedModalOpen: Dispatch<SetStateAction<boolean>>
  placementId: number
}) {
  const [form] = Form.useForm()

  const t = useTranslations()

  const { mutate: sendCommentMutate } = useMutation({
    mutationFn: (values: any) => {
      const placement_rating: { placement_review_category: number; rating: number }[] = []
      const bookingCredentials = formCheckBooking.getFieldsValue()

      Object.keys(values).forEach((key) => {
        if (Number(key)) {
          placement_rating.push({
            placement_review_category: Number(key),
            rating: Number(values[key]),
          })
        }
      })

      const averageRating =
        placement_rating.reduce((total, val) => total + val.rating, 0) / placement_rating.length
      const roundedRating = Math.round(averageRating)

      const formattedObj = {
        review: values.review as string,
        placement_rating,
        placement: placementId,
        rating: roundedRating,
        code: Number(bookingCredentials.code),
        booking: Number(bookingCredentials.booking),
      }

      return sendComment(formattedObj)
    },
    onSuccess: () => {
      setCommentModalOpen(false)
      setCommentedModalOpen(true)
      form.resetFields()
    },
  })

  return (
    <CustomModal
      width={636}
      modalIcon={<CommentIcon className="text-[42px]" />}
      modalTitle={t('others.add-feedback')}
      modalDesc={t('others.add-feedback-desc')}
      open={commentModalOpen}
      onOk={() => {
        setCommentModalOpen(false)
        setReviewsModalOpen(true)
      }}
      onCancel={() => {
        setCommentModalOpen(false)
        setCheckBookingModal(true)
      }}
    >
      <Form layout="vertical" form={form} name="control-hooks" onFinish={sendCommentMutate}>
        {reviewsCategories?.results.map((val, i) => (
          <Flex
            key={'modal-comment-item-' + i}
            align="center"
            justify="space-between"
            className={`border-secondary-light py-3 ${
              reviewsCategories.results.length === i + 1 ? '' : 'border-b'
            }`}
          >
            <Flex align="center" gap={8}>
              <Image src={val.image} width={24} height={24} alt="icon" unoptimized />
              <Typography.Text className="text-secondary">{val.name}</Typography.Text>
            </Flex>
            <Form.Item
              name={val.id}
              noStyle
              rules={[
                {
                  required: true,
                  message: t('booking.please-fill-this-field'),
                },
              ]}
            >
              <CRate style={{ fontSize: '32px' }} />
            </Form.Item>
          </Flex>
        ))}

        <Form.Item name="review" label={t('reviews.feedback')} className="mt-6">
          <Input.TextArea
            placeholder={t('others.add-feedback-placeholder')}
            className="h-[122px] resize-none p-4"
          />
        </Form.Item>

        <Form.Item className="m-0">
          <Button
            aria-label={t('buttons.publish')}
            size="large"
            type="primary"
            htmlType="submit"
            className="w-full"
          >
            {t('buttons.publish')}
          </Button>
        </Form.Item>
      </Form>
    </CustomModal>
  )
}

export default CommentModal
