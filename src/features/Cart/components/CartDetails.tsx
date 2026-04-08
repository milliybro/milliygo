




import { Button, Typography } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCartStore } from '@/store/cartStore'
import { CloseOutlined, MinusOutlined, PlusOutlined, ShoppingOutlined } from '@ant-design/icons'

interface CartDetailProps {
  restaurantData: any
  restaurantLoading: boolean
}

const CartDetail = ({ restaurantData, restaurantLoading }: CartDetailProps) => {
  const router = useRouter()
  const { slug: querySlug } = router.query
  const { carts, updateQuantity, removeItem } = useCartStore()

  // If a slug is provided, we focus on that one. 
  // Otherwise, we show all stores that have items.
  const activeStoreIds = querySlug 
    ? [querySlug as string] 
    : Object.keys(carts).filter(id => (carts[id].items?.length || 0) > 0)

  if (restaurantLoading && querySlug) {
    return <div className="animate-pulse space-y-4">
      <div className="h-20 bg-gray-100 rounded-2xl" />
      <div className="h-32 bg-gray-100 rounded-2xl" />
    </div>
  }

  if (activeStoreIds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[24px] border border-gray-100">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
           <ShoppingOutlined className="text-gray-300 text-4xl" />
        </div>
        <Typography.Text className="text-gray-400 text-lg font-medium">Savatchangiz bo'sh</Typography.Text>
        <Button 
          type="primary" 
          className="mt-6 bg-[#FFD600] text-black border-none font-bold h-12 px-10 rounded-2xl hover:bg-[#FFC800] transition-colors"
          onClick={() => router.push('/')}
        >
          Haridni boshlash
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {activeStoreIds.map(storeId => {
        const cartData = carts[storeId]
        const currentCartItems = cartData?.items || []
        const cartRestaurant = cartData?.restaurant
        
        if (currentCartItems.length === 0) return null

        return (
          <div key={storeId} className="space-y-4">
            {/* Restaurant Header */}
            <div className="bg-white p-5 rounded-[20px] border border-[#f0f0f0] shadow-sm">
              <Typography.Text className="text-[13px] text-gray-400 font-medium block mb-1 uppercase tracking-wider">
                Buyurtma qilinayotgan restoran
              </Typography.Text>
              <Typography.Title level={4} className="!m-0 !text-[20px] font-bold text-gray-900">
                {/* 
                   If we are viewing a specific restaurant, use its data. 
                   Otherwise, use the stored restaurant data.
                */}
                {querySlug === storeId 
                   ? (restaurantData?.data?.partner?.name || cartRestaurant?.name || 'Restoran') 
                   : (cartRestaurant?.name || `Restoran (ID: ${storeId.slice(0, 8)}...)`)}
              </Typography.Title>
            </div>

            {/* Cart Items */}
            <div className="space-y-3">
              {currentCartItems.map((item: any) => (
                <div 
                  key={item.id} 
                  className="group relative bg-white p-4 pr-5 rounded-[24px] border border-[#f0f0f0] shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-5"
                >
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeItem(storeId, item.id)}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all z-10"
                  >
                    <CloseOutlined style={{ fontSize: 13 }} />
                  </button>

                  {/* Product Image */}
                  <div className="relative w-[110px] h-[110px] rounded-2xl overflow-hidden flex-shrink-0 bg-gray-50 border border-gray-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="110px"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-1">
                    <div>
                      <Typography.Title level={5} className="!m-0 !text-[18px] font-bold text-gray-900 truncate">
                        {item.name}
                      </Typography.Title>
                      <Typography.Text className="text-[14px] text-gray-500 mt-1 block">
                        1 x {item.price.toLocaleString('uz-UZ').replace(/,/g, ' ')} so'm
                      </Typography.Text>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      {/* Total Item Price */}
                      <Typography.Text className="text-[17px] font-bold text-gray-900 order-2">
                        {(item.price * item.quantity).toLocaleString('uz-UZ').replace(/,/g, ' ')} so'm
                      </Typography.Text>

                      {/* Quantity Controls */}
                      <div className="flex items-center bg-[#F8F8F8] rounded-[16px] p-1 order-1">
                        <button
                          onClick={() => updateQuantity(storeId, item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-[14px] border border-[#f0f0f0] text-gray-600 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
                        >
                          <MinusOutlined style={{ fontSize: 12 }} />
                        </button>
                        
                        <span className="w-10 text-center text-[15px] font-bold text-gray-900">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(storeId, item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center bg-white rounded-[14px] border border-[#FFD600] text-gray-900 hover:bg-[#FFF9DB] active:scale-95 transition-all shadow-sm"
                        >
                          <PlusOutlined style={{ fontSize: 12 }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CartDetail
