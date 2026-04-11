import HeroCarousel from '@/features/Main/containers/ContentInstagram/post-carousel'
import RestaurantsList from '@/features/Main/containers/RestaurantsList'
import StoreList from '@/features/Main/containers/StoreList'
import QuickCategories from '@/features/Main/components/QuickCategories'
import { SearchOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from '/public/logo.png'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getStaticProps(context: any) {
  let messages = {};
  if (context && context.locale) {
      messages = (await import(`../locales/${context.locale}.json`)).default;
  } else {
      messages = (await import(`../locales/uz.json`)).default;
  }
  return { props: { messages } }
}

export default function Home() {
  const router = useRouter()
  
  return (
    <main className="relative flex flex-col bg-[#FAFAFA] min-h-screen">
      {/* Mobile-only Search Bar (Sticky & Premium) */}
      <div className="md:hidden sticky top-0 z-40 bg-[#FAFAFA]/80 backdrop-blur-md px-4 py-3 border-b border-[#efefed] flex items-center gap-3">
        <div className="flex-shrink-0 active:scale-95 transition-transform" onClick={() => router.push('/')}>
          <Image 
            src={logo} 
            alt="MilliyGo" 
            width={40} 
            height={40} 
            className="object-contain rounded-full"
          />
        </div>
        
        <div 
          onClick={() => router.push('/search')}
          className="flex-1 flex items-center gap-3 bg-white border border-[#e5e5e3] rounded-2xl px-4 py-2.5 shadow-sm active:scale-[0.98] transition-all"
        >
          <SearchOutlined className="text-[#999] text-lg" />
          <span className="text-[#999] text-[13px] whitespace-nowrap overflow-hidden text-ellipsis">Restoran yoki taom qidiring...</span>
        </div>
      </div>

      <div className="animate-fade-up">
        <HeroCarousel />
        
        <div className="mt-2">
          <QuickCategories />
        </div>

        <section className="mt-4">
          <StoreList />
        </section>

        <section className="mt-4">
          <RestaurantsList />
        </section>
      </div>

      {/* Spacing for bottom nav */}
      <div className="h-20 md:hidden" />
    </main>
  )
}

