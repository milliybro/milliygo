import Booking from '@/features/Account/booking'
import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import React from 'react'

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

export default function BookingPage(): React.ReactElement {
  return (
    <CheckAuthLayout>
      <Booking />
    </CheckAuthLayout>
  )
}
