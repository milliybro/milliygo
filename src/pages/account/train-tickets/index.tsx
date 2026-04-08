import TrainsTickets from '@/features/Account/train-tickets'
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

export default function TrainTicketsPage() {
  return (
    <CheckAuthLayout>
      <TrainsTickets />
    </CheckAuthLayout>
  )
}
