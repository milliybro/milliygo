import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import Guides from '@/features/Account/guides'

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

export default function GuidesPage() {
  return (
    <CheckAuthLayout>
      <Guides />
    </CheckAuthLayout>
  )
}
