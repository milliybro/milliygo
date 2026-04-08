import CustomModal from '@/components/common/CModal'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import { IBookingPlacement, IBookingsDetail } from '@/types'
import { useMediaQuery } from '@/utils/useMediaQuery'
import {
  Button,
  Flex,
  Form,
  Input,
  notification,
  Radio,
  RadioChangeEvent,
  Space,
  Typography,
} from 'antd'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createConversation, sendMessageToConversation } from '../../api'
import { useAuthStore } from '../../auth/store/authStore'

interface ReportAboutAdProps {
  hotel: IBookingPlacement | IBookingsDetail['placement']
  setReportModalOpen: (_value: boolean) => void
  reportModalOpen: boolean
}

const ComplainModal: React.FC<ReportAboutAdProps> = ({
  hotel,
  reportModalOpen,
  setReportModalOpen,
}) => {
  const [form] = Form.useForm()
  const t = useTranslations()
  const isMedium = useMediaQuery('(max-width: 768px)')

  const [value, setValue] = useState(1)
  const [successfulModalOpen, setSuccessfulModalOpen] = useState(false)

  const { userInfo, isAuthenticated } = useAuthStore()

  const { mutate: sendMessageToConversationMutate, isPending: sendMessageToConversationLoading } =
    useMutation({
      mutationFn: sendMessageToConversation,
      onSuccess: () => {
        setReportModalOpen(false)
        setSuccessfulModalOpen(true)
      },
    })

  const { mutate: createConversationMutate, isPending: createConversationLoading } = useMutation({
    mutationFn: createConversation,
    onSuccess: (res) => {
      sendMessageToConversationMutate({
        conversation: res.id,
        content:
          value === 5
            ? form.getFieldValue('reason')
            : reasons.find((r) => r.id === value)?.text || '',
      })
    },
  })

  const onChange = (e: RadioChangeEvent) => setValue(e.target.value)

  const reasons = [
    { id: 1, text: t('complain.incorrect-information') },
    { id: 2, text: t('complain.not-real-home') },
    { id: 3, text: t('complain.scam') },
    { id: 4, text: t('complain.offensive') },
    { id: 5, text: t('complain.different-problem') },
  ]

  const handleComplain = () => {
    if (!isAuthenticated || !userInfo?.id) {
      notification.error({ message: 'Ошибка: Пользователь не авторизован.' })
      return
    }

    createConversationMutate({
      from_user: {
        id: userInfo?.id,
        username: userInfo?.username.length > 0 ? userInfo?.username : 'username',
        first_name: userInfo?.first_name.length > 0 ? userInfo?.first_name : 'first_name',
        last_name: userInfo?.last_name.length > 0 ? userInfo?.last_name : 'last_name',
        avatar: userInfo?.avatar.length > 0 ? userInfo?.avatar : 'avatar',
      },
      type: 'complaint',
      object_id: hotel?.id,
    })
  }

  return (
    <>
      <CustomModal
        width={641}
        open={reportModalOpen}
        onOk={() => setReportModalOpen(false)}
        onCancel={() => setReportModalOpen(false)}
        classNames={{ content: 'p-4 md:p-[40px]' }}
        closable
      >
        <Flex vertical>
          <Flex vertical align="center" className="mb-6">
            <Typography.Title level={isMedium ? 4 : 2} className="mb-2">
              {t('complain.reason-complaint')}
            </Typography.Title>
            {/* <Typography.Text className="text-[18px] text-secondary">
              Хозяин не увидит эту информацию.
            </Typography.Text> */}
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

          <Flex gap={isMedium ? 16 : 32}>
            <Button
              aria-label={t('buttons.cancel')}
              className="flex-1 border-none bg-secondary-light font-medium"
              size={isMedium ? 'middle' : 'large'}
              type="default"
              onClick={() => setReportModalOpen(false)}
            >
              {t('buttons.cancel')}
            </Button>
            <Button
              aria-label={t('complain.complain')}
              size={isMedium ? 'middle' : 'large'}
              type="primary"
              danger
              className="flex-1 text-white"
              loading={createConversationLoading || sendMessageToConversationLoading}
              onClick={handleComplain}
            >
              {t('complain.complain')}
            </Button>
          </Flex>
        </Flex>
      </CustomModal>

      <CustomModal
        width={588}
        modalIcon={<CheckmarkCircleIcon className="text-[10px]" />}
        modalTitle={t('booking.success')}
        modalDesc={t('booking.success-text')}
        open={successfulModalOpen}
        onOk={() => setSuccessfulModalOpen(false)}
        onCancel={() => setSuccessfulModalOpen(false)}
      >
        <Button
          aria-label="close complain modal"
          size="large"
          type="primary"
          onClick={() => setSuccessfulModalOpen(false)}
        >
          {t('buttons.close')}
        </Button>
      </CustomModal>
    </>
  )
}

export default ComplainModal
