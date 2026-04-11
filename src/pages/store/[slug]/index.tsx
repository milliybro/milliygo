import CBreadcrumb from '@/components/common/CBreadcrumb'
import { useTranslations } from 'next-intl'
import StoreItem from '@/features/StoreItem/StoreItem'

export async function getStaticPaths() {
  return { paths: [], fallback: 'blocking' }
}

export async function getStaticProps(context: any) {
  let messages = {};
  if (context && context.locale) {
      messages = (await import(`../../../locales/${context.locale}.json`)).default;
  } else {
      messages = (await import(`../../../locales/uz.json`)).default;
  }
  return { props: { messages } }
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
    <main className="bg-white">
      <div className="container">
      {/* <CBreadcrumb items={breadCrumbItems} /> */}
      <StoreItem />
      </div>
    </main>
  )
}

export default StoreItemPage
