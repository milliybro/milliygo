import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import Notifications from '@/features/Account/notifications'
import React from 'react'

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

export default function NotificationsPage(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <Notifications />
    </CheckAuthLayout>
  )
}
