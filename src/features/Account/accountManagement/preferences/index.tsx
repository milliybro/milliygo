import React from 'react'
import { useTranslations } from 'next-intl'
import AccountLayout from '@/components/Layouts/Account/AccountLayout'
import { Flex } from 'antd'
import PageHeader from '@/features/Account/components/PageHeader'

function PreferencesPage() {
  const t = useTranslations()

  return (
    <AccountLayout breadCrumbTitle={t('preferences.title')} breadCrumbHref="preferences">
      <Flex vertical gap={24}>
        <PageHeader title={t('preferences.title')} description={t('preferences.description')} />
      </Flex>
    </AccountLayout>
  )
}

export default PreferencesPage
