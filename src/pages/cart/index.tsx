import { Typography } from 'antd'

import CBreadcrumb from '@/components/common/CBreadcrumb'
import Faq from '@/features/Faq'
import { useTranslations } from 'next-intl'
import StoreList from '@/features/Stores/StoreList'
import CartFullPage from '@/features/Cart/Cart'

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
