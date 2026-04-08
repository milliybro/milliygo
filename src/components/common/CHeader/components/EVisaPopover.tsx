import ArrowDown from '@/components/icons/arrow-down'
import { Button, Flex, Form, Input, Popover, Select } from 'antd'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import CustomModal from '../../CModal'
import ReCAPTCHA from 'react-google-recaptcha'
import { useMutation } from '@tanstack/react-query'
import { postEVisaCheckStatus } from '@/features/EVisa/api'
import Alert2Icon from '@/components/icons/alert-icon'

const EVisaPopover = ({ light }: any) => {
  const t = useTranslations('')
  const [form] = Form.useForm()

  const [showPopover, setShowPopover] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const checkMethod = Form.useWatch('check_method', form)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [errorText, setErrorText] = useState(false)

  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: (payload: { serial_number: string; visa_number: string; captcha: string }) =>
      postEVisaCheckStatus(payload),
    onSuccess: (data: any) => {
      router.push(`/e-visa/check-status/?application_id=${data?.application_code}`)
      setConfirmModal(false)
    },
    onError: () => {
      setErrorText(true)
    },
  })

  return (
    <div>
      <Popover
        placement="bottomLeft"
        classNames={{
          root: 'max-w-[305px] p-0',
          body: 'p-2 overflow-hidden rounded-[9px]',
        }}
        open={showPopover}
        onOpenChange={setShowPopover}
        trigger="click"
        content={
          <Flex vertical>
            <button
              type="button"
              onClick={() => {
                setShowPopover(false)
                router.push('/e-visa/application')
              }}
              className="flex w-full items-center gap-2 rounded-[9px] px-3 py-2 text-start text-sm font-medium text-primary-dark hover:bg-secondary-light"
            >
              {t('evisa.apply-evisa')}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowPopover(false)
                setConfirmModal(true)
              }}
              className="flex w-full items-center gap-2 rounded-[9px] px-3 py-2 text-start text-sm font-medium text-primary-dark hover:bg-secondary-light"
            >
              {t('evisa.check-status')}
            </button>

            {/* <button
              type="button"
              onClick={() => setShowPopover(false)}
              className="py-2 px-3 w-full text-primary-dark text-sm hover:bg-secondary-light flex items-center gap-2 text-start rounded-[9px] font-medium"
            >
              {t('evisa.check-passport')}
            </button> */}
          </Flex>
        }
      >
        <button type="button" aria-label="e-visa">
          <Flex align="center" gap={8}>
            <p className={`text-sm font-medium ${light ? 'text-primary-dark' : 'text-white'}`}>
              E-Visa
            </p>
            <ArrowDown
              className={`text-[10px] transition-all ${light ? 'text-primary-dark' : 'text-white'} ${showPopover ? 'rotate-180' : 'rotate-0'}`}
            />
          </Flex>
        </button>
      </Popover>
      <CustomModal
        modalTitle={t('evisa.circulation-status')}
        width={615}
        open={confirmModal}
        onOk={() => {
          setConfirmModal(false)
        }}
        onCancel={() => {
          setConfirmModal(false)
        }}
      >
        <div>
          <Form form={form} layout="vertical">
            {errorText ? (
              <div className="flex items-center gap-3 rounded-[10px] bg-[#EF444426] p-4">
                <Alert2Icon />
                По данному запросу ничего не найдено. Попробуйте еще раз.
              </div>
            ) : (
              ''
            )}
            <Form.Item
              label={t('evisa.choose-method')}
              name="check_method"
              className="m-0 p-0 pb-6"
              rules={[{ required: true }]}
              initialValue="application_status"
            >
              <Select
                size="large"
                placeholder={t('evisa.select-option')}
                options={[
                  {
                    label: t('evisa.circulation-status'),
                    value: 'application_status',
                    // disabled: true,
                  },
                  {
                    label: t('evisa.status-check-passport'),
                    value: 'passport_visa_status',
                  },
                ]}
              />
            </Form.Item>

            {checkMethod === 'application_status' && (
              <Form.Item
                label={t('evisa.contact-code')}
                name="external_id"
                className="m-0 p-0 pb-6"
                rules={[{ required: true, message: t('evisa.contact-code-required') }]}
              >
                <Input size="large" />
              </Form.Item>
            )}

            {checkMethod === 'passport_visa_status' && (
              <>
                <Form.Item
                  label={t('evisa.serial-number')}
                  name="serial_number"
                  className="m-0 p-0 pb-6"
                  rules={[{ required: true, message: t('evisa.serial-required') }]}
                >
                  <Input size="large" />
                </Form.Item>

                <Form.Item
                  label={t('my-properties.number-visa')}
                  name="visa_number"
                  className="m-0 p-0 pb-6"
                >
                  <Input size="large" />
                </Form.Item>
              </>
            )}
          </Form>
          <div className="-mt-3 mb-2">
            <ReCAPTCHA
              sitekey="6Ld44NwrAAAAAAH5gmybCSIf0RZ7zJHbSm00kKcR"
              //   onChange={onChangeCaptcha}
              className="flex w-full justify-start"
              onChange={(token) => {
                setCaptchaToken(token)
              }}
              onExpired={() => setCaptchaToken(null)}
            />
          </div>

          <Button
            type="primary"
            className="h-[58px] w-full rounded-2xl shadow-none"
            disabled={!captchaToken}
            loading={isPending}
            onClick={async () => {
              try {
                const values = await form.validateFields()

                if (values.check_method === 'application_status') {
                  router.push(`/e-visa/check-status/?application_id=${values.external_id}`)
                  setConfirmModal(false)
                }

                if (values.check_method === 'passport_visa_status') {
                  mutate({
                    serial_number: values.serial_number,
                    visa_number: values.visa_number,
                    captcha: captchaToken!,
                  })
                }
              } catch (err) {
                // validation error
              }
            }}
          >
            {t('evisa.status-check')}
          </Button>
        </div>
      </CustomModal>
    </div>
  )
}

export default EVisaPopover
