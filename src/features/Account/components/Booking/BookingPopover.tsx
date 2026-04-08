import MoreRoundedIcon from '@/components/icons/moreRoundedIcon'
import ChangeDate from '@/features/Account/components/Booking/ChangeDate'
import MessageOwner from '@/features/Account/components/Booking/MessageOwner'
import MessageSupport from '@/features/Account/components/Booking/MessageSupport'
import RejectBookingModal from '@/features/Account/components/Booking/RejectBookingModal'
import { Button, Flex, Form, Popover } from 'antd'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import ComplainModal from './ComplainModal'
import ReviewModal from './ReviewModal'
import { useMutation } from '@tanstack/react-query'
import { sendBookingCode } from '@/features/HotelsItem/api'
import CommentModal from './CommentModal'
import CommentedModal from './CommentedModal'
import { IBooking, IBookingsDetail, ICreateChat } from '@/types'
import { createChat, createChatWithUser } from '@/api'
import { getCookie, setCookie } from 'cookies-next'

function BookingPopover({
  booking,
  refetch,
  status,
}: {
  booking: IBooking | IBookingsDetail
  refetch: any
  status: number
}) {
  const [changeDateModal, setChangeDateModal] = useState<boolean>(false)
  const [checkBookingModal, setCheckBookingModal] = useState<boolean>(false)
  const [bookingNotFound, setBookingNotFound] = useState<boolean>(false)
  const [commentModalOpen, setCommentModalOpen] = useState<boolean>(false)
  const [commentedModalOpen, setCommentedModalOpen] = useState<boolean>(false)
  const [messageOwnerModal, setMessageOwnerModal] = useState<boolean>(false)
  const [messageSupportModal, setMessageSupportModal] = useState<boolean>(false)
  const [rejectBookingModal, setRejectBookingModal] = useState<boolean>(false)
  const [complainModal, setComplainModal] = useState<boolean>(false)
  const [openedPopover, setOpenedPopover] = useState<boolean>(false)
  const t = useTranslations()

  const [chatRoom, setChatRoom] = useState<number | null>(null)

  const [formCheckBooking] = Form.useForm()

  const {
    mutate: sendBookingCodeMutate,
    isPending: sendBookingCodeLoading,
    data: reviewsCategories,
  } = useMutation({
    mutationFn: sendBookingCode,
    onSuccess: () => {
      setCheckBookingModal(false)
      setCommentModalOpen(true)
      setBookingNotFound(false)
    },
    onError: () => {
      setBookingNotFound(true)
    },
  })
  const [userInfo, setUserInfo] = useState<any>({})

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem('authState') || '{}')
    setUserInfo(dataUser?.userInfo)
  }, [])

  const { mutate: mutateCreateChatWithUser, isPending: isCreatingChatWithUser } = useMutation({
    mutationFn: createChatWithUser,
    onSuccess: (values: ICreateChat) => {
      if (!getCookie('support_user_session') || getCookie('support_user_session') === 'undefined') {
        const expirationDate = new Date()
        expirationDate.setDate(expirationDate?.getDate() + 14)

        const sessionId = values?.user_session || getCookie('support_user_session')

        setCookie('support_user_session', sessionId, {
          expires: expirationDate,
          path: '/',
        })
      }
      setChatRoom(values?.id)
    },
  })
  const { mutate: mutateCreateChat, isPending: isCreatingChat } = useMutation({
    mutationFn: createChat,
    onSuccess: (values: ICreateChat) => {
      if (!getCookie('support_user_session')) {
        const expirationDate = new Date()
        expirationDate.setDate(expirationDate?.getDate() + 14)

        setCookie('support_user_session', values?.user_session, {
          expires: expirationDate,
          path: '/',
        })
      }
      setChatRoom(values?.id)
    },
  })

  return (
    <>
      <Popover
        placement="bottomLeft"
        onOpenChange={setOpenedPopover}
        open={openedPopover}
        classNames={{ body: 'p-1 overflow-hidden', root: 'max-w-[221px] p-0' }}
        content={
          <Flex vertical>
            {status !== 4 ? (
              <button
                aria-label={t('booking.change-date')}
                type="button"
                onClick={() => {
                  setOpenedPopover(false)
                  setChangeDateModal(true)
                }}
                className="flex items-center gap-2 border-b p-4 text-start text-sm font-medium hover:bg-secondary-light"
              >
                {t('booking.change-date')}
              </button>
            ) : (
              <button
                aria-label={t('buttons.write-a-review')}
                type="button"
                onClick={() => {
                  setOpenedPopover(false)
                  setCheckBookingModal(true)
                }}
                className="flex items-center gap-2 border-b p-4 text-start text-sm font-medium hover:bg-secondary-light"
              >
                {t('buttons.write-a-review')}
              </button>
            )}
            <button
              aria-label={t('booking.message-owner')}
              type="button"
              onClick={() => {
                setOpenedPopover(false)
                setMessageOwnerModal(true)
              }}
              className="flex items-center gap-2 border-b p-4 text-start text-sm font-medium hover:bg-secondary-light"
            >
              {t('booking.message-owner')}
            </button>

            <button
              aria-label={t('booking.message-support')}
              type="button"
              onClick={() => {
                setOpenedPopover(false)
                setMessageSupportModal(true)
                if (!chatRoom) {
                  if (userInfo?.id) {
                    mutateCreateChatWithUser({
                      from_user: {
                        external_id: userInfo.id,
                        last_name: userInfo.last_name,
                        username: userInfo.username,
                      },
                    })
                  } else {
                    mutateCreateChat()
                  }
                }
              }}
              className="flex items-center gap-2 border-b p-4 text-start text-sm font-medium hover:bg-secondary-light"
            >
              {t('booking.message-support')}
            </button>
            {status !== 4 ? (
              <button
                aria-label={t('booking.reject-booking')}
                type="button"
                onClick={() => {
                  setOpenedPopover(false)
                  setRejectBookingModal(true)
                }}
                className="flex items-center gap-2 p-4 text-start text-sm font-medium text-red-400 hover:bg-secondary-light"
              >
                {t('booking.reject-booking')}
              </button>
            ) : (
              <button
                aria-label={t('booking.message-complain')}
                type="button"
                onClick={() => {
                  setOpenedPopover(false)
                  setComplainModal(true)
                }}
                className={`flex items-center gap-2 p-4 text-start text-sm font-medium text-red-400 hover:bg-secondary-light`}
              >
                {t('booking.message-complain')}
              </button>
            )}
          </Flex>
        }
        trigger="click"
      >
        <Button aria-label="see more" type="link" className="m-0 flex h-max w-max items-center p-0">
          <MoreRoundedIcon className="text-xl text-secondary" />
        </Button>
      </Popover>
      <ChangeDate
        changeDateModal={changeDateModal}
        setChangeDateModal={setChangeDateModal}
        booking={booking}
        refetch={refetch}
      />
      <MessageOwner
        messageOwnerModal={messageOwnerModal}
        setMessageOwnerModal={setMessageOwnerModal}
        booking={booking}
      />
      <MessageSupport
        messageSupportModal={messageSupportModal}
        setMessageSupportModal={setMessageSupportModal}
        booking={booking}
        chatRoom={chatRoom}
        setChatRoom={setChatRoom}
        loading={isCreatingChatWithUser || isCreatingChat}
      />
      <RejectBookingModal
        rejectBookingModal={rejectBookingModal}
        setRejectBookingModal={setRejectBookingModal}
        booking={booking}
        refetch={refetch}
      />
      <ComplainModal
        hotel={booking.placement}
        reportModalOpen={complainModal}
        setReportModalOpen={setComplainModal}
      />
      <ReviewModal
        onSend={sendBookingCodeMutate}
        sendLoading={sendBookingCodeLoading}
        checkBookingModal={checkBookingModal}
        setCheckBookingModal={setCheckBookingModal}
        setCommentModalOpen={setCommentModalOpen}
        formCheckBooking={formCheckBooking}
        bookingNotFound={bookingNotFound}
        setBookingNotFound={setBookingNotFound}
      />
      <CommentModal
        commentModalOpen={commentModalOpen}
        data={reviewsCategories}
        placementId={booking.placement.id}
        formCheckBooking={formCheckBooking}
        setCheckBookingModal={setCheckBookingModal}
        setCommentModalOpen={setCommentModalOpen}
        setCommentedModalOpen={setCommentedModalOpen}
        setReviewsModalOpen={setCheckBookingModal}
      />
      <CommentedModal
        commentedModalOpen={commentedModalOpen}
        setCommentedModalOpen={setCommentedModalOpen}
      />
    </>
  )
}

export default BookingPopover
