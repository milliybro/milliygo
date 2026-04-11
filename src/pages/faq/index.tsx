import { Typography } from 'antd'

import CBreadcrumb from '@/components/common/CBreadcrumb'
import Faq from '@/features/Faq'
import { useTranslations } from 'next-intl'

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

const FaqPage = () => {
  const t = useTranslations()
  const breadCrumbItems = [
    {
      title: t('preferences.main'),
      href: '/',
    },
    {
      title: t('routes.faq'),
    },
  ]

  return (
    <main className="bg-[#F8F8FA]">
      <CBreadcrumb items={breadCrumbItems} />
      <div className="container ">
        <Typography.Title level={2} className=" mb-8">
          {t('routes.faq')}
        </Typography.Title>
        <Faq />
      </div>
    </main>
  )
}

export default FaqPage
