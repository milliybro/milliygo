import CustomModal from '@/components/common/CModal'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import { Button, Flex, Form, Radio, RadioChangeEvent, Space, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { unsubscribeAllNotification } from '../../api'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'

export default function RejectAll({ userInfo, setRejectAll, setIsEditingMail }: any) {
  const [value, setValue] = useState('')
  const [textReason, setTextReason] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const { push } = useRouter()
  const t = useTranslations()
  const [form] = Form.useForm()

  const options = [
    t('email-newsletter.reason-1'),
    t('email-newsletter.reason-2'),
    t('email-newsletter.reason-3'),
    t('email-newsletter.reason-4'),
    t('email-newsletter.reason-5'),
    t('email-newsletter.reason-6'),
    t('email-newsletter.reason-7'),
    t('email-newsletter.reason-8'),
  ]

  const { mutate } = useMutation({
    mutationFn: unsubscribeAllNotification,
    onSuccess: () => {
      setOpenModal(true)
    },
  })

  function closeHandler() {
    setOpenModal(false)
    setRejectAll(false)
    setIsEditingMail(false)
    push('/account/account-management/email-newsletter/')
  }

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
  }

  const sendReason = () => {
    if (!value) {
      return
    }
    mutate({
      reason: value === t('email-newsletter.reason-8') ? textReason : value,
    })
  }

  return (
    <Flex vertical>
      <Flex vertical gap={12}>
        <Typography className="text-primary-dark">
          {t('email-newsletter.header-desc-1', { email: userInfo?.email })}
        </Typography>

        <Typography>
          {t.rich('email-newsletter.header-desc-2', {
            link1: (chunks) => (
              <Typography.Link onClick={() => setRejectAll(false)}>{chunks}</Typography.Link>
            ),
          })}
        </Typography>
      </Flex>

      <Flex vertical className="mt-4">
        <Typography className="mb-[24px] font-bold text-primary-dark">
          {t('email-newsletter.desc-bottom')}
        </Typography>

        <Form form={form} onFinish={() => sendReason()}>
          <Flex className={'flex-col'}>
            <Form.Item
              name="reason"
              rules={[
                {
                  required: true,
                  message: t('my-properties.cancel-required'),
                },
              ]}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical" className={'gap-[24px]'}>
                  {options.map((option) => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>

            {value === t('email-newsletter.reason-8') && (
              <Flex className="mt-5 flex-col gap-[12px]">
                <Typography>{t('email-newsletter.desc-label')}</Typography>

                <Form.Item className="m-0 p-0">
                  <TextArea
                    onChange={(e) => setTextReason(e.target.value)}
                    className="h-[122px] w-full rounded-md border p-4"
                    placeholder={t('my-properties.cancel-reason-placeholder')}
                  />
                </Form.Item>
              </Flex>
            )}

            <Button
              type="primary"
              aria-label={t('buttons.send-request')}
              className="mt-[32px] h-[58px] w-max rounded-2xl shadow-none"
              htmlType="submit"
            >
              {t('buttons.send-request')}
            </Button>
          </Flex>
        </Form>
      </Flex>
      <CustomModal
        modalTitle={t('email-newsletter.thanks')}
        modalDesc={t('email-newsletter.thanks-desc')}
        modalIcon={<CheckmarkCircleIcon className="text-[32px]" />}
        width={615}
        open={openModal}
        onOk={closeHandler}
        onCancel={() => setOpenModal(false)}
      >
        <div>
          <Button
            aria-label={t('buttons.close')}
            type="primary"
            onClick={closeHandler}
            className="h-[58px] w-full rounded-2xl shadow-none"
          >
            {t('buttons.close')}
          </Button>
        </div>
      </CustomModal>
    </Flex>
  )
}
