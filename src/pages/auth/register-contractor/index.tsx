import RegisterContractor from '@/features/Account/auth/register-contract'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getStaticProps(context: IProps) {
  return {
    props: {
      messages: (await import(`../../../locales/${context.locale}.json`)).default,
    },
  }
}

function RegisterContractorPage() {
  return <RegisterContractor />
}

export default RegisterContractorPage
