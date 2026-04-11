
import OrderFullPage from '@/features/Orders/Orders'
import { useTranslations } from 'next-intl'


interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getStaticProps(context: any) {
  let messages = {};
  try {
    if (context && context.locale) {
        messages = (await import(`../../locales/${context.locale}.json`)).default;
    } else {
        messages = (await import(`../../locales/uz.json`)).default;
    }
  } catch (err) {
    console.warn("Failed to load locales for", context?.locale);
  }
  return { props: { messages } }
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
