import AccountLayout from '@/components/Layouts/Account/AccountLayout'
import PencilIcon from '@/components/icons/pencil'
import PageHeader from '@/features/Account/components/PageHeader'
import { Button, Divider, Flex, Typography } from 'antd'
import { getCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import RejectAll from '../../components/EmailNewsLetter/RejectAll'
import SubscribeForm from '../../components/EmailNewsLetter/SubscribeForm'

function EmailNewsLetter() {
  const t = useTranslations()
  const [isEditingMail, setIsEditingMail] = useState(false)
  const [rejectAll, setRejectAll] = useState(false)
  const [userInfo, setUserInfo] = useState<any>({})

  useEffect(() => {
    const dataUser = JSON.parse((getCookie('userInfo') as string) || '{}')
    setUserInfo(dataUser)
  }, [])

  return (
    <AccountLayout
      breadCrumbTitle={t('email-newsletter.title')}
      breadCrumbHref="email-newsletter"
      breadCrumbEditTitle={t('email-newsletter.change-settings')}
      breadCrumbEditHref="email-newsletter"
      isEditingMail={isEditingMail}
    >
      <Flex vertical gap={24}>
        <PageHeader
          title={
            isEditingMail
              ? rejectAll
                ? t('email-newsletter.rejected-all')
                : t('email-newsletter.change-settings-rassilk')
              : t('email-newsletter.title')
          }
          description={isEditingMail ? '' : t('email-newsletter.description')}
        />
        {isEditingMail ? (
          rejectAll ? (
            <RejectAll
              setIsEditingMail={setIsEditingMail}
              setRejectAll={setRejectAll}
              userInfo={userInfo}
            />
          ) : (
            <SubscribeForm setRejectAll={setRejectAll} userInfo={userInfo} />
          )
        ) : (
          <Flex vertical>
            <Flex className="grid grid-cols-3 items-center">
              <Typography className="font-medium text-primary-dark">
                {t('email-newsletter.settings-e-newsletter')}
              </Typography>
              {userInfo.email !== '' ? (
                <Typography className="font-medium text-primary-dark">{userInfo.email}</Typography>
              ) : (
                <Link
                  href="/account/account-management/personal-information/"
                  aria-label={`open personal information route`}
                >
                  <Typography.Text className="font-medium">
                    {t('email-newsletter.first-email')}
                  </Typography.Text>
                </Link>
              )}

              <Button
                aria-label="edit emails news letter"
                type="text"
                size="small"
                className={`ml-auto flex items-center !text-sm font-medium text-primary hover:!text-primary`}
                onClick={() => {
                  setIsEditingMail((prev) => !prev)
                }}
              >
                <PencilIcon /> {t('buttons.edit')}
              </Button>
            </Flex>
            <Divider className="border-[#F8F8FA]" />
          </Flex>
        )}
      </Flex>
    </AccountLayout>
  )
}

export default EmailNewsLetter
