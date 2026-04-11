import NotFoundPage404 from '@/features/NotFoundPage'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getStaticProps(context: any) {
  let messages = {};
  try {
    if (context && context.locale) {
        messages = (await import(`../locales/${context.locale}.json`)).default;
    } else {
        messages = (await import(`../locales/uz.json`)).default;
    }
  } catch (err) {
    console.warn("Failed to load locales for", context?.locale);
  }
  return { props: { messages } }
}

const Custom404 = () => {
  return <NotFoundPage404 />
}

export default Custom404
