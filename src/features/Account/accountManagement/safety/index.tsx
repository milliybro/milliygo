import AccountLayout from '@/components/Layouts/Account/AccountLayout'
import PageHeader from '@/features/Account/components/PageHeader'
import AccountDeletion from '@/features/Account/components/PersonalInformation/account-deletion'
import Password from '@/features/Account/components/Safety/password'
import { Flex } from 'antd'
import { useTranslations } from 'next-intl'

function SafetyPage() {
  const t = useTranslations()

  return (
    <AccountLayout breadCrumbTitle={t('safety.title')} breadCrumbHref="safety">
      <Flex vertical gap={24}>
        <PageHeader title={t('safety.title')} description={t('safety.description')} />
        <Flex vertical>
          <Password />

          <AccountDeletion />
        </Flex>
      </Flex>
    </AccountLayout>
  )
}

export default SafetyPage
