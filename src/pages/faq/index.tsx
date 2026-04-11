import { Typography } from 'antd'
import CBreadcrumb from '@/components/common/CBreadcrumb'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useHasHydrated } from '@/hooks/useHasHydrated'

const Faq = dynamic(() => import('@/features/Faq'), { ssr: false })

export async function getStaticProps(context: any) {
  let messages = {};
  try {
    if (context && context.locale) {
        messages = (await import(`../../locales/${context.locale}.json`)).default;
    } else {
        messages = (await import(`../../locales/uz.json`)).default;
    }
  } catch (err) {
    console.warn("Failed to load locales for FAQ index", context?.locale);
  }
  return { props: { messages } }
}

const FaqPage = (props: any) => {
  const t = useTranslations()
  const hasHydrated = useHasHydrated()
  
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
        {hasHydrated && <Faq />}
      </div>
    </main>
  )
}

export default FaqPage
