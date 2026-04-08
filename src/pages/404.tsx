import NotFoundPage404 from '@/features/NotFoundPage'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getStaticProps(context: IProps) {
  return {
    props: {
      messages: (await import(`../locales/${context.locale}.json`)).default,
    },
  }
}

const Custom404 = () => {
  return <NotFoundPage404 />
}

export default Custom404
