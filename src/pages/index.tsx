
import HeroCarousel from '@/features/Main/containers/ContentInstagram/post-carousel'
import RestaurantsList from '@/features/Main/containers/RestaurantsList'
import StoreList from '@/features/Main/containers/StoreList'

interface IProps {
  locales: string[]
  locale: string
  defaultLocale: string
}

export async function getStaticProps(context: IProps) {
  return {
    props: {
      messages: (await import(`../locales/${context.locale}.json`)).default,
    },
  }
}

export default function Home() {
  
  return (
    <main className="relative flex flex-col gap-1 bg-[#FAFAFA] pb-6">
      <HeroCarousel />
      <StoreList />
      <RestaurantsList />
    </main>
  )
}
