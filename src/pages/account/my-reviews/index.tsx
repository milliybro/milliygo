import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import MyReviews from '@/features/Account/reviews/MyReviews'

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

const MyReviewsPage = () => {
  return (
    <CheckAuthLayout>
      <MyReviews />
    </CheckAuthLayout>
  )
}

export default MyReviewsPage
