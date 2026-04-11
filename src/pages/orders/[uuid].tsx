import { useRouter } from 'next/router'
import OrderDetails from '@/features/Orders/components/OrderDetails'
import Head from 'next/head'

// Required for Next.js static export with dynamic routes
export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

export async function getStaticProps(context: any) {
    return {
        props: {},
    }
}

const OrderTrackingPage = () => {
    const router = useRouter()
    const { uuid } = router.query

    if (router.isFallback) {
        return <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">Yuklanmoqda...</div>
    }

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
