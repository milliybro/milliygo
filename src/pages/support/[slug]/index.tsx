import { Typography } from 'antd'

import CBreadcrumb from '@/components/common/CBreadcrumb'
import Support from '@/features/Support/Support'
import { baseURL } from '@/utils/axios'

import type { ISupportCategory, ListResponse } from '@/types'
import { useTranslations } from 'next-intl'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getServerSideProps(context: IProps) {
  const categories: ListResponse<ISupportCategory[]> = await fetch(`${baseURL}/base/pages/`, {
    headers: {
      'Accept-Language': context.locale,
    },
  }).then((val) => val.json())

  return {
    props: {
      messages: (await import(`../../../locales/${context.locale}.json`)).default,
      categories: categories.results,
    },
  }
}

const SupportSectionPage = ({ categories }: { categories: ISupportCategory[] }) => {
  const t = useTranslations()
  const breadCrumbItems = [
    {
      title: t('preferences.main'),
      href: '/',
    },
    {
      title: t('routes.support-center'),
    },
  ]

  return (
    <main className="bg-[#F8F8FA]">
      <CBreadcrumb items={breadCrumbItems} />
      <div className="container pb-[80px]">
        <Typography.Title level={2} className=" mb-8">
          {t('main.welcome-support')}
        </Typography.Title>
        <Support categories={categories} />
      </div>
    </main>
  )
}

export default SupportSectionPage
