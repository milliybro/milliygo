import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import React from 'react'
import AccountManagement from '@/features/Account/accountManagement'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getServerSideProps(context: IProps) {
  return {
    props: {
      messages: (await import(`../../../locales/${context.locale}.json`)).default,
    },
  }
}

export default function AccountManagementPage(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <AccountManagement />
    </CheckAuthLayout>
  )
}
