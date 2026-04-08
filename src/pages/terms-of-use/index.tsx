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
      title: t('others.terms-of-use'),
    },
  ]

  return (
    <main className="bg-[#F8F8FA]">
      <CBreadcrumb items={breadCrumbItems} />
      <div className="container flex flex-col gap-2">
        <h1>Terms of Use – MyUzbekistan</h1>
        <p>
          <strong>Effective Date:</strong> April 24, 2025
        </p>
        <p>
          <strong>Contact:</strong>{' '}
          <a href="mailto:myuzbekistanmyturizm@gmail.com">myuzbekistanmyturizm@gmail.com</a>
        </p>

        <h2>1. Acceptance of Terms</h2>
        <p>
          By downloading or using the MyUzbekistan app, you agree to comply with and be bound by
          these Terms of Use. If you do not agree, please do not use the app.
        </p>

        <h2>2. Use of the App</h2>
        <ul>
          <li>You may use the app only for personal, non-commercial purposes.</li>
          <li>
            You agree not to misuse the app, attempt to gain unauthorized access, or interfere with
            its normal operation.
          </li>
        </ul>

        <h2>3. Intellectual Property</h2>
        <p>
          All content, trademarks, and intellectual property in the app are owned by MyUzbekistan or
          its partners. You may not reproduce or distribute any part of the app without written
          permission.
        </p>

        <h2>4. User-Provided Content</h2>
        <p>
          If you submit any content (such as reviews or photos), you grant us a non-exclusive,
          royalty-free license to use, display, and share it within the app and for promotional
          purposes.
        </p>

        <h2>5. Disclaimer</h2>
        <p>
          The app is provided “as is” without warranties of any kind. We do not guarantee accuracy,
          completeness, or availability of information provided within the app.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          MyUzbekistan is not liable for any direct, indirect, or incidental damages arising from
          the use of the app.
        </p>

        <h2>7. Termination</h2>
        <p>
          We reserve the right to suspend or terminate access to the app at any time, with or
          without notice, if we believe you have violated these Terms.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We may update these Terms of Use from time to time. Continued use of the app means you
          accept the revised terms.
        </p>

        <h2>9. Governing Law</h2>
        <p>
          These terms shall be governed by and interpreted in accordance with the laws of the
          Republic of Uzbekistan.
        </p>

        <h2>10. Contact</h2>
        <p>
          If you have any questions about these Terms, contact us at:{' '}
          <a href="mailto:myuzbekistanmyturizm@gmail.com">myuzbekistanmyturizm@gmail.com</a>.
        </p>

        <p>Thank you for using MyUzbekistan!</p>
      </div>
    </main>
  )
}

export default TermsOfUsePage
