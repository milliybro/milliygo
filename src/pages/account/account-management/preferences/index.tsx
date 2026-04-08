import React from "react";
import PreferencesPage from '@/features/Account/accountManagement/preferences'
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

export default function Preferences(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <PreferencesPage />
    </CheckAuthLayout>
  )
}
