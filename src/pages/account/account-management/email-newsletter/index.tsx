import React from "react";
import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import EmailNewsLetter from '@/features/Account/accountManagement/emailNewsletter'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getServerSideProps(context: IProps) {
  return {
    props: {
      messages: (await import(`../../../../locales/${context.locale}.json`)).default,
    },
  }
}

export default function EmailNewsletter(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <EmailNewsLetter/>
    </CheckAuthLayout>
  );
}
