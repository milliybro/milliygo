import { Result } from 'antd'
import { GetStaticProps } from 'next'
import { useTranslations } from 'next-intl'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../locales/${locale}.json`)).default,
    },
  }
}

const CustomError = () => {
  const t = useTranslations()
  return <Result status={'error'} title={t('error.server')} subTitle={t('error.general')} />
}

export default CustomError
