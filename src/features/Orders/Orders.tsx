import { Typography, Tabs, Tag, Skeleton, Empty, Button } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/features/Cart/api'
import { useRouter } from 'next/router'
import { ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, ShoppingOutlined, RightOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { Title, Text } = Typography

// Status mapping and styling
const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
    PENDING: { label: 'Kutilmoqda', color: 'blue', icon: <ClockCircleOutlined /> },
    ACCEPTED: { label: 'Tasdiqlandi', color: 'cyan', icon: <CheckCircleOutlined /> },
    PREPARING: { label: 'Tayyorlanmoqda', color: 'orange', icon: <ClockCircleOutlined /> },
    READY: { label: 'Tayyor', color: 'green', icon: <CheckCircleOutlined /> },
    DELIVERING: { label: 'Yetkazilmoqda', color: 'purple', icon: <ClockCircleOutlined /> },
    DELIVERED: { label: 'Yetkazildi', color: 'success', icon: <CheckCircleOutlined /> },
    REJECTED: { label: 'Rad etildi', color: 'error', icon: <CloseCircleOutlined /> },
    CANCELLED: { label: 'Bekor qilindi', color: 'default', icon: <CloseCircleOutlined /> }
}

const OrderCard = ({ order }: { order: any }) => {
    const router = useRouter()
    const config = statusConfig[order.status] || { label: order.status, color: 'default', icon: null }
    const fmt = (n: any) => Number(n).toLocaleString('uz-UZ').replace(/,/g, ' ')
    
    // First item's product info for general look
    const firstItem = order.items?.[0]?.product
    const restaurant = firstItem?.partner

    return (
        <div className="bg-white rounded-[24px] border border-gray-100 hover:border-blue-100 p-4 sm:p-5 mb-4 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                        <img 
                            src={restaurant?.logo || '/placeholder-logo.png'} 
                            alt={restaurant?.name} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <Text className="text-[16px] font-bold text-gray-900 leading-none">
                                {restaurant?.name || order.partner_name || "Noma'lum maskan"}
                            </Text>
                            <RightOutlined className="text-[10px] text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        <Text className="text-[13px] text-gray-400 block mt-1">
                            №{order.id} • {dayjs(order.created_at).format('DD.MM.YYYY HH:mm')}
                        </Text>
                    </div>
                </div>
                <Tag 
                    icon={config.icon} 
                    color={config.color} 
                    className="m-0 rounded-full px-3 py-0.5 font-medium border-none flex items-center gap-1.5"
                >
                    {config.label}
                </Tag>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex -space-x-4 overflow-hidden py-1">
                    {order.items?.slice(0, 3).map((item: any) => (
                        <div 
                            key={item.uuid} 
                            className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-50 overflow-hidden"
                            title={item.product?.name}
                        >
                            <img 
                                src={item.product?.images?.[0]?.image || '/placeholder-food.png'} 
                                alt={item.product?.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                    {order.items?.length > 3 && (
                        <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                            +{order.items.length - 3}
                        </div>
                    )}
                </div>
                <Text className="text-[14px] text-gray-600 font-medium">
                    {order.items?.length} ta mahsulot
                </Text>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex flex-col">
                    <Text className="text-[12px] text-gray-400">Umumiy summa</Text>
                    <Text className="text-[17px] font-bold text-blue-600">
                        {fmt(order.total_price)} <span className="text-[13px] font-bold">UZS</span>
                    </Text>
                </div>
                <Button 
                    type="link" 
                    className="p-0 h-auto font-bold text-gray-400 hover:text-blue-500 flex items-center gap-1"
                    onClick={() => router.push(`/orders/${order.uuid}`)}
                >
                    Batafsil
                </Button>
            </div>
        </div>
    )
}

const OrderFullPage = () => {
    const router = useRouter()
    const { data: ordersData, isLoading } = useQuery({
        queryKey: ['my-orders'],
        queryFn: getOrders
    })

    const orders = ordersData?.results || []
    const activeOrders = orders.filter((o: any) => !['DELIVERED', 'REJECTED', 'CANCELLED'].includes(o.status))
    const historyOrders = orders.filter((o: any) => ['DELIVERED', 'REJECTED', 'CANCELLED'].includes(o.status))

    const renderOrderList = (list: any[]) => {
        if (list.length === 0) {
            return (
                <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[32px] border border-gray-50 shadow-sm mt-4">
                    <div className="w-[180px] h-[180px] mb-6 opacity-80">
                        <Empty 
                            image={Empty.PRESENTED_IMAGE_SIMPLE} 
                            description={false} 
                        />
                    </div>
                    <Text className="text-[18px] font-bold text-gray-900 block mb-2">
                        Buyurtmalar topilmadi
                    </Text>
                    <Text className="text-[14px] text-gray-400 mb-8 max-w-[280px] text-center">
                        Hali hech qanday buyurtma bermagansiz. Menyu bo'limiga o'ting va o'zingizga yoqqanini tanlang!
                    </Text>
                    <Button 
                        type="primary" 
                        size="large" 
                        className="bg-[#FFD600] border-none text-black font-bold h-12 px-8 rounded-xl hover:!bg-[#FFC800]"
                        onClick={() => router.push('/')}
                    >
                        Buyurtma berish
                    </Button>
                </div>
            )
        }

        return (
            <div className="max-w-3xl mx-auto pt-4">
                {list.map(order => (
                    <OrderCard key={order.uuid} order={order} />
                ))}
            </div>
        )
    }

    return (
        <div className="pb-20 mt-8 max-w-5xl mx-auto px-4">
            <div className="mb-8 text-center sm:text-left">
                <Title level={2} className="!m-0 text-[32px] font-extrabold tracking-tight text-gray-900">
                    Mening buyurtmalarim
                </Title>
                <Text className="text-gray-400 mt-2 block">Sizning barcha faol va o'tgan buyurtmalaringiz shu yerda.</Text>
            </div>

            <main className="min-h-[500px]">
                {isLoading ? (
                    <div className="max-w-3xl mx-auto space-y-4 pt-4">
                        {[1, 2, 3].map(i => (
                            <Skeleton key={i} active avatar paragraph={{ rows: 2 }} className="bg-white p-6 rounded-[24px]" />
                        ))}
                    </div>
                ) : (
                    <Tabs
                        defaultActiveKey="active"
                        centered
                        className="orders-pill-tabs"
                        items={[
                            {
                                key: 'active',
                                label: (
                                    <div className="flex items-center gap-2 px-3 sm:px-6 h-10">
                                        <ShoppingOutlined className="text-[14px]" />
                                        <span className="text-[14px]">Joriy</span>
                                        {activeOrders.length > 0 && (
                                            <span className="bg-[#FFD600] text-black text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                                {activeOrders.length}
                                            </span>
                                        )}
                                    </div>
                                ),
                                children: renderOrderList(activeOrders),
                            },
                            {
                                key: 'history',
                                label: (
                                    <div className="flex items-center gap-2 px-3 sm:px-6 h-10">
                                        <ClockCircleOutlined className="text-[14px]" />
                                        <span className="text-[14px]">Tarix</span>
                                    </div>
                                ),
                                children: renderOrderList(historyOrders),
                            },
                        ]}
                    />
                )}
            </main>

            <style jsx global>{`
                .orders-pill-tabs .ant-tabs-nav {
                    margin-bottom: 24px !important;
                    display: inline-flex !important;
                    width: auto !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                }
                .orders-pill-tabs .ant-tabs-nav-wrap {
                    background: #F1F3F5;
                    padding: 4px;
                    border-radius: 14px;
                }
                .orders-pill-tabs .ant-tabs-nav-list {
                    width: 100%;
                }
                .orders-pill-tabs .ant-tabs-tab {
                    padding: 0 !important;
                    margin: 0 !important;
                    transition: all 0.3s;
                    border-radius: 11px;
                }
                .orders-pill-tabs .ant-tabs-tab-active {
                    background: white;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
                }
                .orders-pill-tabs .ant-tabs-ink-bar {
                    display: none !important;
                }
                .orders-pill-tabs .ant-tabs-tab-btn {
                    color: #4B5563 !important;
                    font-weight: 500 !important;
                }
                .orders-pill-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
                    color: #111 !important;
                    font-weight: 700 !important;
                }
                .orders-pill-tabs .ant-tabs-tab:hover {
                    color: #111 !important;
                }
            `}</style>
        </div>
    )
}

export default OrderFullPage
