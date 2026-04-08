import { useBookingStore } from '@/components/common/BookingDetails/store/useBookingStore'
import CustomModal from '@/components/common/CModal'
import InfoSquareIcon from '@/components/icons/info-square'
import TelegramVerification from '@/features/HotelsItemSteps/components/TelegramVerification'
import { useBookingId } from '@/features/HotelsItemSteps/hooks/useBookingId'
import { IBookingCode, IBookingVerification, User } from '@/types'
import { Button, Card, Flex, Form, Input, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useMutation } from '@tanstack/react-query'
import { sendVerificationCode, verifyEmailCode } from '../../api'

function CheckBookingModal({
  checkBookingModal,
  setCheckBookingModal,
  setCheckCodeModal,
  checkCodeModal,
}: {
  checkCodeModal: 'email' | 'telegram' | null
  checkBookingModal: boolean
  setCheckBookingModal: Dispatch<SetStateAction<boolean>>
  setCheckCodeModal: Dispatch<SetStateAction<'email' | 'telegram' | null>>
}) {
  const [isNotFound, setIsNotFound] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>('')
  const [form] = Form.useForm()
  const { push } = useRouter()
  const [showCode, setShowCode] = useState(false)

  const { setIsVerified, setBookingId } = useBookingId()

  const t = useTranslations()

  const router = useRouter()

  const { setBookingData } = useBookingStore()

  const { mutate: sendCode, isPending: isSendingCode } = useMutation({
    mutationKey: ['sendCode'],
    mutationFn: async (data: IBookingVerification) => {
      setIsNotFound(false)
      const res = await sendVerificationCode(data)
      return res
    },
    onSuccess: (data: any) => {
      const bookingData = data
      const bookingId = bookingData?.data?.id

      setCheckBookingModal(false)

      if (bookingId) {
        setBookingData(bookingData)

        router.push(`/account/booking/details/${bookingId}`)
        return
      }

      setCheckCodeModal(data.send_type)
    },
    onError: () => {
      setBookingId(null)
      setIsNotFound(true)
    },
  })

  const { mutate: verifyCodeMutate, isPending: isVerifying } = useMutation({
    mutationKey: ['verify'],
    mutationFn: async (data: IBookingCode) => {
      setIsNotFound(false)
      const res = await verifyEmailCode(data)
      return res
    },
    onSuccess: ({ access_token }: { access_token: string }) => {
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', access_token)
      setCheckCodeModal(null)
      setIsVerified(true)
      push(`/account/check-booking/`)
    },
    onError: () => {
      setIsNotFound(true)
    },
  })

  function verifyCode() {
    verifyCodeMutate({ code: +otp })
  }

  function verifyTelegram(data: { access: string; user: User }) {
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.access)
    setCheckCodeModal(null)
    setIsVerified(true)
    push(`/account/check-booking/`)
  }

  function onSubmit(data: IBookingVerification) {
    setBookingId(data.booking_id)
    sendCode(data)
  }

  return (
    <>
      <CustomModal
        width={636}
        open={checkBookingModal}
        onOk={() => {
          setCheckBookingModal(false)
        }}
        onCancel={() => {
          setCheckBookingModal(false)
        }}
        modalTitle={t('booking.check-booking-modal')}
        modalDesc={t('booking.check-booking-modal-desc')}
      >
        {isNotFound && (
          <Card className={`rounded-lg border-danger bg-secondary-light duration-200`}>
            <Flex gap={16} className="text-danger">
              <InfoSquareIcon className="text-2xl" />
              <Typography.Text className="text-danger">
                {t('hotels.booking-not-found')}
              </Typography.Text>
            </Flex>
          </Card>
        )}

        <Form
          layout="vertical"
          name="control-hooks"
          onFinish={onSubmit}
          onValuesChange={(changedValues, allValues: any) => {
            const bookingId = allValues.order_id || ''

            if (bookingId.startsWith('11')) {
              setShowCode(true)
            } else if (bookingId.startsWith('22') || bookingId.startsWith('33')) {
              setShowCode(false)
            } else {
              setShowCode(false)
            }
          }}
        >
          <Form.Item
            name="order_id"
            label={t('hotels.number-booking')}
            rules={[
              {
                required: true,
                message: t('booking.please-fill-this-field'),
              },
            ]}
          >
            <Input size="large" placeholder="№" />
          </Form.Item>

          {showCode && (
            <Form.Item
              name="verifier"
              label={t('hotels.pin')}
              rules={[
                {
                  required: true,
                  message: t('booking.please-fill-this-field'),
                },
              ]}
            >
              <Input size="large" placeholder="####" />
            </Form.Item>
          )}
          <div className="flex w-full items-center gap-8">
            <Button
              aria-label={t('buttons.cancel')}
              size="large"
              className="w-[250px] grow bg-[#F8F8FA] text-[#232E40]"
              onClick={() => {
                setCheckBookingModal(false)
              }}
            >
              {t('buttons.cancel')}
            </Button>
            <Button
              aria-label={t('booking.check')}
              size="large"
              type="primary"
              htmlType="submit"
              className="w-[250px] grow"
              loading={isSendingCode}
            >
              {t('booking.check')}
            </Button>
          </div>
        </Form>
      </CustomModal>
      <CustomModal
        width={636}
        onCancel={() => setCheckCodeModal(null)}
        open={!!checkCodeModal}
        modalTitle={t('booking.check-code')}
        modalDesc={
          checkCodeModal
            ? t(`booking.check-code-desc-${checkCodeModal}`)
            : t('booking.check-code-desc')
        }
      >
        {isNotFound && (
          <Card className={`rounded-lg border-danger bg-secondary-light duration-200`}>
            <Flex gap={16} className="text-danger">
              <InfoSquareIcon className="text-2xl" />
              <Typography.Text className="text-danger">
                {t('hotels.invalid-code-text')}
              </Typography.Text>
            </Flex>
          </Card>
        )}
        {checkCodeModal === 'email' && (
          <Form form={form} layout="vertical" onFinish={verifyCode}>
            <Form.Item
              name="otp"
              rules={[
                { required: true, message: t('booking.please-fill-this-field') },
                {
                  len: 4,
                  message: t('booking.please-fill-this-field'),
                },
              ]}
            >
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
            </Form.Item>
            <div className="flex w-full items-center gap-8">
              <Button
                aria-label={t('buttons.cancel')}
                size="large"
                className="w-[250px] grow bg-[#F8F8FA] text-[#232E40]"
                onClick={() => {
                  setCheckCodeModal(null)
                }}
              >
                {t('buttons.cancel')}
              </Button>
              <Button
                aria-label={t('buttons.check')}
                size="large"
                type="primary"
                htmlType="submit"
                className="w-[250px] grow"
                loading={isVerifying}
              >
                {t('booking.check')}
              </Button>
            </div>
          </Form>
        )}
        {checkCodeModal === 'telegram' && (
          <div className="flex w-full justify-center">
            <TelegramVerification onVerify={verifyTelegram} />
          </div>
        )}
      </CustomModal>
    </>
  )
}

export default CheckBookingModal
