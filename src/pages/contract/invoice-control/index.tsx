import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import React from 'react'

import ContractInvoiceControl from '@/features/Contract/InvoiceControl'

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

export default function ContractServicesPage(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <ContractInvoiceControl />
    </CheckAuthLayout>
  )
}
