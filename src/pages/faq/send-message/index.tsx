import CBreadcrumb from '@/components/common/CBreadcrumb'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useHasHydrated } from '@/hooks/useHasHydrated'

const TextMessage = dynamic(() => import('@/features/Faq/containers/TextMessage'), { ssr: false })

export async function getStaticProps(context: any) {
  let messages = {};
  try {
    if (context && context.locale) {
      messages = (await import(`../../../locales/${context.locale}.json`)).default;
    } else {
      messages = (await import(`../../../locales/uz.json`)).default;
    }
  } catch (err) {
    console.warn("Failed to load locales in src/pages/faq/send-message/index.tsx", err);
  }
  return { props: { messages } }
}

const FaqSendMessagePage = (props: any) => {
  const t = useTranslations()
  const hasHydrated = useHasHydrated()
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
        {hasHydrated && <TextMessage />}
      </div>
    </main>
  )
}

export default FaqSendMessagePage
