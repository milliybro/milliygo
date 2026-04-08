import React from 'react'
import SignUp from '@/features/Account/auth/sign-up'

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

export default function SignUpPage(): React.ReactElement {
  return <SignUp />
}
