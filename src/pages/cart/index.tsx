import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useHasHydrated } from '@/hooks/useHasHydrated'

const CartFullPage = dynamic(() => import('@/features/Cart/Cart'), { ssr: false })

export async function getStaticProps(context: any) {
  let messages = {};
  try {
    if (context && context.locale) {
      messages = (await import(`../../locales/${context.locale}.json`)).default;
    } else {
      messages = (await import(`../../locales/uz.json`)).default;
    }
  } catch (err) {
    console.warn("Failed to load locales in src/pages/cart/index.tsx", err);
  }
  return { props: { messages } }
}

const CartPage = (props: any) => {
  const t = useTranslations()
  const hasHydrated = useHasHydrated()

  return (
    <main className="bg-[#F8F8FA]">
      <div className="container ">
        {hasHydrated && <CartFullPage />}
      </div>
    </main>
  )
}

export default CartPage
