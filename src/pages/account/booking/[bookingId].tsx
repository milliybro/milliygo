import dynamic from 'next/dynamic'

const BookingDetails = dynamic(() => import('@/features/Account/booking/booking-details'), {
  ssr: false,
})

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

const BookingDetailsPage = () => {
  return <BookingDetails />
}

export default BookingDetailsPage
