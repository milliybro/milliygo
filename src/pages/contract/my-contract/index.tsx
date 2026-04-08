import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import ContractMyContract from '@/features/Contract/MyContract'
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

export default function ContractServicesPage(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <ContractMyContract />
    </CheckAuthLayout>
  )
}
