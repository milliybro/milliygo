import { baseURL } from '@/utils/axios'

import FaqItem from '@/features/Faq/containers/FaqItem'
import CBreadcrumb from '@/components/common/CBreadcrumb'

import type { IFaq, IFaqFull, ListResponse } from '@/types'
import { useTranslations } from 'next-intl'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
  params: { slug: string }
}

export async function getStaticPaths() {
  return { paths: [], fallback: false }
}

export async function getStaticProps(context: any) {
  let faqFull = {};
  let filterData: any[] = [];
  const locale = context.locale || 'uz';

  try {
      faqFull = await fetch(`${baseURL}/base/faqs/${context.params.slug}`, {
        headers: {
          'Accept-Language': locale,
        },
      }).then((val) => val.json())
    
      const similarData: any = await fetch(`${baseURL}/base/faqs/`, {
        headers: {
          'Accept-Language': locale,
        },
      }).then((val) => val.json())
    
      if (similarData && similarData.results) {
        filterData = similarData.results.filter((val: any) => val.id !== (faqFull as any).id)
      }
  } catch(e) {
      console.warn("Failed to fetch FAQ data for slug", context.params?.slug);
  }

  let messages = {};
  try {
      messages = (await import(`../../../locales/${locale}.json`)).default;
  } catch (err) {
      console.warn("Failed to load locales for FAQ slug", locale);
  }

  return {
    props: {
      messages,
      data: faqFull,
      similarData: filterData,
    },
  }
}

import { useHasHydrated } from '@/hooks/useHasHydrated'

const FaqPage = ({ data, similarData }: any) => {
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
      title: data?.title || '',
    },
  ]

  return (
    <main className="bg-white">
      <CBreadcrumb items={breadCrumbItems} />
      <div className="container mb-[90px] max-w-[792px]">
        {hasHydrated && <FaqItem data={data} similarData={similarData} />}
      </div>
    </main>
  )
}

export default FaqPage
