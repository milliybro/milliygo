import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { Button, Flex, Form, Input, Typography } from 'antd'

import CustomModal from '@/components/common/CModal'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'

import { sendQuestion } from '../api'

import type { IMe } from '@/types'
import { useTranslations } from 'next-intl'

const TextMessage = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const t = useTranslations()
  const [me, setMe] = useState<IMe | null>(null)
  const [successful, setSuccessful] = useState(false)

  const { mutate } = useMutation({
    mutationFn: sendQuestion,
    onSuccess: () => {
      setSuccessful(true)
    },
  })

  useEffect(() => {
    const rawMe = localStorage?.getItem('authState')
    if (rawMe) {
      const parseMe = JSON.parse(rawMe)
      setMe(parseMe.userInfo)
      form.setFieldValue('email', parseMe.userInfo?.email)
    }
  }, [])

  return (
    <>
      <Typography.Title level={2} className="mb-8">
        {t('faq.text-message')}
      </Typography.Title>
      <Form layout="vertical" form={form} onFinish={mutate}>
        <Form.Item
          name="question_text"
          label={t('faq.your-message')}
          rules={[
            {
              required: true,
              message: t('booking.please-fill-this-field'),
            },
          ]}
        >
          <Input.TextArea
            placeholder={t('faq.type-your-message')}
            className="h-[122px] resize-none p-4"
          />
        </Form.Item>
        <Form.Item name="email" hidden>
          <Input hidden />
        </Form.Item>

        <Flex vertical>
          {me ? (
            me.email ? (
              <>
                <Typography.Text className="mb-2 text-base font-semibold">
                  {t('booking.your-email')}
                </Typography.Text>
                <Typography.Text className="mb-8 text-base">{me?.email}</Typography.Text>
              </>
            ) : (
              <Typography.Text className="mb-8 text-base">
                {t('faq.email-not-found')}
              </Typography.Text>
            )
          ) : (
            <Typography.Text className="mb-8 text-base">
              <Link href={'/auth/login'} aria-label={t('faq.enter')}>
                {t('faq.enter')}
              </Link>{' '}
              {t('faq.or')}{' '}
              <Link href={'/auth/login'} aria-label={t('faq.register')}>
                {t('faq.register')}
              </Link>
              , {t('faq.desc-register')}
            </Typography.Text>
          )}

          <Form.Item className="m-0">
            <Button
              aria-label={t('booking.send-message')}
              disabled={!me || !me?.email}
              size="large"
              type="primary"
              htmlType="submit"
            >
              {t('booking.send-message')}
            </Button>
          </Form.Item>
        </Flex>
      </Form>
      <CustomModal
        width={496}
        open={successful}
        onOk={() => setSuccessful(false)}
        onCancel={() => setSuccessful(false)}
        modalTitle={t('faq.message-sent')}
        modalDesc={t('faq.message-sent-desc')}
        modalIcon={<CheckmarkCircleIcon className="text-[10px]" />}
      >
        <Button
          aria-label={t('faq.back-to-support')}
          size="large"
          type="primary"
          onClick={() => {
            setSuccessful(false)
            router.push('/faq/')
          }}
        >
          {t('faq.back-to-support')}
        </Button>
      </CustomModal>
    </>
  )
}

export default TextMessage
