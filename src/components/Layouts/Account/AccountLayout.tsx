import ArrowLeftIcon from '@/components/icons/arrow-left'
import NotificationIcon from '@/components/icons/notification'
import UserCircleIcon from '@/components/icons/user-circle'
import AccountMainLayout from '@/components/Layouts/Account/AcountMainLayout'
import { MenuProps } from 'antd'
import { useTranslations } from 'next-intl'
import React, { ReactElement } from 'react'

import CreditCardIcon from '@/components/icons/credit-card'
import IdCardIcon from '@/components/icons/id-card'
import SquareLockIcon from '@/components/icons/square-lock'
import { getItem } from '@/helpers/menu-get-item'

interface IProps {
  breadCrumbTitle: string
  breadCrumbHref: string
  breadCrumbEditTitle?: string
  breadCrumbEditHref?: string
  isEditingMail?: boolean
  children: React.ReactNode
}

export default function AccountLayout({
  breadCrumbTitle,
  breadCrumbHref,
  breadCrumbEditTitle = '',
  breadCrumbEditHref = '',
  isEditingMail,
  children,
}: IProps): ReactElement {
  const t = useTranslations()

  const menuItems: MenuProps['items'] = [
    getItem(
      t('account-management.title'),
      '/account/account-management',
      <ArrowLeftIcon className="text-lg" />
    ),
    getItem(
      t('personal-information.title'),
      '/account/account-management/personal-information',
      <UserCircleIcon className="text-lg !text-[#777E90]" />
    ),

    getItem(
      t('safety.title'),
      '/account/account-management/safety',
      <SquareLockIcon className="mr-[2px] text-[18px] !text-[#777E90]" />
    ),
    getItem(
      t('payment-details.title'),
      '/account/account-management/payment-details',
      <CreditCardIcon className="text-[22px] !text-[#777E90]" />
    ),
    getItem(
      t('privacy.title'),
      '/account/account-management/privacy',
      <IdCardIcon className="text-[22px] !text-[#777E90]" />
    ),
    getItem(
      t('email-newsletter.title'),
      '/account/account-management/email-newsletter',
      <NotificationIcon className="text-[22px] !text-[#777E90]" />
    ),
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
        {
          title: breadCrumbTitle,
          href: breadCrumbHref ? `/account/account-management/${breadCrumbHref}` : undefined,
        },
        isEditingMail
          ? {
              title: breadCrumbEditTitle,
              href: breadCrumbEditHref
                ? `/account-management/${breadCrumbHref}/${breadCrumbEditHref}`
                : undefined,
            }
          : {},
      ]}
      menuItems={menuItems}
    >
      {children}
    </AccountMainLayout>
  )
}
