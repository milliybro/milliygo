import React from 'react'
import SignUp from '@/features/Account/auth/sign-up'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getStaticProps(context: any) {
  let messages = {};
  if (context && context.locale) {
      messages = (await import(`../../../locales/${context.locale}.json`)).default;
  } else {
      messages = (await import(`../../../locales/uz.json`)).default;
  }
  return { props: { messages } }
}

export default function SignUpPage(): React.ReactElement {
  return <SignUp />
}
