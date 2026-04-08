import CBreadcrumb from '@/components/common/CBreadcrumb'
import { useTranslations } from 'next-intl'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getServerSideProps(context: IProps) {
  return {
    props: {
      messages: (await import(`../../locales/${context.locale}.json`)).default,
    },
  }
}

const TermsOfUsePage = () => {
  const t = useTranslations()
  const breadCrumbItems = [
    {
      title: t('preferences.main'),
      href: '/',
    },
    {
      title: t('others.delete-data'),
    },
  ]

  return (
    <main className="bg-[#F8F8FA]">
      <CBreadcrumb items={breadCrumbItems} />
      <div className="container flex flex-col gap-2">
        <h1>Data Deletion Request – MyUzbekistan</h1>
        <p>
          <strong>Effective Date:</strong> April 24, 2025
        </p>
        <p>
          At MyUzbekistan, we respect your privacy and allow you to request deletion of your
          personal data associated with the MyUzbekistan app.
        </p>

        <h2>How to Request Data Deletion</h2>
        <p>
          To request the deletion of your personal data, please send an email to our support team
          at:
        </p>
        <p>
          <a href="mailto:myuzbekistanmyturizm@gmail.com">myuzbekistanmyturizm@gmail.com</a>
        </p>

        <h2>Information Required</h2>
        <p>In your email, please include the following information to help us locate your data:</p>
        <ul>
          <li>Your full name</li>
          <li>Your email address (used in the app, if applicable)</li>
          <li>Any other identifying information (e.g. user ID or screenshots)</li>
        </ul>

        <h2>What Happens Next?</h2>
        <p>
          Once we receive your request, we will review it and delete your data in accordance with
          our privacy practices and local laws. You will receive a confirmation once your data has
          been deleted.
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions or need assistance with your request, feel free to reach out to
          us at:
        </p>
        <p>
          <a href="mailto:myuzbekistanmyturizm@gmail.com">myuzbekistanmyturizm@gmail.com</a>
        </p>

        <p>Thank you for using MyUzbekistan!</p>
      </div>
    </main>
  )
}

export default TermsOfUsePage
