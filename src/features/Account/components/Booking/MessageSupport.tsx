import CustomModal from '@/components/common/CModal'
import SuccessIcon from '@/components/icons/success-icon'
import { sendSupportMessage } from '@/features/Support/api'
import { Button, Flex, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'

interface IProps {
  messageSupportModal: boolean
  setMessageSupportModal: React.Dispatch<React.SetStateAction<boolean>>
  booking: any
  chatRoom: number | null
  setChatRoom: any
  loading: boolean
}
function MessageSupport({
  messageSupportModal,
  setMessageSupportModal,
  chatRoom,
  loading,
}: IProps) {
  const [status, setStatus] = useState('edit')
  const t = useTranslations()
  const [inputText, setInputText] = useState('')

  const { mutate: mutateSendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: () => {
      const messageFormData = new FormData()
      messageFormData.append('content', inputText)

      if (chatRoom) {
        messageFormData.append('chat_room', chatRoom + '')
      }

      return sendSupportMessage(messageFormData)
    },
    onSuccess: () => {
      setInputText('')

      setStatus('success')
    },
  })

  return (
    <CustomModal
      modalTitle={status === 'edit' ? t('booking.message-support') : t('booking.message-send')}
      modalDesc={status === 'edit' ? '' : t('booking.we-response')}
      modalIcon={status === 'edit' ? '' : <SuccessIcon className="text-5xl" />}
      width={800}
      open={messageSupportModal}
      onOk={() => {
        setMessageSupportModal(false)
      }}
      onCancel={() => {
        setMessageSupportModal(false)
      }}
      loading={loading}
      classNames={{ content: 'p-4 md:p-[40px]' }}
      closable
    >
      {status === 'edit' ? (
        <Flex vertical>
          <Typography className="mt-0 text-[#777E90] md:mt-[24px]">
            {t('booking.have-questions')}
          </Typography>

          <TextArea
            className="mt-[12px] h-[53px] flex-1 border-none !bg-[#F8F8FA] !text-primary-dark"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('booking.write-here')}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />

          {/* <Typography className="mt-[32px] mb-[8px] font-bold">
            {t('booking.your-email')}
          </Typography>

          <Typography>{userInfo?.email}</Typography> */}

          <Button
            aria-label={t('booking.send-message')}
            type="primary"
            loading={isSendingMessage}
            className="mt-3 h-[58px] w-max rounded-2xl bg-primary shadow-none hover:!bg-primary/70 md:mt-[32px]"
            onClick={() => {
              mutateSendMessage()
            }}
          >
            {t('booking.send-message')}
          </Button>
        </Flex>
      ) : (
        <div className="mt-0 md:mt-[32px]">
          <Button
            aria-label={t('faq.back-to-support')}
            type="primary"
            onClick={() => {
              setMessageSupportModal(false)
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

export default MessageSupport
