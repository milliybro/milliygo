import CBreadcrumb from '@/components/common/CBreadcrumb'
import TextMessage from '@/features/Faq/containers/TextMessage'
import { useTranslations } from 'next-intl'

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

const FaqSendMessagePage = () => {
  const t = useTranslations()
  const breadCrumbItems = [
    {
      title: t('preferences.main'),
      href: '/',
    },
    {
      title: t('routes.faq'),
      href: '/faq',
    },
    {
      title: t('faq.send-message'),
    },
  ]

  return (
    <main className="bg-white">
      <CBreadcrumb items={breadCrumbItems} />
      <div className="container max-w-[792px] mb-[90px]">
        <TextMessage />
      </div>
    </main>
  )
}

export default FaqSendMessagePage
