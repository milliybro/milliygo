import CustomModal from '@/components/common/CModal'
import CRate from '@/components/common/CRate'
import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import MoreRoundedIcon from '@/components/icons/moreRoundedIcon'
import { deleteReview, myOneReviewList, updateReview } from '@/features/Support/api'
import { LoadingOutlined, StarFilled } from '@ant-design/icons'
import { Button, Divider, Flex, Form, Popover, Spin, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import dayjs from 'dayjs'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'

interface Rating {
  id: number
  placement_review_category: number
  rating: number
}

const ReviewItem = ({ item, refetch }: any) => {
  const t = useTranslations()
  const [editModal, setEditModal] = useState(false)
  const [openedPopover, setOpenedPopover] = useState(false)
  const [openDetailModal, setOpenDetailModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [oneId, setOneId] = useState()
  const [currentItem, setCurrentItem] = useState<any>({
    ...item,
    placement_ratings: item.placement_ratings || [],
  })

  const calculateAverageRating = (ratings: Rating[]) => {
    const totalRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0)
    const average = totalRatings / ratings.length || 0
    return Math.round(average)
  }

  const { mutate } = useMutation({
    mutationFn: updateReview,
    onSuccess: () => {
      setOpenDetailModal(false)
      setEditModal(false)
      refetch()
    },
  })

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      setDeleteModal(false)
    },
  })

  const { data: oneReviewData } = useQuery({
    queryKey: ['review', oneId],
    queryFn: () => myOneReviewList({ data: { id: oneId ?? 0 } }),
    enabled: !!oneId,
  })

  useEffect(() => {
    if (oneReviewData?.placement_ratings) {
      const formattedRatings = oneReviewData.placement_ratings.map((rating) => ({
        id: rating.id,
        rating: rating.rating,
        placement_review_category: rating.placement_review_category.id,
      }))

      const avgRating = calculateAverageRating(formattedRatings)
      setCurrentItem({
        id: item.id,
        review: item.review,
        placement_ratings: formattedRatings,
        rating: avgRating,
      })
    }
  }, [oneReviewData])

  return (
    <>
      <Flex vertical gap={16} className="pt-4">
        <Flex gap={16}>
          <Flex className="relative h-[40px] w-[40px] min-w-[40px] overflow-hidden rounded-[8px]">
            <Image
              src={item?.placement?.image}
              alt=""
              fill
              className="h-full w-full object-cover"
              unoptimized
            />
          </Flex>

          <Flex vertical gap={4} className="w-full">
            <Flex>
              <Typography.Title level={5} className="m-0 text-sm font-normal text-[#232E40]">
                {item?.placement?.name}
              </Typography.Title>
            </Flex>
            <Flex>
              <Typography.Text className="text-sm font-normal text-[#B7BFD5]">
                {item?.placement?.address}
              </Typography.Text>
            </Flex>
          </Flex>

          <Flex>
            <Flex>
              <Popover
                placement="bottom"
                onOpenChange={setOpenedPopover}
                open={openedPopover}
                classNames={{ body: 'p-1 overflow-hidden', root: 'max-w-[221px] p-0' }}
                content={
                  <Flex vertical>
                    <button
                      aria-label={t('reviews.edit-feedback')}
                      type="button"
                      onClick={() => {
                        setOpenedPopover(false)
                        setEditModal(true)
                        setOneId(item?.id)
                      }}
                      className="flex items-center gap-2 rounded-xl p-4 text-start text-sm font-medium hover:bg-secondary-light"
                    >
                      {t('reviews.edit-feedback')}
                    </button>

                    <button
                      aria-label={t('reviews.delete-feedback')}
                      type="button"
                      onClick={() => {
                        setOpenedPopover(false)
                        setDeleteModal(true)
                      }}
                      className="flex items-center gap-2 rounded-xl p-4 text-start text-sm font-medium text-red-400 hover:bg-secondary-light"
                    >
                      <Spin
                        spinning={false}
                        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                      >
                        {t('reviews.delete-feedback')}
                      </Spin>
                    </button>
                  </Flex>
                }
                trigger="click"
              >
                <Button
                  type="link"
                  aria-label="see more reviews"
                  className="m-0 flex h-max w-max items-center p-0"
                >
                  <MoreRoundedIcon className="text-xl" />
                </Button>
              </Popover>
            </Flex>
          </Flex>
        </Flex>

        <Flex gap={8}>
          <Flex className="flex items-center gap-[4px]">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarFilled
                key={index}
                style={{ color: item?.rating >= index + 1 ? '#FFB800' : '#B7BFD5' }}
              />
            ))}
          </Flex>

          <Flex>
            <Typography.Text className="text-sm font-normal text-[#232E40]">
              {dayjs(item?.created_at).format('DD.MM.YYYY')}
            </Typography.Text>
          </Flex>
        </Flex>

        <Flex>
          <Typography.Text className="text-base font-normal text-[#232E40]">
            {item?.review}
          </Typography.Text>
        </Flex>

        <Flex>
          <Button
            type="link"
            aria-label={t('my-properties.show-detailed')}
            className="flex h-max items-center p-0"
            onClick={() => {
              setOpenDetailModal(true)
              setOneId(item.id)
            }}
          >
            {t('my-properties.show-detailed')}
            <ArrowRightUpIcon />
          </Button>
        </Flex>
      </Flex>

      <CustomModal
        width={630}
        modalTitle={editModal ? t('reviews.edit-feedback') : t('reviews.show-detailed')}
        open={openDetailModal || editModal}
        onOk={() => {
          setOpenDetailModal(false)
          setEditModal(false)
        }}
        onCancel={() => {
          setOpenDetailModal(false)
          setEditModal(false)
        }}
      >
        <Flex vertical>
          <Flex gap={16}>
            <Flex className="relative h-[64px] w-[64px] overflow-hidden rounded-[8px]">
              <Image
                src={item?.placement?.image}
                alt={item?.placement?.name}
                fill
                className="h-full w-full object-cover"
                unoptimized
              />
            </Flex>

            <Flex vertical className="justify-center">
              <Typography.Title
                level={5}
                className="m-0 mb-[4px] text-lg font-medium text-[#232E40]"
              >
                {item?.placement?.name}
              </Typography.Title>

              <Typography.Text className="text-base font-normal text-[#B7BFD5]">
                {item?.placement?.address}
              </Typography.Text>
            </Flex>
          </Flex>
          <div className="mt-8">
            {oneReviewData?.placement_ratings?.length ? (
              oneReviewData.placement_ratings.map((val, i) => (
                <Flex
                  key={'modal-comment-item-' + i}
                  align="center"
                  justify="space-between"
                  className={twMerge(
                    'border-secondary-light py-3',
                    oneReviewData?.placement_ratings.length === i + 1 ? '' : 'border-b'
                  )}
                >
                  <Flex align="center" gap={8}>
                    <Image
                      src={val.placement_review_category.image}
                      width={24}
                      height={24}
                      unoptimized
                      alt="icon"
                    />
                    <Typography.Text className="text-secondary">
                      {val.placement_review_category.name}
                    </Typography.Text>
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
                    <CRate
                      disabled={!editModal}
                      defaultValue={val?.rating || 0}
                      onChange={(newRating) => {
                        const updatedRatings = currentItem.placement_ratings.map(
                          (rating: Rating) => ({
                            id: rating.id,
                            rating: rating.id === val.id ? newRating : rating.rating,
                            placement_review_category: rating.placement_review_category,
                          })
                        )

                        const avgRating = calculateAverageRating(updatedRatings)

                        setCurrentItem({
                          ...currentItem,
                          placement_ratings: updatedRatings,
                          rating: avgRating,
                        })
                      }}
                      style={{ fontSize: '32px' }}
                    />
                  </Form.Item>
                </Flex>
              ))
            ) : (
              <Flex className="mt-[32px]" vertical>
                <Flex vertical className="w-full">
                  <Flex gap={8} className="w-full py-[16px]">
                    <Flex gap={4}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <StarFilled
                          key={index}
                          onClick={() => {
                            setCurrentItem({ ...currentItem, rating: index + 1 })
                          }}
                          style={{
                            color: currentItem?.rating >= index + 1 ? '#FFB800' : '#B7BFD5',
                          }}
                        />
                      ))}
                    </Flex>
                  </Flex>
                  <Divider className="m-0" />
                </Flex>
              </Flex>
            )}
          </div>
          <Flex vertical gap={12} className="mt-[32px]">
            <Typography.Text className="text-base font-normal text-[#777E90]">
              {t('reviews.feedback')}
            </Typography.Text>

            <TextArea
              disabled={!editModal}
              value={currentItem?.review}
              defaultValue={item?.review}
              onChange={(e) => setCurrentItem({ ...currentItem, review: e.target.value })}
              className="min-h-[120px] items-start rounded-[16px]"
            />
          </Flex>

          {editModal && (
            <div className="mt-[32px] grid grid-cols-2 gap-8">
              <Button
                aria-label="close review"
                className="h-[58px] rounded-2xl border-0 bg-[#F8F8FA] font-medium text-primary-dark shadow-none"
                onClick={() => {
                  setOpenDetailModal(false)
                  setEditModal(false)
                }}
              >
                {t('buttons.cancel')}
              </Button>
              <Button
                aria-label="edit review"
                onClick={() => {
                  mutate({ data: currentItem })
                }}
                type="primary"
                className="h-[58px] rounded-2xl bg-[#3276FF] shadow-none hover:!bg-[#3276FF]/70"
              >
                {t('buttons.edit')}
              </Button>
            </div>
          )}
        </Flex>
      </CustomModal>

      <CustomModal
        width={630}
        modalTitle={t('reviews.delete-feedback')}
        modalDesc={t('reviews.confirm-delete', { place: item?.placement?.name })}
        open={deleteModal}
        onOk={() => setDeleteModal(false)}
        onCancel={() => setDeleteModal(false)}
      >
        <Flex vertical>
          <div className="mt-[32px] grid grid-cols-2 gap-8">
            <Button
              aria-label={t('buttons.cancel')}
              className="h-[58px] rounded-2xl border-0 bg-[#F8F8FA] font-medium text-primary-dark shadow-none"
              onClick={() => {
                setDeleteModal(false)
              }}
            >
              {t('buttons.cancel')}
            </Button>
            <Button
              aria-label={t('buttons.delete')}
              onClick={() => {
                deleteMutate({ data: { id: item.id } })
              }}
              type="primary"
              className="h-[58px] rounded-2xl bg-[#FF4E4E] shadow-none hover:!bg-[#FF4E4E]/70"
            >
              {t('buttons.delete')}
            </Button>
          </div>
        </Flex>
      </CustomModal>
    </>
  )
}

export default ReviewItem
