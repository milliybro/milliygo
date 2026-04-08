import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import Excursions from '@/features/Account/excursions'

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

export default function ExcursionsPage() {
  return (
    <CheckAuthLayout>
      <Excursions />
    </CheckAuthLayout>
  )
}
