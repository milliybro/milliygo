import React from "react";
import PrivacyPage from '@/features/Account/accountManagement/privacy'
import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getServerSideProps(context: IProps) {
  return {
    props: {
      messages: (await import(`../../../../locales/${context.locale}.json`)).default,
    },
  }
}

export default function Privacy(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <PrivacyPage />
    </CheckAuthLayout>
  )
}
