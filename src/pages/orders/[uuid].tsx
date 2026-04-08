import { useRouter } from 'next/router'
import OrderDetails from '@/features/Orders/components/OrderDetails'
import Head from 'next/head'

const OrderTrackingPage = () => {
    const router = useRouter()
    const { uuid } = router.query

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
