import CheckAuthLayout from '@/components/Layouts/Account/CheckAuthLayout'
import Properties from '@/features/Account/properties'
interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
  req: any
}

export async function getServerSideProps(context: IProps) {
  try {
    const permissionForCreatingApartment = JSON.parse(context.req.cookies.userInfo).groups.find(
      (group: any) => group.name === 'Apartment create'
    )

    if (!permissionForCreatingApartment) {
      return {
        props: {
          messages: (await import(`../../../locales/${context.locale}.json`)).default,
        },
        redirect: {
          destination: '/account/account-management',
          permanent: false,
        },
      }
    }

    return {
      props: {
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

const PropertiesPage = () => {
  return (
    <CheckAuthLayout>
      <Properties />
    </CheckAuthLayout>
  )
}

export default PropertiesPage
