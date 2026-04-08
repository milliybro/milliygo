import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import ArrowRightUp from '@/components/icons/arrow-right-up'
import CreditCardIcon from '@/components/icons/credit-card'
import IdCardIcon from '@/components/icons/id-card'
import NotificationIcon from '@/components/icons/notification'
import SquareLockIcon from '@/components/icons/square-lock'
import UserIconOutlined from '@/components/icons/user'
import { Card, Flex, Typography } from 'antd'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

function AccountManagement() {
  const t = useTranslations('')

  const cardItems = [
    {
      icon: <UserIconOutlined className="text-[22px]" />,
      title: t('personal-information.title'),
      description: t('personal-information.description'),
      path: 'account-management/personal-information',
    },
    {
      icon: <SquareLockIcon className="text-[22px]" />,
      title: t('safety.title'),
      description: t('safety.description'),
      path: 'account-management/safety',
    },
    {
      icon: <CreditCardIcon className="text-[22px]" />,
      title: t('payment-details.title'),
      description: t('payment-details.description'),
      path: 'account-management/payment-details',
    },
    {
      icon: <IdCardIcon className="text-[22px]" />,
      title: t('privacy.title'),
      description: t('privacy.description'),
      path: 'account-management/privacy',
    },
    {
      icon: <NotificationIcon className="text-[22px]" />,
      title: t('email-newsletter.title'),
      description: t('email-newsletter.description'),
      path: 'account-management/email-newsletter',
    },
  ]

  return (
    <AccountMainLayout
      breadCrumbItems={[
        {
          title: t('preferences.main'),
          href: '/',
        },
        {
          title: t('account-management.title'),
          href: '/account/account-management',
        },
      ]}
    >
      <Flex vertical gap={24}>
        <Typography>
          <Typography.Title level={3} className="m-0 !mb-2">
            {t('account-management.title')}
          </Typography.Title>
          <Typography.Text className="text-sm">
            {t('account-management.description')}
          </Typography.Text>
        </Typography>
        <div className="grid grid-cols-2 gap-6 dsm:grid-cols-1">
          {cardItems.map((val) => (
            <Link key={val?.path} href={`${val.path}`} aria-label={`open ${val.path} route`}>
              <Card
                key={val.title}
                hoverable
                style={{ padding: '16px', height: '100%' }}
                className="card-body-no-padding border-[#F8F8FA] duration-300 hover:border-[#f8f8fa] hover:bg-[#F8F8FA]/40 hover:shadow-none"
              >
                <Flex gap={16} className="h-full">
                  <div>
                    <span className="flex h-[44px] w-[44px] items-center justify-center !rounded-md bg-[#F8F8FA] text-secondary">
                      {val.icon}
                    </span>
                  </div>
                  <Typography className="flex flex-col">
                    <Typography.Title className="m-0 !mb-1 !leading-[20px]" level={5}>
                      {val.title}
                    </Typography.Title>
                    <Typography className="mb-3 flex-1 text-sm !leading-[140%]">
                      {val.description}
                    </Typography>
                    <Typography className="flex items-center gap-2 text-sm text-[#3276FF]">
                      {t('buttons.edit')} <ArrowRightUp className="text-xs" />
                    </Typography>
                  </Typography>
                </Flex>
              </Card>
            </Link>
          ))}
        </div>
      </Flex>
    </AccountMainLayout>
  )
}

export default AccountManagement
