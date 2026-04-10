import CBreadcrumb from '@/components/common/CBreadcrumb'
import { useTranslations } from 'next-intl'
import StoreItem from '@/features/StoreItem/StoreItem'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
  params: { slug: string }
}

export async function getServerSideProps(context: IProps) {
  return {
    props: {
      messages: (await import(`../../../locales/${context.locale}.json`)).default,
    },
  }
}

const StoreItemPage = () => {
  const t = useTranslations()
  const breadCrumbItems = [
    {
      title: t('preferences.main'),
      href: '/',
    },
    {
      title: "Do'konlar",
      href: '/store',
    },
    {
      title: 'Batafsil',
    },
  ]

  return (
    <main className="bg-white mb-20">
      <div className="container">
      {/* <CBreadcrumb items={breadCrumbItems} /> */}
      <StoreItem />
      </div>
    </main>
  )
}

export default StoreItemPage
