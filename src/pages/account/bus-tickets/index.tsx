import BusTickets from '@/features/Account/bus-tickets'
import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'

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

export default function BusTicketsPage() {
  return (
    <CheckAuthLayout>
      <BusTickets />
    </CheckAuthLayout>
  )
}
