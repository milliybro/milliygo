import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import PropertiesDashboardBooking from '@/features/Account/properties/PropertiesDashboardBooking'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
  req: any
  query: {
    id: string
    action?: string
  }
}

export async function getServerSideProps(context: IProps) {
  const queryId = context.query.id
  const action = context.query.action
  try {
    const permissionForCreatingApartment = JSON.parse(context.req.cookies.userInfo).groups.find(
      (group: any) => group.name === 'Apartment create'
    )

    if (!permissionForCreatingApartment) {
      return {
        props: {
          queryId,
          action: action ?? null,
          messages: (await import(`../../../../../locales/${context.locale}.json`)).default,
        },
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    return {
      props: {
        queryId,
        action: action ?? null,
        messages: (await import(`../../../../../locales/${context.locale}.json`)).default,
      },
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/error-page',
        permanent: false,
      },
    }
  }
}

const PropertiesInfoPage = (props: { queryId: string; action: string }) => {
  const { queryId } = props
  if (!queryId) return null

  return (
    <CheckAuthLayout>
      <PropertiesDashboardBooking queryId={queryId} />
    </CheckAuthLayout>
  )
}

export default PropertiesInfoPage
