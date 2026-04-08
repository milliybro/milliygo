
import OrderFullPage from '@/features/Orders/Orders'
import { useTranslations } from 'next-intl'


interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getServerSideProps(context: IProps) {
  return {
    props: {
      messages: (await import(`../../locales/${context.locale}.json`)).default,
    },
  }
}

const OrdersPage = () => {
  const t = useTranslations()


  return (
    <main className="bg-[#F8F8FA]">
      <div className="container ">
        <OrderFullPage />
      </div>
    </main>
  )
}

export default OrdersPage
