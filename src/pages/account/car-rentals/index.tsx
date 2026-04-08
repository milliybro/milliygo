import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import CarRentalBookings from '@/features/Account/car-rentals'

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

export default function CarRentalBookingsPage() {
  return (
    <CheckAuthLayout>
      <CarRentalBookings />
    </CheckAuthLayout>
  )
}
