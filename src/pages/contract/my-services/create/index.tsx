import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import ContractServiceCreate from '@/features/Contract/containers/SeviceCreate'
import React from 'react'

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

export default function ContractServicesPage(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <ContractServiceCreate />
    </CheckAuthLayout>
  )
}
