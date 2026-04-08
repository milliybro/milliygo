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

const PrivacyPage = () => {
  const t = useTranslations()
  const breadCrumbItems = [
    {
      title: t('preferences.main'),
      href: '/',
    },
    {
      title: t('privacy.title'),
    },
  ]

  return (
    <main className="bg-[#F8F8FA]">
      <CBreadcrumb items={breadCrumbItems} />
      <section className="container space-y-4 pb-8 [&_.meta]:mb-4 [&_.meta]:text-sm [&_.meta]:text-gray-600 [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_ul]:list-disc [&_ul]:pl-6">
        <h1>{t('privacy.title-2')}</h1>
        <div className="meta">
          <strong>{t('privacy.lastUpdated')}</strong> {t('privacy.insertDate')}
        </div>

        <p>
          {t.rich('privacy.intro.paragraph1', {
            strong: (chunk) => <strong>{chunk}</strong>,
          })}
        </p>
        <p>{t('privacy.intro.paragraph2')}</p>
        <p>{t('privacy.intro.paragraph3')}</p>

        {/* <h2>{t('privacy.whoWeAre.title')}</h2>
        <p>
          <strong>{t('privacy.whoWeAre.companyName')}</strong>{' '}
          {t('privacy.whoWeAre.companyNameValue')}
        </p>
        <p>
          <strong>{t('privacy.whoWeAre.registeredAddress')}</strong>{' '}
          {t('privacy.whoWeAre.registeredAddressValue')}
        </p>
        <p>
          <strong>{t('privacy.whoWeAre.countryOfOperation')}</strong>{' '}
          {t('privacy.whoWeAre.countryOfOperationValue')}
        </p>
        <p>
          <strong>{t('privacy.whoWeAre.contactEmail')}</strong>{' '}
          {t('privacy.whoWeAre.contactEmailValue')}
        </p> */}

        <h2>{t('privacy.informationCollect.title')}</h2>

        <h3>{t('privacy.informationCollect.personalInfo.title')}</h3>
        <ul>
          <li>{t('privacy.informationCollect.personalInfo.fullName')}</li>
          <li>{t('privacy.informationCollect.personalInfo.email')}</li>
          <li>{t('privacy.informationCollect.personalInfo.phone')}</li>
          <li>{t('privacy.informationCollect.personalInfo.dob')}</li>
          <li>{t('privacy.informationCollect.personalInfo.passport')}</li>
          <li>{t('privacy.informationCollect.personalInfo.billing')}</li>
          <li>{t('privacy.informationCollect.personalInfo.nationality')}</li>
          <li>{t('privacy.informationCollect.personalInfo.credentials')}</li>
        </ul>

        <h3>{t('privacy.informationCollect.bookingInfo.title')}</h3>
        <ul>
          <li>{t('privacy.informationCollect.bookingInfo.hotelReservations')}</li>
          <li>{t('privacy.informationCollect.bookingInfo.ticketDetails')}</li>
          <li>{t('privacy.informationCollect.bookingInfo.tourGuide')}</li>
          <li>{t('privacy.informationCollect.bookingInfo.travelDates')}</li>
        </ul>

        <h3>{t('privacy.informationCollect.autoCollected.title')}</h3>
        <ul>
          <li>{t('privacy.informationCollect.autoCollected.ip')}</li>
          <li>{t('privacy.informationCollect.autoCollected.device')}</li>
          <li>{t('privacy.informationCollect.autoCollected.pages')}</li>
          <li>{t('privacy.informationCollect.autoCollected.cookies')}</li>
        </ul>

        <h3>{t('privacy.informationCollect.thirdParty.title')}</h3>
        <ul>
          <li>{t('privacy.informationCollect.thirdParty.airlines')}</li>
          <li>{t('privacy.informationCollect.thirdParty.hotels')}</li>
          <li>{t('privacy.informationCollect.thirdParty.tourGuides')}</li>
          <li>{t('privacy.informationCollect.thirdParty.payment')}</li>
        </ul>

        <h2>{t('privacy.howWeUse.title')}</h2>
        <ul>
          <li>{t('privacy.howWeUse.createAccount')}</li>
          <li>{t('privacy.howWeUse.processBookings')}</li>
          <li>{t('privacy.howWeUse.provideServices')}</li>
          <li>{t('privacy.howWeUse.sendConfirmations')}</li>
          <li>{t('privacy.howWeUse.personalize')}</li>
          <li>{t('privacy.howWeUse.improve')}</li>
          <li>{t('privacy.howWeUse.comply')}</li>
          <li>{t('privacy.howWeUse.preventFraud')}</li>
        </ul>

        <h2>{t('privacy.legalBasis.title')}</h2>
        <ul>
          <li>{t('privacy.legalBasis.contract')}</li>
          <li>{t('privacy.legalBasis.consent')}</li>
          <li>{t('privacy.legalBasis.legal')}</li>
          <li>{t('privacy.legalBasis.legitimate')}</li>
        </ul>

        <h2>{t('privacy.sharing.title')}</h2>
        <p>{t('privacy.sharing.intro')}</p>
        <ul>
          <li>{t('privacy.sharing.hotels')}</li>
          <li>{t('privacy.sharing.tourGuides')}</li>
          <li>{t('privacy.sharing.payment')}</li>
          <li>{t('privacy.sharing.itServices')}</li>
          <li>{t('privacy.sharing.government')}</li>
        </ul>
        <p>{t('privacy.sharing.noSell')}</p>

        <h2>{t('privacy.internationalTransfers.title')}</h2>
        <p>{t('privacy.internationalTransfers.description')}</p>

        <h2>{t('privacy.cookies.title')}</h2>
        <p>{t('privacy.cookies.description')}</p>

        <h2>{t('privacy.dataRetention.title')}</h2>
        <p>{t('privacy.dataRetention.description')}</p>

        <h2>{t('privacy.dataSecurity.title')}</h2>
        <p>{t('privacy.dataSecurity.description')}</p>

        <h2>{t('privacy.yourRights.title')}</h2>
        <ul>
          <li>{t('privacy.yourRights.access')}</li>
          <li>{t('privacy.yourRights.correct')}</li>
          <li>{t('privacy.yourRights.delete')}</li>
          <li>{t('privacy.yourRights.restrict')}</li>
          <li>{t('privacy.yourRights.withdraw')}</li>
          <li>{t('privacy.yourRights.portability')}</li>
        </ul>
        <p>
          {t.rich('privacy.yourRights.contact', {
            strong: (chunk) => <strong>{chunk}</strong>,
          })}
        </p>

        <h2>{t('privacy.thirdPartyLinks.title')}</h2>
        <p>{t('privacy.thirdPartyLinks.description')}</p>

        <h2>{t('privacy.childrenPrivacy.title')}</h2>
        <p>{t('privacy.childrenPrivacy.description')}</p>

        <h2>{t('privacy.changes.title')}</h2>
        <p>{t('privacy.changes.description')}</p>

        <h2>{t('privacy.contact.title')}</h2>
        {/* <p>
          <strong>{t('privacy.contact.email')}</strong> {t('privacy.contact.emailValue')}
        </p>
        <p>
          <strong>{t('privacy.contact.address')}</strong> {t('privacy.contact.addressValue')}
        </p> */}

        <footer>
          <p>{t('privacy.footer.copyright')}</p>
        </footer>
      </section>
    </main>
  )
}

export default PrivacyPage
