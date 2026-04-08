import obfuscateEmail from '@/utils/obfuscateEmail'
import { SyncOutlined } from '@ant-design/icons'
import { Button, Flex, Form } from 'antd'
import { ReactElement, useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useMutation } from '@tanstack/react-query'
import { confirmOTP } from '../../auth/api'
import MainText from './main-text'
import { useTranslations } from 'next-intl'
import ReCAPTCHA from 'react-google-recaptcha'

export default function CheckOtp({
  mail,
  nextPageHandler,
  otp,
  setOtp,
  fields,
  session,
  isLastWithoutCaptcha,
  goBack,
  sendOtp,
}: {
  mail: string
  nextPageHandler: any
  otp: string
  setOtp: any
  fields: any
  session: string
  isLastWithoutCaptcha?: boolean
  goBack: () => void
  sendOtp: (_data: { email: string; captcha?: string }) => void
}): ReactElement {
  const [timer, setTimer] = useState(60)
  const [isCanResend, setIsCanResend] = useState(false)
  const [isError, setIsError] = useState(false)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const t = useTranslations()

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

  const { mutate: checkOtp, isPending } = useMutation({
    mutationFn: confirmOTP,
    onSuccess: (res) => {
      nextPageHandler(res)
    },
    onError: () => {
      setIsError(true)
      setFailedAttempts((prev) => prev + 1)
    },
  })

  const onChangeCaptcha = (value: string | null) => {
    setTimer(60)
    sendOtp({ email: mail.toLowerCase(), captcha: value || undefined })
    setIsCanResend(false)
  }

  const checkOtpCode = () => {
    setIsError(false)
    checkOtp({ email: mail.toLowerCase(), code: otp, session })
  }

  const resendOtp = () => {
    setTimer(60)
    sendOtp({ email: mail.toLowerCase() })
    setIsCanResend(false)
  }

  return (
    <>
      <MainText
        title={t('auth.confirm-email')}
        description={t('auth.send-otp-email', {
          email: obfuscateEmail(mail),
        })}
      />
      <Form onFinish={checkOtpCode}>
        {isLastWithoutCaptcha && (
          <Flex className="mb-[24px] items-center justify-center">
            <ReCAPTCHA
              sitekey="6Ld44NwrAAAAAAH5gmybCSIf0RZ7zJHbSm00kKcR"
              onChange={onChangeCaptcha}
              onError={(e) => console.log('Captcha error: ', e)}
              className="flex w-full justify-center"
            />
          </Flex>
        )}

        {!isLastWithoutCaptcha && (
          <>
            <Form.Item className="m-0" name="otp">
              <OTPInput
                value={otp}
                onChange={(otp) =>
                  setOtp({
                    ...fields,
                    otp: otp,
                  })
                }
                numInputs={6}
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
                  borderColor: isError ? '#FF4E4E' : '#F7F7F7',
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
            <Flex className="mb-[24px] items-center justify-center">
              {failedAttempts !== 3 ? (
                <Button
                  aria-label={
                    isCanResend ? t('auth.resend-otp') : t('auth.resend-otp-in', { time: timer })
                  }
                  type="link"
                  className="flex items-center"
                  disabled={!isCanResend}
                  onClick={resendOtp}
                >
                  <SyncOutlined />
                  {isCanResend ? t('auth.resend-otp') : t('auth.resend-otp-in', { time: timer })}
                </Button>
              ) : (
                <Button
                  aria-label={
                    isCanResend ? t('auth.resend-otp') : t('auth.resend-otp-in', { time: timer })
                  }
                  type="link"
                  className="flex items-center"
                  onClick={goBack}
                >
                  <SyncOutlined />
                  {t('auth.too-many-otp-attempts')}
                </Button>
              )}
            </Flex>

            <Button
              aria-label={t('auth.continue')}
              size="large"
              type="primary"
              shape="default"
              htmlType="submit"
              className="!h-[56px] w-full shadow-none disabled:bg-primary/20 disabled:text-white"
              disabled={failedAttempts === 3}
              loading={isPending}
            >
              {t('auth.continue')}
            </Button>
          </>
        )}
      </Form>
    </>
  )
}
