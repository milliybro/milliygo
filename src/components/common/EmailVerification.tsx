import CustomModal from '@/components/common/CModal'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import MessengeIcon from '@/components/icons/mesaggeIcon'
import TelegramIcon from '@/components/icons/telegram'
import { checkOtpEmailApi, sendEmailCode } from '@/features/Account/auth/api'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import TelegramVerification from '@/features/HotelsItemSteps/components/TelegramVerification'
import { isValidEmail } from '@/helpers/is-valid-email'
import { useVerification } from '@/store/useVerification'
import obfuscateEmail from '@/utils/obfuscateEmail'
import { Button, Flex, Form, Input, Tabs, Typography } from 'antd'
import { setCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import React, { useContext, useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useMutation } from '@tanstack/react-query'

const { Item } = Form

export default function EmailVerification() {
  const t = useTranslations()
  const [otp, setOtp] = useState('')
  const [confirmModal, setConfirmModal] = useState<boolean>(false)
  const [email, setEmail] = useState<{ value: string; error: string }>({
    value: '',
    error: '',
  })

  const [otpForm] = Form.useForm()

  const authContext = useContext(AuthContext)
  const authStore = authContext?.authStore as {
    isAuthenticated: boolean

    login: (_user: object) => void
    logout: () => void
    userInfo: any
  }

  const { userInfo } = authStore

  const { isVerified, setIsVerified, setVerifiedEmail, setVerifiedTelegram, verifiedEmail } =
    useVerification()

  const handleEmailChange = (val: any) => {
    if (isVerified) return
    const emailValue = val.target.value
    if (emailValue && !isValidEmail(emailValue)) {
      setEmail({ value: emailValue, error: t('booking.invalid-email') })
    } else {
      setEmail({ value: emailValue, error: '' })
    }
  }

  const confirmEmailHandler = async () => {
    if (!isValidEmail(email.value)) {
      return
    }
    sendOtp({ email: email.value.toLowerCase() })
  }

  useEffect(() => {
    setEmail({ value: userInfo?.email || '', error: '' })
    setIsVerified(!!userInfo?.email || !!userInfo?.telegram_id)
    setVerifiedEmail(userInfo?.email || '')
    setVerifiedTelegram(userInfo?.telegram_id || null)
  }, [setIsVerified, setVerifiedEmail, setVerifiedTelegram, userInfo])

  const { mutate: otpVerification, isPending: isLoadingOtpVerification } = useMutation({
    mutationFn: checkOtpEmailApi,
    onSuccess: (res: any) => {
      setOtp('')

      setConfirmModal(false)
      setIsVerified(true)
      setVerifiedEmail(email.value)
      localStorage.setItem('access_token', res.access)

      setCookie('userInfo', res.user)
      authStore.login(res.user)
    },
  })

  const { mutate: sendOtp, isPending: isLoadingSendingOtp } = useMutation({
    mutationFn: sendEmailCode,
    onSuccess: () => {
      setConfirmModal(true)
    },
  })

  const items = [
    {
      key: '1',
      label: t('transport.email.label'),
      children: (
        <div className="flex flex-col gap-6">
          <div className="flex gap-2">
            <div className="flex basis-1/2 flex-col gap-8">
              <div className="relative flex flex-col gap-2">
                <label htmlFor="email" className="text-sm leading-5 text-[#777E90]">
                  {t('booking.email')}
                  <span className="ml-1 text-xl text-red-600">*</span>
                </label>
                <Item
                  rules={[
                    {
                      required: !isVerified,
                      message: t('booking.invalid-email'),
                    },
                  ]}
                  className="m-0"
                >
                  <Input
                    size="large"
                    placeholder="Email"
                    value={email.value}
                    disabled={isVerified}
                    onChange={handleEmailChange}
                    status={email.error ? 'error' : ''}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        confirmEmailHandler()
                      }
                    }}
                  />
                </Item>
                {email.error && (
                  <div className="absolute top-full mt-1 text-red-500">{email.error}</div>
                )}
              </div>
            </div>
            <Typography className="mt-10 basis-1/2 text-xs text-[#777E90]">
              {t('booking.will-send-email')}
            </Typography>
          </div>
          {!isVerified && (
            <Button
              size="large"
              type="primary"
              onClick={confirmEmailHandler}
              disabled={!isValidEmail(email.value)}
              loading={isLoadingSendingOtp}
              className="self-start"
            >
              {t('buttons.confirm')}
            </Button>
          )}

          {isVerified && (
            <div className="flex items-center gap-2">
              <CheckmarkCircleIcon className="text-2xl text-active" />
              <Typography.Text className="text-base text-active dsm:text-[14px]">
                {t('booking.verified', { source: verifiedEmail ? 'Email' : 'Telegram' })}
              </Typography.Text>
            </div>
          )}
        </div>
      ),
    },
    {
      key: '2',
      label: 'Telegram',
      children: (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 items-center gap-6 dsm:grid-cols-1">
            {!isVerified ? (
              <Item label="Telegram" layout="vertical">
                <TelegramVerification />
              </Item>
            ) : (
              <Button disabled type="primary" size="large" className="dsm:text-[12px]">
                <TelegramIcon className="text-2xl text-slate-300 dsm:text-[14px]" />
                {t('booking.with-telegram')}
              </Button>
            )}
          </div>
          {isVerified && (
            <div className="flex items-center gap-2">
              <CheckmarkCircleIcon className="text-2xl text-active" />
              <Typography.Text className="text-base text-active">
                {t('booking.verified', { source: verifiedEmail ? 'Email' : 'Telegram' })}
              </Typography.Text>
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <div className="mb-6 max-w-[600px] dsm:w-full">
      <Tabs
        tabBarGutter={24}
        defaultActiveKey="1"
        rootClassName="[&_.ant-tabs-nav]:mb-4 [&_.ant-tabs-nav-list]:w-full [&_.ant-tabs-tab]:py-4 [&_.ant-tabs-tab]:justify-center [&_.ant-tabs-nav-list]:grid [&_.ant-tabs-nav-list]:grid-cols-2 "
        centered
        tabBarStyle={{ marginBottom: '50px' }}
        className="text-xs dsm:text-[12px]"
        items={items}
      />

      {confirmModal && (
        <CustomModal
          width={615}
          open={confirmModal}
          onCancel={() => {
            setConfirmModal(false)
          }}
          onOk={() => {
            setConfirmModal(false)
          }}
          modalIcon={<MessengeIcon className="text-[40px]" />}
          modalTitle={t('auth.confirm-email')}
          modalDesc={t('auth.send-otp-email', { email: obfuscateEmail(email.value) })}
        >
          <Form
            form={otpForm}
            onFinish={() => {
              otpVerification({
                email: email.value.toLowerCase(),
                code: otp,
                old_email: userInfo?.email || undefined,
              })
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') otpForm.submit()
            }}
          >
            <Flex vertical>
              <OTPInput
                value={otp}
                onChange={(otp) => setOtp(otp)}
                numInputs={4}
                renderInput={(props) => <input {...props} />}
                inputType="number"
                inputStyle={{
                  width: '54px',
                  height: '64px',
                  borderRadius: '12px',
                  fontSize: '24px',
                  textAlign: 'center',
                  backgroundColor: '#777E9015',
                  border: '2px solid #777E9030',
                  padding: '1px',
                }}
                containerStyle={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  gap: '8px',
                  marginBottom: '24px',
                }}
              />
            </Flex>

            <Flex vertical>
              <Button
                aria-label={t('auth.continue')}
                size="large"
                type="primary"
                shape="default"
                className="!h-[56px] w-full shadow-none disabled:bg-primary/20 disabled:text-white"
                disabled={false}
                onClick={() => {
                  otpVerification({
                    email: email.value.toLowerCase(),
                    code: otp,
                    old_email: userInfo?.email || undefined,
                  })
                }}
                loading={isLoadingOtpVerification}
              >
                {t('auth.continue')}
              </Button>
            </Flex>
          </Form>
        </CustomModal>
      )}
    </div>
  )
}
