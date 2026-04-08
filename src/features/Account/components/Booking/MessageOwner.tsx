import CustomModal from '@/components/common/CModal'
import SuccessIcon from '@/components/icons/success-icon'
import { Button, Flex, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { getCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createConversation, sendMessagePlacement, sendMessageToConversation } from '../../api'

interface IProps {
  messageOwnerModal: boolean

  setMessageOwnerModal: (_value: boolean) => void
  booking: any
}
function MessageOwner({ messageOwnerModal, setMessageOwnerModal, booking }: IProps) {
  const [status, setStatus] = useState('edit')
  const [message, setMessage] = useState('')
  const t = useTranslations()
  const [userInfo, setUserInfo] = useState<any | null>(null)

  useEffect(() => {
    const dataUser = JSON.parse((getCookie('userInfo') as string) || '{}')
    setUserInfo(dataUser)
  }, [])

  const { mutate, isPending } = useMutation({
    mutationFn: sendMessagePlacement,
    onSuccess: () => {
      setStatus('success')
    },
  })

  const { mutate: sendMessageToConversationMutate } = useMutation({
    mutationFn: sendMessageToConversation,
    onSuccess: () => {
      setStatus('success')
    },
  })

  const { mutate: createConversationMutate } = useMutation({
    mutationFn: createConversation,
    onSuccess: (res) => {
      sendMessageToConversationMutate({
        conversation: res.id,
        content: message,
      })
    },
  })

  const handleSendMessage = () => {
    mutate({
      placement: booking?.placement?.id,
      user: booking?.user?.id,
      message: message,
    })

    if (userInfo) {
      createConversationMutate({
        from_user: {
          id: userInfo?.id,
          username: userInfo?.username?.length > 0 ? userInfo?.username : 'username',
          first_name: userInfo?.first_name?.length > 0 ? userInfo?.first_name : 'first_name',
          last_name: userInfo?.last_name?.length > 0 ? userInfo?.last_name : 'last_name',
          avatar: userInfo?.avatar?.length > 0 ? userInfo?.avatar : 'avatar',
        },
        to_user: {
          id: booking.placement.user.id,
          username:
            booking.placement?.user?.username?.length > 0
              ? booking.placement.user.username
              : 'username',
          first_name:
            booking.placement?.user?.first_name?.length > 0
              ? booking.placement.user.first_name
              : 'first_name',
          last_name:
            booking.placement?.user?.last_name?.length > 0
              ? booking.placement.user.last_name
              : 'last_name',
          avatar:
            booking.placement?.user?.avatar?.length > 0 ? booking.placement.user.avatar : 'avatar',
        },
      })
    }
  }

  return (
    <CustomModal
      modalTitle={status === 'edit' ? t('booking.contact-owner') : t('booking.message-send')}
      modalDesc={status === 'edit' ? '' : t('booking.can-see-messages')}
      modalIcon={status === 'edit' ? '' : <SuccessIcon className="text-4xl" />}
      width={750}
      open={messageOwnerModal}
      onOk={() => {
        setMessageOwnerModal(false)
      }}
      onCancel={() => {
        setMessageOwnerModal(false)
      }}
      closable
      classNames={{ content: 'p-4 md:p-[40px]' }}
    >
      {status === 'edit' ? (
        <Flex vertical>
          <Typography>{t('booking.have-questions')}</Typography>

          <TextArea
            className="mt-[12px] h-[53px] flex-1 border-none !bg-[#F8F8FA] !text-primary-dark"
            onChange={(e) => setMessage(e.target.value)}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />

          <Button
            aria-label={t('booking.send-message')}
            loading={isPending}
            type="primary"
            className="mt-[32px] h-[58px] rounded-2xl bg-primary shadow-none hover:!bg-primary/70"
            onClick={handleSendMessage}
          >
            {t('booking.send-message')}
          </Button>
        </Flex>
      ) : (
        <div className="mt-[32px]">
          <Button
            aria-label={t('buttons.close')}
            type="primary"
            onClick={() => {
              setMessageOwnerModal(false)
              setStatus('edit')
            }}
            className="h-[58px] w-full rounded-2xl bg-primary shadow-none hover:!bg-primary/70"
          >
            {t('buttons.close')}
          </Button>
        </div>
      )}
    </CustomModal>
  )
}

export default MessageOwner
