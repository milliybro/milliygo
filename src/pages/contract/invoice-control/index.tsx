import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import React from 'react'

import ContractInvoiceControl from '@/features/Contract/InvoiceControl'

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
      <ContractInvoiceControl />
    </CheckAuthLayout>
  )
}
