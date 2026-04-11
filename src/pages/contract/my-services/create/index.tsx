import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import ContractServiceCreate from '@/features/Contract/containers/SeviceCreate'
import React from 'react'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getStaticProps(context: any) {
  let messages = {};
  if (context && context.locale) {
      messages = (await import(`../../../../locales/${context.locale}.json`)).default;
  } else {
      messages = (await import(`../../../../locales/uz.json`)).default;
  }
  return { props: { messages } }
}

export default function ContractServicesPage(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <ContractServiceCreate />
    </CheckAuthLayout>
  )
}
