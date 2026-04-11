import React from 'react'
import { useRouter } from 'next/router'
import {
  HomeOutlined,
  ShoppingOutlined,
  ContainerOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useCartStore } from '@/store/cartStore'

const BottomNavigation = () => {
  const router = useRouter()
  const { pathname } = router
  const { carts } = useCartStore()

  // Calculate total unique items across all store carts
  const cartItemsCount = Object.values(carts).reduce((acc, cart) => acc + (cart.items?.length || 0), 0)

  const navItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Asosiy',
    },
    {
      key: '/orders',
      icon: <ContainerOutlined />,
      label: 'Buyurtmalar',
    },
    {
      key: '/cart',
      icon: (
        <div className="relative">
          <ShoppingOutlined className="text-[22px]" />
          {cartItemsCount > 0 && (
            <div className="absolute -top-1.5 -right-2 bg-[#FFD600] text-[#111] text-[10px] font-black h-[18px] min-w-[18px] px-1.2 flex items-center justify-center rounded-full border-[2px] border-white shadow-sm scale-90 animate-fade-up">
              {cartItemsCount}
            </div>
          )}
        </div>
      ),
      label: 'Savat',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Profil',
    },
  ]

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] bg-white border-t border-[#efefed] px-2 pb-safe-area shadow-[0_-4px_16px_rgba(0,0,0,0.02)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.key
          return (
            <button
              key={item.key}
              onClick={() => router.push(item.key)}
              className="flex flex-col items-center justify-center flex-1 gap-1 transition-all duration-200"
            >
              <span
                className={`flex items-center justify-center transition-colors duration-200 text-[20px] ${
                  isActive ? 'text-[#111]' : 'text-[#bbb]'
                }`}
              >
                {/* BUILD FIX: Directly rendering icon to avoid cloneElement type errors */}
                {item.icon}
              </span>
              <span
                className={`text-[10px] font-bold transition-colors duration-200 ${
                  isActive ? 'text-[#111]' : 'text-[#bbb]'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNavigation
