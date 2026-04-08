import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import ToursBooking from '@/features/Account/tours'

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

export default function ToursBookingPage() {
  return (
    <CheckAuthLayout>
      <ToursBooking />
    </CheckAuthLayout>
  )
}
