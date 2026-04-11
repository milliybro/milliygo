import CBreadcrumb from '@/components/common/CBreadcrumb'
import { useTranslations } from 'next-intl'
import StoreItem from '@/features/StoreItem/StoreItem'

import { baseURL } from '@/utils/axios'

export async function getStaticPaths() {
  try {
    const res = await fetch(`${baseURL}/partner/?partner_type=SHOP`).then(v => v.json());
    const partners = res?.data?.partners || res?.results || [];
    
    const paths = partners.map((p: any) => ({
      params: { slug: p.uuid || p.id.toString() }
    }));

    return { paths, fallback: false }
  } catch (error) {
    console.error("Failed to fetch shop paths:", error);
    return { paths: [], fallback: false }
  }
}

export async function getStaticProps(context: any) {
  let messages = {};
  try {
    if (context && context.locale) {
        messages = (await import(`../../../locales/${context.locale}.json`)).default;
    } else {
        messages = (await import(`../../../locales/uz.json`)).default;
    }
  } catch (err) {
    console.warn("Failed to load locales for", context?.locale);
  }
  return { props: { messages } }
}

import { useHasHydrated } from '@/hooks/useHasHydrated'

const StoreItemPage = () => {
  const t = useTranslations()
  const hasHydrated = useHasHydrated()

  if (!hasHydrated) return null

  return (
    <main className="bg-white px-0">
      <StoreItem />
    </main>
  )
}

export default StoreItemPage
