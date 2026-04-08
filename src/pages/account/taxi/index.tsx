import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import TaxiBookings from '@/features/Account/taxi'

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

export default function TaxiBookingsPage() {
  return (
    <CheckAuthLayout>
      <TaxiBookings />
    </CheckAuthLayout>
  )
}
