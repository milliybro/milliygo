import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import AirLineTickets from '@/features/Account/airline'

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

export default function AirlineTicketsPage() {
  return (
    <CheckAuthLayout>
      <AirLineTickets />
    </CheckAuthLayout>
  )
}
