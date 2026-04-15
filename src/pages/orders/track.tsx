import { useRouter } from 'next/router'
import OrderDetails from '@/features/Orders/components/OrderDetails'
import Head from 'next/head'

export async function getStaticProps(context: any) {
    let messages = {};
    try {
        const locale = context.locale || 'uz';
        messages = (await import(`../../locales/${locale}.json`)).default;
    } catch (err) {
        console.warn("Failed to load locales for tracking page", context?.locale);
    }
    return {
        props: { messages },
    }
}

import { useHasHydrated } from '@/hooks/useHasHydrated'

const OrderTrackingPage = () => {
    const router = useRouter()
    const { uuid } = router.query
    const hasHydrated = useHasHydrated()

    if (!hasHydrated) return null

    return (
        <>
            <Head>
                <title>Buyurtmani kuzatish | Milliy</title>
            </Head>
            <div className="min-h-screen bg-[#F8F9FA]">
                {uuid && <OrderDetails uuid={uuid as string} />}
            </div>
        </>
    )
}

export default OrderTrackingPage
