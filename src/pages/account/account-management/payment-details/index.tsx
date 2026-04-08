import type { ReactElement } from "react";
import PaymentDetailsPage from '@/features/Account/accountManagement/paymentDetails'
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

export default function PaymentDetails(): ReactElement {

  return (
    <CheckAuthLayout>
      <PaymentDetailsPage/>
    </CheckAuthLayout>
  );
}
