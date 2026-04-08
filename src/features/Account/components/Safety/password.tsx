import { Button, Flex, Form, Input, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'

import CustomModal from '@/components/common/CModal'
import SquareLockIcon from '@/components/icons/square-lock'
import UserIcon from '@/components/icons/user-icon'
import ViewIcon from '@/components/icons/view'
import ViewOffIcon from '@/components/icons/view-off'
import obfuscateEmail from '@/utils/obfuscateEmail'
import { SyncOutlined } from '@ant-design/icons'
import { setCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import OTPInput from 'react-otp-input'
import { useMutation } from '@tanstack/react-query'
import { checkOtpApi, confirmResetPasswordApi } from '../../auth/api'
import { AuthContext } from '../../auth/context/authContext'

function Password(): ReactElement {
  const t = useTranslations()
  const [otpModal, setOtpModal] = useState(false)
  const [isErrorOtp] = useState(false)
  const router = useRouter()
  const [userInfo, setUserInfo] = useState<any>({})

  const [passwordModal, setPasswordModal] = useState(false)
  const [timer, setTimer] = useState(60)
  const [isCanResend, setIsCanResend] = useState(false)
  const [checkForm] = Form.useForm()
  const [resetForm] = Form.useForm()

  const pass = Form.useWatch('password', resetForm)
  const confirmPass = Form.useWatch('confirmPassword', resetForm)

  const authContext = useContext(AuthContext)
  const authStore = authContext?.authStore as {
    login: (_user: object) => void
  }
  const { login: loginAction } = authStore

  useEffect(() => {
    const dataUser = JSON.parse(localStorage.getItem('authState') || '{}')
    setUserInfo(dataUser?.userInfo)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((timer) => timer - 1)
      } else {
        clearInterval(interval)
        setIsCanResend(true)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [timer])

  const { mutate: sendOtp, isPending: isLoadingSendOtp } = useMutation({
    mutationFn: checkOtpApi,
    onSuccess: () => {
      setPasswordModal(true)
      setOtpModal(false)
    },
  })

  const { mutate: confirmResetPassword, isPending: isLoadingConfirmResetPassword } = useMutation({
    mutationFn: confirmResetPasswordApi,
    onSuccess: (res: any) => {
      localStorage.setItem('refresh_token', res.refresh)
      localStorage.setItem('access_token', res.access)
      loginAction(res.user)
      setCookie('userInfo', res.user)
      router.push('/account/account-management')
      message.success(t('safety.two-factor-auth-success'), 2)
    },
  })

  const iconRender = (visible: boolean): React.ReactNode => {
    if (visible) {
      return <ViewIcon className="text-[22px]" />
    }
    return <ViewOffIcon className="text-[22px]" />
  }

  return (
    <>
      <CustomModal
        width={615}
        open={otpModal}
        onCancel={() => {
          checkForm.resetFields()
          setOtpModal(false)
        }}
        onOk={() => {
          setOtpModal(false)
        }}
        modalIcon={<UserIcon className="text-5xl" />}
        modalTitle={t('auth.confirm-email')}
        modalDesc={t('auth.send-otp-email', {
          email: obfuscateEmail(userInfo?.email ?? ''),
        })}
      >
        <Form
          form={checkForm}
          id="otp-form"
          layout="vertical"
          onFinish={(values: { otp: string }) => {
            sendOtp({
              email: userInfo?.email.toLowerCase(),
              code: values.otp,
            })
          }}
        >
          <Form.Item name="otp">
            <OTPInput
              onChange={() => {}}
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
                borderColor: isErrorOtp ? '#FF4E4E' : '#F7F7F7',
              }}
              containerStyle={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                gap: '8px',
                marginBottom: '24px',
              }}
            />
          </Form.Item>
        </Form>

        <Flex vertical>
          <Button
            aria-label={
              isCanResend
                ? t('auth.resend-otp')
                : t('auth.resend-otp-in', {
                    time: timer,
                  })
            }
            type="link"
            className="mb-[24px]"
            disabled={!isCanResend}
            onClick={() => {
              setTimer(60)
              setIsCanResend(false)
            }}
          >
            <SyncOutlined />
            {isCanResend
              ? t('auth.resend-otp')
              : t('auth.resend-otp-in', {
                  time: timer,
                })}
          </Button>

          <Button
            aria-label={t('auth.continue')}
            size="large"
            type="primary"
            shape="default"
            className="!h-[56px] w-full shadow-none disabled:bg-primary/20 disabled:text-white"
            disabled={false}
            loading={isLoadingSendOtp}
            htmlType="submit"
            form="otp-form"
          >
            {t('auth.continue')}
          </Button>
        </Flex>
      </CustomModal>

      <CustomModal
        width={615}
        open={passwordModal}
        onCancel={() => {
          resetForm.resetFields()
          setPasswordModal(false)
        }}
        onOk={() => {
          setPasswordModal(false)
        }}
        modalIcon={<UserIcon className="text-5xl" />}
        modalTitle={t('auth.password')}
        modalDesc={t('auth.enter-new-password')}
      >
        <Form
          form={resetForm}
          layout="vertical"
          onFinish={(values: { password: string; confirmPassword: string }) => {
            if (values.password !== values.confirmPassword) {
              message.error(t('auth.con-pass-maatch'))
            } else {
              confirmResetPassword({
                email: userInfo?.email.toLowerCase(),
                password: values.password,
              })
            }
          }}
        >
          <Form.Item label={t('auth.type-new-pass')} name="password">
            <Input.Password
              placeholder={t('auth.password')}
              size="large"
              iconRender={iconRender}
              className="h-[56px] border-none p-4 text-base placeholder:text-base"
              prefix={<SquareLockIcon className="mr-2 text-secondary" />}
            />
          </Form.Item>

          <Form.Item label={t('auth.rep-pass')} name="confirmPassword">
            <Input.Password
              placeholder={t('auth.rep-pass')}
              size="large"
              iconRender={iconRender}
              className="h-[56px] border-none p-4 text-base placeholder:text-base"
              prefix={<SquareLockIcon className="mr-2 text-secondary" />}
            />
          </Form.Item>

          <Button
            aria-label={t('auth.save-changes')}
            size="large"
            type="primary"
            shape="default"
            htmlType="submit"
            className="!h-[56px] w-full shadow-none disabled:bg-primary/20 disabled:text-white"
            loading={isLoadingConfirmResetPassword}
            disabled={pass !== confirmPass || pass?.length < 8}
          >
            {t('auth.save-changes')}
          </Button>
        </Form>
      </CustomModal>
    </>
  )
}

export default Password
