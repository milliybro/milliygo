import SingleBooking from '@/features/Account/booking/single-booking'

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

function SingleBookingPage() {
  return (
    <div className="bg-[#f8f8fa] h-full">
      <SingleBooking />
    </div>
  )
}

export default SingleBookingPage
