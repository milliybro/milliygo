import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import ContractMyContract from '@/features/Contract/MyContract'
import React from 'react'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getStaticProps(context: any) {
  let messages = {};
  if (context && context.locale) {
      messages = (await import(`../../../locales/${context.locale}.json`)).default;
  } else {
      messages = (await import(`../../../locales/uz.json`)).default;
  }
  return { props: { messages } }
}

export default function ContractServicesPage(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <ContractMyContract />
    </CheckAuthLayout>
  )
}
