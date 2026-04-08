import CBreadcrumb from '@/components/common/CBreadcrumb'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

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

const DeleteAccountPage = () => {
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
      <div className="container flex flex-col gap-2 px-12">
        <h2>Profil ochirish ketma-ketligi.</h2>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p>1-bosqich: Shaxsiy profil menyuga o‘ting</p>
            <Image
              unoptimized
              alt="Delete image 1"
              src="/delete-1.png"
              className="max-h-[599px] max-w-[279px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>2-bosqich:"Akkaunt boshqaruviga" punktiga o‘ting</p>
            <Image
              unoptimized
              alt="Delete image 2"
              src="/delete-2.png"
              className="max-h-[599px] max-w-[279px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>3-bosqich:"Akkauntni o‘chirish" punktini tanlang</p>
            <Image
              unoptimized
              alt="Delete image 3"
              src="/delete-3.png"
              className="max-h-[599px] max-w-[279px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>4-bosqich:Sababni belgilang va tasdiqlang</p>
            <Image
              unoptimized
              alt="Delete image 4"
              src="/delete-4.png"
              className="max-h-[599px] max-w-[279px]"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default DeleteAccountPage
