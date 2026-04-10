import { Typography, Input, Modal, Select, Button, message } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { useState, useContext, useMemo } from 'react'

import { useTranslations } from 'next-intl'
import { getRestaurantsList } from '../Main/api'
import { getRestaurantDetail, getStoreItemCategories, createOrder } from './api'
import { getAccountMe } from '@/features/Account/api'

import { ICategory } from '../Main/types'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { useRouter } from 'next/router'
import { useCartStore } from '@/store/cartStore'
import CartDetail from './components/CartDetails'
import StoreItemCart from './components/StoreItemCart'
import {
  EnvironmentOutlined,
  CreditCardOutlined,
  ClockCircleOutlined,
  RightOutlined,
  CheckCircleFilled
} from '@ant-design/icons'
import { YMaps, Map, Placemark, ZoomControl, FullscreenControl, SearchControl, GeolocationControl } from '@pbe/react-yandex-maps'

const { Text } = Typography
const { TextArea } = Input

// G'allaorol center coordinates
const GALLAOROL_COORDS = [39.998492, 67.585542]
const MAX_DISTANCE_KM = 5

const CartFullPage = () => {
  const t = useTranslations()
  const router = useRouter()
  const { slug: querySlug, id } = router.query
  const { carts, clearCart } = useCartStore()

  const authContext = useContext(AuthContext) as any
  const isAuthenticated = authContext?.authStore?.isAuthenticated
  const openLogin = authContext?.openLogin

  // Checkout States
  const [comment, setComment] = useState('')
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [selectedCoords, setSelectedCoords] = useState<number[] | null>(null)
  const [addressText, setAddressText] = useState('Manzil tanlanmagan')
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [deliveryTime, setDeliveryTime] = useState<string>('Hozir')
  const [orderLoading, setOrderLoading] = useState(false)

  const { data: restaurantData, isLoading: restaurantLoading } = useQuery({
    queryKey: ['restaurant-detail', querySlug],
    queryFn: () => getRestaurantDetail({ uuid: id as string }),
    enabled: !!querySlug,
  })

  const { data: userData } = useQuery({
    queryKey: ['account-me'],
    queryFn: getAccountMe,
    enabled: isAuthenticated
  })

  // Distance calculation helper
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const handleMapClick = (e: any) => {
    const coords = e.get('coords')
    const dist = calculateDistance(coords[0], coords[1], GALLAOROL_COOROL_COORDS[0], GALLAOROL_COORDS[1])

    if (dist > MAX_DISTANCE_KM) {
      message.error("Kechirasiz, yetkazib berish faqat G'allaorol shahri ichida amalga oshiriladi.")
      return
    }

    setSelectedCoords(coords)
    setAddressText(`G'allaorol (${coords[0].toFixed(4)}, ${coords[1].toFixed(4)})`)
  }

  const GALLAOROL_COOROL_COORDS = [39.998492, 67.585542] // Duplicate to fix local reference

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return querySlug
      ? (carts[querySlug as string]?.items?.reduce((s: number, i: any) => s + i.price * i.quantity, 0) || 0)
      : Object.values(carts).flatMap(c => c.items || []).reduce((s: number, i: any) => s + i.price * i.quantity, 0)
  }, [carts, querySlug])

  const handleCreateOrder = async () => {
    if (!isAuthenticated) {
      openLogin?.()
      return
    }
    if (!selectedCoords) {
      message.warning("Iltimos, yetkazib berish manzilini tanlang.")
      setIsLocationModalOpen(true)
      return
    }

    const activeStoreId = querySlug as string || Object.keys(carts).find(id => (carts[id].items?.length || 0) > 0)
    if (!activeStoreId) return

    setOrderLoading(true)
    try {
      const cartItems = carts[activeStoreId]?.items || []
      const userPhone = userData?.phone_number || ''

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
        const orderUuid = (response as any).uuid
        if (orderUuid) {
          router.push(`/orders/${orderUuid}`)
        } else {
          router.push('/orders')
        }
      }
    } catch (error: any) {
      message.error(error?.response?.data?.message || "Buyurtma berishda xatolik yuz berdi.")
    } finally {
      setOrderLoading(false)
    }
  }

  const fmt = (n: number) => n.toLocaleString('uz-UZ').replace(/,/g, ' ')

  return (
    <div className="container mx-auto px-4 pb-48 mt-6 relative">
      <div className="mb-8 flex items-baseline justify-between px-1">
        <Typography.Title level={2} className="!m-0 text-[32px] font-black text-[#111] tracking-tight">
          Savatcha
        </Typography.Title>
        <Typography.Text className="text-[14px] text-gray-400 font-bold uppercase tracking-widest">
          {Object.values(carts).reduce((acc, c) => acc + (c.items?.length || 0), 0)} MAHSULOT
        </Typography.Text>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <main className="flex-1 min-w-0 w-full animate-fade-up space-y-8">
          <CartDetail
            restaurantData={restaurantData}
            restaurantLoading={restaurantLoading}
          />

          {/* Mobile Checkout Details (Visible only on mobile before sidebar) */}
          <div className="xl:hidden space-y-4">
            <div className="bg-white rounded-[28px] p-5 shadow-sm border border-gray-50 flex flex-col gap-4">
              <Text className="text-[18px] font-black text-[#111]">Buyurtma tafsilotlari</Text>

              <div className="divide-y divide-gray-50">
                <div
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex items-center gap-4 py-4 active:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <EnvironmentOutlined className="text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Text className="text-[12px] text-gray-400 block mb-0.5">YETKAZIB BERISH MANZILI</Text>
                    <Text className={`text-[15px] font-black block truncate ${selectedCoords ? 'text-[#00D166]' : 'text-gray-900'}`}>
                      {addressText}
                      {selectedCoords && <CheckCircleFilled className="ml-2" />}
                    </Text>
                  </div>
                  <RightOutlined className="text-gray-300 text-[12px]" />
                </div>

                <div className="flex items-center gap-4 py-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                    <CreditCardOutlined className="text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Text className="text-[12px] text-gray-400 block mb-0.5">TO'LOV USULI</Text>
                    <Select
                      value={paymentMethod}
                      onChange={setPaymentMethod}
                      className="w-full !font-black !text-[15px] checkout-select-mobile"
                      variant="borderless"
                      options={[{ value: 'cash', label: 'Naqd pul orqali' }]}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <Text className="text-[12px] text-gray-400 font-bold block mb-2 px-1">BUYURTMAGA IZOH</Text>
                <TextArea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Masalan: Uy raqami, podyezd..."
                  autoSize={{ minRows: 2, maxRows: 4 }}
                  className="!bg-gray-50 !border-none !rounded-2xl !p-3 !text-[14px] hover:!bg-gray-100 focus:!bg-gray-100 placeholder:!text-gray-300"
                />
              </div>
            </div>
          </div>
        </main>

        <aside className="hidden xl:block xl:w-[380px] xl:shrink-0 xl:sticky xl:top-24">
          <StoreItemCart
            restaurantData={restaurantData}
            restaurantLoading={restaurantLoading}
            // Passing props for potential sync, though sidebar might need own copy or shared state
            customLogic={{
              comment, setComment,
              selectedCoords, setSelectedCoords,
              addressText, setAddressText,
              paymentMethod, setPaymentMethod,
              deliveryTime, setDeliveryTime,
              handleCreateOrder, orderLoading
            }}
          />
        </aside>
      </div>

      {/* Extreme Premium Mobile Bottom Bar */}
      {subtotal > 0 && (
        <div className="xl:hidden fixed bottom-16 left-0 right-0 z-50 bg-white/70 backdrop-blur-2xl border-t border-gray-100 px-6 py-6 pb-safe-area shadow-[0_-15px_40px_rgba(0,0,0,0.08)] rounded-t-[32px]">
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[14px] text-gray-400 font-medium">Mahsulotlar summasi</span>
                <span className="text-[15px] text-[#111] font-bold">{fmt(subtotal)} <span className="text-[10px]">UZS</span></span>
              </div>
              <div className="h-px bg-gray-50 my-3" />
              <div className="flex items-center justify-between">
                <span className="text-[17px] text-[#111] font-black">Jami:</span>
                <span className="text-[24px] text-[#111] font-black tracking-tighter">{fmt(subtotal)} <span className="text-[13px]">UZS</span></span>
              </div>
            </div>

            <button
              onClick={handleCreateOrder}
              disabled={orderLoading}
              className="w-full bg-[#FFD600] active:scale-[0.96] transition-all rounded-[24px] py-4.5 flex items-center justify-center gap-4 shadow-[0_12px_30px_rgba(255,214,0,0.35)] border-b-4 border-[#E6C000]"
            >
              <span className="text-[18px] font-black text-black">
                {orderLoading ? 'YUBORILMOQDA...' : 'BUYURTMA BERISH'}
              </span>
              {!orderLoading && (
                <div className="bg-black/5 rounded-full p-1.5">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Location Modal */}
      <Modal
        title={<Text className="text-[18px] font-black">Xaritadan tanlash</Text>}
        open={isLocationModalOpen}
        onCancel={() => setIsLocationModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsLocationModalOpen(false)} className="rounded-xl h-10 px-6">Bekor qilish</Button>,
          <Button
            key="submit"
            type="primary"
            disabled={!selectedCoords}
            onClick={() => setIsLocationModalOpen(false)}
            className="bg-[#FFD600] text-black border-none hover:bg-[#FFC800] rounded-xl h-10 px-8 font-black"
          >
            Tasdiqlash
          </Button>
        ]}
        width={800}
        centered
        styles={{ body: { padding: 0 } }}
        className="location-modal"
      >
        <div className="h-[450px] w-full relative">
          <YMaps query={{ apikey: 'fe54f19b-c408-41e7-8b01-925206263595', lang: 'ru_RU' }}>
            <Map
              defaultState={{ center: GALLAOROL_COORDS, zoom: 14 }}
              width="100%"
              height="100%"
              onClick={handleMapClick}
            >
              <ZoomControl options={{ size: 'small' }} />
              <GeolocationControl options={{ float: 'left' }} />
              <FullscreenControl />
              <SearchControl options={{ float: 'right' }} />
              {selectedCoords && <Placemark geometry={selectedCoords} options={{ preset: 'islands#yellowDotIcon' }} />}
            </Map>
          </YMaps>
        </div>
      </Modal>

      <style jsx global>{`
          .checkout-select-mobile .ant-select-selection-item {
              font-size: 15px !important;
              font-weight: 900 !important;
              color: #111 !important;
              padding-left: 0 !important;
          }
           .location-modal .ant-modal-content {
                overflow: hidden;
                border-radius: 28px;
            }
      `}</style>
    </div>
  )
}

export default CartFullPage




