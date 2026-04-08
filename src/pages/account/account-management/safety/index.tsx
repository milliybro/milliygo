import type { ReactElement } from "react";
import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import SafetyPage from '@/features/Account/accountManagement/safety'

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
export default function Safety(): ReactElement {
  return (
    <CheckAuthLayout>
      <SafetyPage />
    </CheckAuthLayout>
  )
}
