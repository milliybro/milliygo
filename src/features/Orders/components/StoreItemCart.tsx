import { useRouter } from 'next/router'
import { useCartStore } from '@/store/cartStore'
import { useContext, useState, useMemo } from 'react'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { Typography, Input, Modal, Select, Button, TimePicker, message } from 'antd'
import { 
    EnvironmentOutlined, 
    CreditCardOutlined, 
    ClockCircleOutlined, 
    RightOutlined,
    CheckCircleFilled
} from '@ant-design/icons'
import { YMaps, Map, Placemark, ZoomControl, FullscreenControl, SearchControl, GeolocationControl } from '@pbe/react-yandex-maps'
import dayjs from 'dayjs'

const { Title, Text } = Typography
const { TextArea } = Input

// G'allaorol center coordinates
const GALLAOROL_COORDS = [39.998492, 67.585542]
const MAX_DISTANCE_KM = 5 // Allowed radius for central part

import { createOrder } from '../api'

const StoreItemCart = ({
    restaurantData,
    restaurantLoading,
}: {
    restaurantData: any
    restaurantLoading: boolean
}) => {
    const router = useRouter()
    const { slug: querySlug } = router.query
    const { carts, clearCart } = useCartStore()
    const authContext = useContext(AuthContext) as any
    const isAuthenticated = authContext?.authStore?.isAuthenticated
    const openLogin = authContext?.openLogin

    const [comment, setComment] = useState('')
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
    const [selectedCoords, setSelectedCoords] = useState<number[] | null>(null)
    const [addressText, setAddressText] = useState('Manzil tanlanmagan')
    const [paymentMethod, setPaymentMethod] = useState('cash')
    const [deliveryTime, setDeliveryTime] = useState<string>('Hozir')
    const [loading, setLoading] = useState(false)

    // Distance calculation helper
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371 // km
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLon = (lon2 - lon1) * Math.PI / 180
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
                Math.sin(dLon/2) * Math.sin(dLon/2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        return R * c
    }

    const handleMapClick = (e: any) => {
        const coords = e.get('coords')
        const dist = calculateDistance(coords[0], coords[1], GALLAOROL_COORDS[0], GALLAOROL_COORDS[1])
        
        if (dist > MAX_DISTANCE_KM) {
            message.error("Kechirasiz, yetkazib berish faqat G'allaorol shahri ichida amalga oshiriladi.")
            return
        }
        
        setSelectedCoords(coords)
        setAddressText(`G'allaorol (${coords[0].toFixed(4)}, ${coords[1].toFixed(4)})`)
    }

    // Calculate subtotal
    const subtotal = useMemo(() => {
        return querySlug 
            ? (carts[querySlug as string]?.items?.reduce((s: number, i: any) => s + i.price * i.quantity, 0) || 0)
            : Object.values(carts).flatMap(c => c.items || []).reduce((s: number, i: any) => s + i.price * i.quantity, 0)
    }, [carts, querySlug])

    const fmt = (n: number) => n.toLocaleString('uz-UZ').replace(/,/g, ' ')

    const handleCreateOrder = async () => {
        alert('Tugma bosildi! (Start)')
        
        if (!isAuthenticated) {
            alert('Xatolik: Tizimga kirilmagan!')
            openLogin?.()
            return
        }
        if (!selectedCoords) {
            alert('Xatolik: Manzil tanlanmagan!')
            message.warning("Iltimos, yetkazib berish manzilini tanlang.")
            setIsLocationModalOpen(true)
            return
        }

        const activeStoreId = querySlug as string || Object.keys(carts).find(id => (carts[id].items?.length || 0) > 0)
        if (!activeStoreId) {
            alert('Xatolik: Do\'kon (Store) aniqlanmadi!')
            return
        }

        setLoading(true)
        try {
            const cartItems = carts[activeStoreId]?.items || []
            
            // Check for legacy items without UUID
            const hasMissingUuid = cartItems.some(item => !item.uuid)
            if (hasMissingUuid) {
                alert('Xatolik: Savatda eski mahsulotlar bor! UUID topilmadi.')
                message.error("Savatchangizda eski mahsulotlar bor. Iltimos, savatni tozalab, mahsulotlarni qayta qo'shing.")
                setLoading(false)
                return
            }

            alert('Request yuborilyapti...')
            // Get user phone from authState in localStorage
            const authStateRaw = localStorage.getItem('authState')
            const authState = authStateRaw ? JSON.parse(authStateRaw) : {}
            const userPhone = authState?.userInfo?.phone_number || ''

            if (!userPhone) {
                message.error("Telefon raqami topilmadi. Iltimos, tizimga qayta kiring.")
                setLoading(false)
                return
            }

            const orderData = {
                description: comment || "Izoh yo'q",
                address: addressText,
                contact_phone: userPhone,
                latitude: String(selectedCoords[0]),
                longitude: String(selectedCoords[1]),
                items: cartItems.map(item => ({
                    product_uuid: item.uuid,
                    quantity: item.quantity
                }))
            }

            const response = await createOrder(orderData)
            
            if (response) {
                message.success("Buyurtmangiz muvaffaqiyatli qabul qilindi!")
                clearCart(activeStoreId)
                router.push('/')
            }
        } catch (error: any) {
            console.error("Order creation failed:", error)
            message.error(error?.response?.data?.message || "Buyurtma berishda xatolik yuz berdi.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className="bg-white rounded-[28px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col gap-2">
                <Title level={4} className="!mb-4 !text-[22px] font-bold text-gray-900">
                    Buyurtmani rasmiylashtirish
                </Title>
                
                <div className="flex flex-col divide-y divide-gray-100/80">
                    {/* Location Selection */}
                    <div 
                        onClick={() => setIsLocationModalOpen(true)}
                        className="flex items-center gap-4 py-4 cursor-pointer group hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-xl"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <EnvironmentOutlined className="text-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <Text className="text-[13px] text-gray-400 block mb-0.5">Yetkazib berish manzili</Text>
                            <Text className={`text-[16px] font-bold block truncate ${selectedCoords ? 'text-[#059669]' : 'text-gray-900'}`}>
                                {addressText}
                                {selectedCoords && <CheckCircleFilled className="ml-2 text-[14px]" />}
                            </Text>
                        </div>
                        <RightOutlined className="text-gray-300 text-[12px]" />
                    </div>

                    {/* Payment Dropdown */}
                    <div className="flex items-center gap-4 py-3 transition-colors px-2 -mx-2">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                            <CreditCardOutlined className="text-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <Text className="text-[13px] text-gray-400 block mb-0.5">To'lov usuli</Text>
                            <Select 
                                value={paymentMethod}
                                onChange={setPaymentMethod}
                                className="w-full !font-bold !text-[16px] checkout-select"
                                variant="borderless"
                                options={[
                                    { value: 'cash', label: 'Naqd pul orqali' }
                                ]}
                            />
                        </div>
                    </div>

                    {/* Delivery Time Selection */}
                    <div className="flex items-center gap-4 py-3 group transition-colors px-2 -mx-2">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                            <ClockCircleOutlined className="text-xl" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <Text className="text-[13px] text-gray-400 block mb-0.5">Yetkazib berish vaqti</Text>
                            <Select 
                                value={deliveryTime}
                                onChange={setDeliveryTime}
                                className="w-full !font-bold !text-[16px] checkout-select"
                                variant="borderless"
                                options={[
                                    { value: 'Hozir', label: 'Hozir' },
                                    { value: '15 daqiqada', label: '15 daqiqada' },
                                    { value: '30 daqiqada', label: '30 daqiqada' },
                                    { value: '60 daqiqada', label: '60 daqiqada' }
                                ]}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 p-4 bg-[#F2F4F7] rounded-[20px]">
                    <Text className="text-[13px] text-gray-500 font-medium block mb-2 px-1">
                        Buyurtmaga izoh
                    </Text>
                    <TextArea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Izohingizni kiriting"
                        autoSize={{ minRows: 3, maxRows: 5 }}
                        className="!bg-white !border-none !rounded-[14px] !p-3 !text-[14px] hover:!bg-white focus:!bg-white focus:!shadow-none placeholder:!text-gray-300"
                    />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-6 px-1">
                        <Text className="text-[15px] text-gray-500 font-medium font-['Outfit']">Jami summa:</Text>
                        <div className="text-right">
                            <span className="text-[22px] font-bold text-gray-900">{fmt(subtotal)}</span>
                            <span className="text-[15px] font-bold text-gray-900 ml-1.5 uppercase">UZS</span>
                        </div>
                    </div>

                    <button
                        onClick={handleCreateOrder}
                        disabled={subtotal === 0 || loading}
                        className={`w-full ${subtotal === 0 || loading ? 'bg-gray-200 cursor-not-allowed opacity-60' : 'bg-[#FFD600] hover:bg-[#FFC800] active:scale-[0.98]'} transition-all rounded-[20px] py-4.5 text-[17px] font-bold text-gray-900 shadow-[0_8px_20px_rgba(255,214,0,0.25)] flex items-center justify-center h-[58px]`}
                    >
                        {loading ? 'Yuborilmoqda...' : 'Buyurtma berish'}
                    </button>
                </div>
            </div>

            {/* Location Selection Modal */}
            <Modal
                title={
                    <div className="px-1 py-1">
                        <Text className="text-[18px] font-bold block">Xaritadan tanlash</Text>
                        <Text className="text-[13px] text-gray-400 font-normal">G'allaorol shahri ichida manzilni belgilang</Text>
                    </div>
                }
                open={isLocationModalOpen}
                onCancel={() => setIsLocationModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsLocationModalOpen(false)} className="rounded-xl h-10 px-6">Bekor qilish</Button>,
                    <Button 
                        key="submit" 
                        type="primary" 
                        disabled={!selectedCoords}
                        onClick={() => setIsLocationModalOpen(false)}
                        className="bg-[#FFD600] text-black border-none hover:bg-[#FFC800] rounded-xl h-10 px-8 font-bold"
                    >
                        Tasdiqlash
                    </Button>
                ]}
                width={800}
                centered
                styles={{ body: { padding: 0 } }}
                className="location-modal"
            >
                <div className="h-[500px] w-full relative">
                    <YMaps query={{ apikey: 'fe54f19b-c408-41e7-8b01-925206263595', lang: 'ru_RU' }}>
                        <Map 
                            defaultState={{ center: GALLAOROL_COORDS, zoom: 14 }} 
                            width="100%" 
                            height="100%"
                            onClick={handleMapClick}
                            instanceRef={(ref: any) => {
                                if (ref) {
                                    ref.behaviors.disable('scrollZoom');
                                }
                            }}
                        >
                            <ZoomControl options={{ size: 'small' }} />
                            <GeolocationControl options={{ float: 'left' }} />
                            <FullscreenControl />
                            <SearchControl options={{ float: 'right' }} />
                            {selectedCoords && (
                                <Placemark 
                                    geometry={selectedCoords} 
                                    options={{
                                        preset: 'islands#yellowDotIcon'
                                    }}
                                />
                            )}
                        </Map>
                    </YMaps>
                    {!selectedCoords && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white/90 backdrop-blur shadow-md px-4 py-2 rounded-full border border-yellow-200">
                             <Text className="text-[13px] font-medium text-gray-800">Xaritani bosing va manzilni belgilang</Text>
                        </div>
                    )}
                </div>
            </Modal>

            <style jsx global>{`
                .checkout-select .ant-select-selector {
                    padding: 0 !important;
                    height: auto !important;
                    display: flex !important;
                    align-items: center !important;
                }
                .checkout-select .ant-select-selection-item {
                    font-size: 16px !important;
                    font-weight: 700 !important;
                    color: #111827 !important;
                    transition: color 0.2s;
                }
                .checkout-select:hover .ant-select-selection-item {
                    color: #FFD600 !important;
                }
                .location-modal .ant-modal-content {
                    overflow: hidden;
                    border-radius: 24px;
                }
                .location-modal .ant-modal-header {
                    padding: 20px 24px 15px;
                    border-bottom: 1px solid #f0f0f0;
                    margin: 0;
                }
                .location-modal .ant-modal-footer {
                    padding: 15px 24px 20px;
                    border-top: 1px solid #f0f0f0;
                    margin: 0;
                }
            `}</style>
        </>
    )
}

export default StoreItemCart