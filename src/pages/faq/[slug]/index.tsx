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

export async function getServerSideProps(context: IProps) {
  const faqFull: IFaqFull = await fetch(`${baseURL}/base/faqs/${context.params.slug}`, {
    headers: {
      'Accept-Language': context.locale,
    },
  }).then((val) => val.json())

  const similarData: ListResponse<IFaq[]> = await fetch(`${baseURL}/base/faqs/`, {
    headers: {
      'Accept-Language': context.locale,
    },
  }).then((val) => val.json())

  const filterData = similarData.results.filter((val) => val.id !== faqFull.id)

  return {
    props: {
      messages: (await import(`../../../locales/${context.locale}.json`)).default,
      data: faqFull,
      similarData: filterData,
    },
  }
}

const FaqPage = ({ data, similarData }: { data: IFaqFull; similarData: IFaq[] }) => {
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
      title: data.title,
    },
  ]

  return (
    <main className="bg-white">
      <CBreadcrumb items={breadCrumbItems} />
      <div className="container mb-[90px] max-w-[792px]">
        <FaqItem data={data} similarData={similarData} />
      </div>
    </main>
  )
}

export default FaqPage
