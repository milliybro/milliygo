import React from 'react'
import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'

import PersonalInformationPage from '@/features/Account/accountManagement/personalInformation'

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

export default function PersonalInformation(): React.ReactElement {

  return (
    <CheckAuthLayout>
      <PersonalInformationPage />
    </CheckAuthLayout>
  );
}
