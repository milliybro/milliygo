import AccountLayout from '@/components/Layouts/Account/AccountLayout'
import CustomModal from '@/components/common/CModal'
import MailIcon from '@/components/icons/mail'
import PencilIcon from '@/components/icons/pencil'
import PageHeader from '@/features/Account/components/PageHeader'
import obfuscateEmail from '@/utils/obfuscateEmail'
import { Button, Checkbox, Divider, Flex, Form, Input, Typography } from 'antd'
import { getCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

function PrivacyPage() {
  const t = useTranslations()
  const [isEditingMail, setIsEditingMail] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const [userInfo, setUserInfo] = useState<any>({})

  useEffect(() => {
    const dataUser = JSON.parse((getCookie('userInfo') as string) || '{}')
    setUserInfo(dataUser)
  }, [])

  return (
    <AccountLayout
      breadCrumbTitle={t('privacy.title')}
      breadCrumbHref={isEditingMail ? 'privacy' : ''}
      breadCrumbEditTitle={t('email-newsletter.change-settings')}
      breadCrumbEditHref={undefined}
      isEditingMail={isEditingMail}
    >
      {isEditingMail ? (
        <Flex vertical gap={24}>
          <PageHeader title={t('privacy.page-title')} />
          <Flex vertical>
            <Typography>
              {t('privacy.privacy-desc-one')}{' '}
              {/* <Typography.Link className="underline">
                {t('privacy.privacy-desc-link-one')}
              </Typography.Link> */}{' '}
              {/* <Typography.Link className="underline">
                {t('privacy.privacy-desc-link-two')}
              </Typography.Link> */}
            </Typography>

            <Form layout="vertical" className="mt-[32px]">
              <Form.Item name="name" label={t('privacy.name-lat')} required>
                <Input size="large" />
              </Form.Item>

              <Form.Item name="surname" label={t('privacy.surname-lat')} required>
                <Input size="large" />
              </Form.Item>

              <Form.Item name="email" label={t('privacy.mail')} required>
                <Input size="large" />
              </Form.Item>
            </Form>

            <Typography className="mb-[12px] text-base font-semibold text-[#232E40]">
              {t('privacy.which-to-use')}
            </Typography>

            <Form>
              <Form.Item name="name">
                <Flex className="items-start gap-[12px]">
                  <Checkbox />
                  <Flex vertical>
                    <Typography className="text-base font-medium text-[#232E40]">
                      {t('privacy.right-to-access')}
                    </Typography>
                    <Typography className="text-sm font-normal text-[#777E90]">
                      {t('privacy.right-to-access-text')}
                    </Typography>
                  </Flex>
                </Flex>
              </Form.Item>

              <Form.Item name="name">
                <Flex className="items-start gap-[12px]">
                  <Checkbox />
                  <Flex vertical>
                    <Typography className="text-base font-medium text-[#232E40]">
                      {t('privacy.right-to-edit')}
                    </Typography>
                    <Typography className="text-sm font-normal text-[#777E90]">
                      {t('privacy.right-to-edit-text')}
                    </Typography>
                  </Flex>
                </Flex>
              </Form.Item>

              <Form.Item name="name">
                <Flex className="items-start gap-[12px]">
                  <Checkbox />
                  <Flex vertical>
                    <Typography className="text-base font-medium text-[#232E40]">
                      {t('privacy.right-to-delete')}
                    </Typography>
                    <Typography className="text-sm font-normal text-[#777E90]">
                      {t('privacy.right-to-delete-text')}
                    </Typography>
                  </Flex>
                </Flex>
              </Form.Item>

              <Form.Item name="name">
                <Flex className="items-start gap-[12px]">
                  <Checkbox />
                  <Flex vertical>
                    <Typography className="text-base font-medium text-[#232E40]">
                      {t('privacy.right-to-object')}
                    </Typography>
                    <Typography className="text-sm font-normal text-[#777E90]">
                      {t('privacy.right-to-object-text')}
                    </Typography>
                  </Flex>
                </Flex>
              </Form.Item>
            </Form>

            <Button
              aria-label={t('buttons.send-request')}
              type="primary"
              onClick={() => setOpenModal(true)}
              className="h-[58px] w-max rounded-2xl shadow-none"
            >
              {t('buttons.send-request')}
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex vertical gap={24}>
          <PageHeader title={t('privacy.title')} description={t('privacy.description')} />
          <Flex vertical>
            <div className="flex flex-row items-center gap-10">
              <Typography className="font-medium text-primary-dark">
                {t('privacy.settings-privacy')}
              </Typography>
              <Typography className="flex-1">{t('privacy.settings-privacy-text')}</Typography>
              <Button
                aria-label={t('buttons.edit')}
                type="text"
                size="small"
                className={`flex w-fit items-center !text-sm font-medium text-primary hover:!text-primary`}
                onClick={() => {
                  setIsEditingMail((prev) => !prev)
                }}
              >
                <PencilIcon /> {t('buttons.edit')}
              </Button>
            </div>
            <Divider className="border-[#F8F8FA]" />
          </Flex>
        </Flex>
      )}

      <CustomModal
        modalTitle={t('privacy.sent-request')}
        modalDesc={t('privacy.sent-request-text', { email: obfuscateEmail(userInfo.email ?? '') })}
        modalIcon={<MailIcon className="text-[32px]" />}
        width={615}
        open={openModal}
        onOk={() => {
          setOpenModal(false)
        }}
        onCancel={() => {
          setOpenModal(false)
        }}
      >
        <div>
          <Button
            aria-label={t('buttons.thanks')}
            type="primary"
            className="h-[58px] w-full rounded-2xl shadow-none"
            onClick={() => {
              setOpenModal(false)
            }}
          >
            {t('buttons.thanks')}
          </Button>
        </div>
      </CustomModal>
    </AccountLayout>
  )
}

export default PrivacyPage
