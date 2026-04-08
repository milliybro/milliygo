import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import ComplaintsItems from '@/features/Account/complaints'
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

export default function FavoritesPage(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <ComplaintsItems />
    </CheckAuthLayout>
  )
}
