import BookingDetailsHotel from '@/components/common/BookingDetails'

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

const BookingDetailsHotelPage = () => {
  return <BookingDetailsHotel />
}

export default BookingDetailsHotelPage
