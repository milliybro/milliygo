import CustomModal from '@/components/common/CModal'
import AlertCircleIcon from '@/components/icons/alert-circle'
import ArrowRightUpIcon from '@/components/icons/arrow-right-up'
import CheckmarkCircleIcon from '@/components/icons/checkmark-circle'
import PencilIcon from '@/components/icons/pencil'
import SquareLockIcon from '@/components/icons/square-lock'
import UserIcon from '@/components/icons/user-icon'
import ViewIcon from '@/components/icons/view'
import ViewOffIcon from '@/components/icons/view-off'
import SettingsField from '@/features/Account/components/SettingsField'
import obfuscateEmail from '@/utils/obfuscateEmail'
import { SyncOutlined } from '@ant-design/icons'
import { Button, Flex, Input, InputRef, Typography, message } from 'antd'
import { setCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import React, { memo, useEffect, useRef, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useMutation } from '@tanstack/react-query'
import { checkOtpApi, registerAccEmail, updateEmailApi } from '../../auth/api'

function PersonalEmail({ userInfo, setUserInfo, loginAction }: any): ReactElement {
  const t = useTranslations()
  const inputRef = useRef<InputRef>(null)

  const [isEmpty, setIsEmpty] = useState(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [confirmModal, setConfirmModal] = useState<boolean>(false)
  const [email, setEmail] = useState({ value: '', verified: false })
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(60)
  const [isCanResend, setIsCanResend] = useState(false)
  const [passWordModal, setPassWordModal] = useState(false)
  const router = useRouter()
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' })

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

  const isValidEmail = (email: string): boolean => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  const deletionHandler = (): void => {
    if (isEditing) {
      if (isValidEmail(email.value)) {
        setIsEditing(false)
      } else {
        message.error(t('personal-information.email-error'))
      }
    } else {
      setIsEditing(true)
    }
  }

  const iconRender = (visible: boolean): React.ReactNode => {
    if (visible) {
      return <ViewIcon className="text-[22px]" />
    }
    return <ViewOffIcon className="text-[22px]" />
  }

  const { mutate: updateEmail } = useMutation({
    mutationFn: updateEmailApi,
    onSuccess: (res: any) => {
      setEmail((prev) => ({ ...prev, verified: true }))
      setIsEditing(false)
      localStorage.setItem('refresh_token', res.refresh)
      localStorage.setItem('access_token', res.access)
      setCookie('userInfo', res.user)
      setUserInfo(res.user)
      loginAction(res.user)
      router.push('/account/account-management')
      message.success(t('user.login-success'), 2)
    },
  })

  const { mutate: sendOtp, isPending: isLoadingSendingOtp } = useMutation({
    mutationFn: registerAccEmail,
    onSuccess: () => {
      setConfirmModal(true)
    },
  })

  const { mutate: otpVerification, isPending: isLoadingOtpVerification } = useMutation({
    mutationFn: checkOtpApi,
    onSuccess: (res: any) => {
      setOtp('')
      if (res.new_password) {
        setConfirmModal(false)

        updateEmail({
          email: email.value.toLowerCase(),
        })
      }
    },
  })

  const handleSendOtp = () => {
    sendOtp({ email: email.value.toLowerCase(), action: 'update' })
  }

  useEffect(() => {
    if (userInfo?.email) {
      setIsEmpty(false)
      setEmail({ value: userInfo?.email, verified: true })
    } else {
      setIsEmpty(true)
    }
  }, [userInfo?.email])

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }
  }, [isEditing])

  return (
    <>
      <SettingsField
        isEmpty={isEmpty}
        isEditing={isEditing}
        title={t('personal-information.email')}
        content={
          email.value.toLowerCase() !== '' ? (
            <Flex
              align="center"
              justify="space-between"
              className={`${
                email.verified || email.value.toLowerCase() === userInfo?.email
                  ? ''
                  : 'text-red-500'
              }`}
            >
              {email.value.toLowerCase()}
              {email.value.toLowerCase() === userInfo?.email ? (
                ''
              ) : email.verified ? (
                <div className="flex flex-col items-center gap-2 sm:gap-4 lg:flex-row">
                  <Button
                    type="link"
                    aria-label={t('buttons.confirm')}
                    className="flex items-center border-0 !text-sm font-medium shadow-none"
                    size="small"
                    loading={isLoadingSendingOtp}
                    onClick={handleSendOtp}
                  >
                    {t('buttons.confirm')} <ArrowRightUpIcon />
                  </Button>
                  <div className="flex items-center gap-1 rounded-[32px] bg-[#FF4E4E14] px-2 py-1 text-sm text-red-500">
                    <AlertCircleIcon className="" /> {t('buttons.not-verified')}
                  </div>
                </div>
              ) : (
                <Button
                  aria-label={t('buttons.verified')}
                  className="text-success bg-success/10 flex items-center !text-sm font-medium shadow-none"
                  size="small"
                  onClick={() => {
                    setConfirmModal(true)
                  }}
                >
                  <CheckmarkCircleIcon className="text-[22px]" /> {t('buttons.verified')}
                </Button>
              )}
            </Flex>
          ) : userInfo?.email !== '' ? (
            userInfo?.email
          ) : (
            t('personal-information.email-text')
          )
        }
        editContent={
          <Input
            ref={inputRef}
            className="w-full rounded-none border-none bg-transparent p-0 !text-primary-dark ring-0"
            value={email.value}
            onChange={(val) => {
              setEmail((prev) => ({ ...prev, value: val.target.value }))
            }}
          />
        }
        contentClassName="font-normal text-primary-dark"
        btnText={isEditing ? t('buttons.save') : t('buttons.edit')}
        btnIcon={isEditing ? null : <PencilIcon />}
        btnClassName={
          isEditing ? 'text-success hover:!text-success' : 'text-primary hover:!text-primary'
        }
        onClick={deletionHandler}
        onCancel={() => {
          setIsEditing(false)
          setEmail({ value: userInfo?.email || '', verified: true })
        }}
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
          modalIcon={<UserIcon className="text-5xl" />}
          modalTitle={t('auth.confirm-email')}
          modalDesc={t('auth.send-otp-email', { email: obfuscateEmail(email.value) })}
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
            <Flex className="mb-[24px] items-center justify-center">
              <Button
                aria-label={
                  isCanResend ? t('auth.resend-otp') : t('auth.resend-otp-in', { time: timer })
                }
                type="link"
                className="flex items-center"
                disabled={!isCanResend}
                onClick={() => {
                  setTimer(60)
                  setIsCanResend(false)
                }}
              >
                <SyncOutlined />
                {isCanResend ? t('auth.resend-otp') : t('auth.resend-otp-in', { time: timer })}
              </Button>
            </Flex>

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
        </CustomModal>
      )}

      <CustomModal
        width={615}
        open={passWordModal}
        onCancel={() => {
          setPassWordModal(false)
        }}
        onOk={() => {
          setPassWordModal(false)
        }}
        modalIcon={<UserIcon className="text-5xl" />}
        modalTitle={t('auth.password')}
        modalDesc={t('auth.enter-new-password')}
      >
        <Flex vertical gap={16}>
          <Flex vertical>
            <Typography className="text-sm">{t('auth.type-new-pass')}</Typography>

            <Input.Password
              onChange={(e) => {
                setPasswords((prev) => ({ ...prev, password: e.target.value }))
              }}
              placeholder={t('auth.password')}
              size="large"
              iconRender={iconRender}
              className="h-[56px] border-none p-4 text-base placeholder:text-base"
              prefix={<SquareLockIcon className="mr-2 text-xl" />}
            />
          </Flex>

          <Flex vertical>
            <Typography className="text-sm">{t('auth.rep-pass')}</Typography>

            <Input.Password
              onChange={(e) => {
                setPasswords((prev) => ({ ...prev, confirmPassword: e.target.value }))
              }}
              placeholder={t('auth.rep-pass')}
              size="large"
              iconRender={iconRender}
              className="h-[56px] border-none p-4 text-base placeholder:text-base"
              prefix={<SquareLockIcon className="mr-2 text-xl" />}
            />
          </Flex>

          <Button
            aria-label={t('auth.save-changes')}
            size="large"
            type="primary"
            shape="default"
            className="!h-[56px] w-full shadow-none disabled:bg-primary/20 disabled:text-white"
            disabled={false}
            loading={false}
            onClick={() => {
              updateEmail({
                email: email.value,
                password: passwords.password,
              })
            }}
          >
            {t('auth.save-changes')}
          </Button>
        </Flex>
      </CustomModal>
    </>
  )
}

export default memo(PersonalEmail)
