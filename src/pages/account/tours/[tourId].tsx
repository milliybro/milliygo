import TourBookingItem from '@/features/Account/tour-booking-item'

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

const BookingTourDetailsPage = () => {
  return (
    <div className="grow bg-[#f8f8fa] pb-[17px]">
      <TourBookingItem />
    </div>
  )
}

export default BookingTourDetailsPage
