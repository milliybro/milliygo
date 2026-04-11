import { Typography } from 'antd'

import CBreadcrumb from '@/components/common/CBreadcrumb'
import Faq from '@/features/Faq'
import { useTranslations } from 'next-intl'
import StoreList from '@/features/Stores/StoreList'

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

const StoreListPage = () => {
  const t = useTranslations()
  const breadCrumbItems = [
    {
      title: t('preferences.main'),
      href: '/',
    },
    {
      title: "Do'konlar",
    },
  ]

  return (
    <main className="bg-[#F8F8FA]">
      <div className="container ">
        <StoreList />
      </div>
    </main>
  )
}

export default StoreListPage
