import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import PropertiesForm from '@/features/Account/properties/PropertiesForm'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
  req: any
  query: {
    id: string
    type?: string
  }
}

export async function getServerSideProps(context: IProps) {
  const queryId = context.query.id
  const typeId = context.query?.type || null
  try {
    const permissionForCreatingApartment = JSON.parse(context.req.cookies.userInfo).groups.find(
      (group: any) => group.name === 'Apartment create'
    )

    if (!permissionForCreatingApartment) {
      return {
        props: {
          queryId,
          typeId,
          messages: (await import(`../../../locales/${context.locale}.json`)).default,
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
        typeId,
        messages: (await import(`../../../locales/${context.locale}.json`)).default,
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

const PropertiesInfoPage = ({ queryId, typeId }: { queryId: string; typeId?: string }) => {
  return (
    <CheckAuthLayout>
      <PropertiesForm queryId={queryId} typeId={typeId} />
    </CheckAuthLayout>
  )
}

export default PropertiesInfoPage
