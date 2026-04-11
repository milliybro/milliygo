import { Typography } from 'antd'

import CBreadcrumb from '@/components/common/CBreadcrumb'
import Faq from '@/features/Faq'
import { useTranslations } from 'next-intl'
import StoreList from '@/features/Stores/StoreList'
import dynamic from 'next/dynamic'
const CartFullPage = dynamic(() => import('@/features/Cart/Cart'), { ssr: false })

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getStaticProps(context: any) {
  let messages = {};
  if (context && context.locale) {
      messages = (await import(`../../locales/${context.locale}.json`)).default;
  } else {
      messages = (await import(`../../locales/uz.json`)).default;
  }
  return { props: { messages } }
}

const CartPage = () => {
  const t = useTranslations()


  return (
    <main className="bg-[#F8F8FA]">
      <div className="container ">
        <CartFullPage />
      </div>
    </main>
  )
}

export default CartPage
