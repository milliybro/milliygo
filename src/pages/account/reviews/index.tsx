import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import Reviews from '@/features/Account/reviews'

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

const ReviewsPage = () => {
  return (
    <CheckAuthLayout>
      <Reviews />
    </CheckAuthLayout>
  )
}

export default ReviewsPage
