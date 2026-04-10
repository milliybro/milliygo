import { Button, Flex, Input, Layout, Typography } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { memo, useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import {
  PhoneOutlined,
  MailOutlined,
  SendOutlined,
  FacebookOutlined,
  InstagramOutlined,
  GlobalOutlined,
  SearchOutlined,
  EnvironmentOutlined,
  DownOutlined,
  ContainerOutlined,
  ShoppingOutlined,
  LoginOutlined,
  FireOutlined,
} from '@ant-design/icons'
import ChatDrawer from './components/ChatDrawer'
import NotificationPopover from './components/NotificationPopover'
import ProfileMenuPopover from './components/ProfileMenuPopover'
import HeaderMenuDrawer from './components/ResponsiveDrawer'
import dayjs from 'dayjs'
import 'dayjs/locale/ar'
import 'dayjs/locale/az'
import 'dayjs/locale/de'
import 'dayjs/locale/es'
import 'dayjs/locale/fr'
import 'dayjs/locale/hi'
import 'dayjs/locale/it'
import 'dayjs/locale/ja'
import 'dayjs/locale/kk'
import 'dayjs/locale/ko'
import 'dayjs/locale/pt'
import 'dayjs/locale/ru'
import 'dayjs/locale/tg'
import 'dayjs/locale/tk'
import 'dayjs/locale/tr'
import 'dayjs/locale/ur'
import 'dayjs/locale/uz-latn'
import 'dayjs/locale/zh-cn'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import logo from '/public/logo.png'
import telegram from '/public/telegram.png'
import facebook from '/public/facebook.png'
import instagram from '/public/instagram.png'
dayjs.extend(relativeTime)
dayjs.extend(customParseFormat)

interface authStore {
  isAuthenticated: boolean
}

const CHeader = () => {

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [searchFocused, setSearchFocused] = useState<boolean>(false)
  const router = useRouter()
  const { locale } = router
  const authContext = useContext(AuthContext)
  const openLogin = authContext?.openLogin
  const { authStore } = authContext as { authStore: authStore }
  const { isAuthenticated } = authStore
  const [dayjsLocale, setDayjsLocale] = useState<string>('uz-latn')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setIsSignedIn(isAuthenticated) }, [isAuthenticated])

  useEffect(() => {
    const map: Record<string, string> = { uz: 'uz-latn', 'zh-CN': 'zh-cn', kz: 'kk' }
    setDayjsLocale(map[locale ?? ''] ?? locale ?? 'uz-latn')
  }, [locale])

  useEffect(() => { dayjs.locale(dayjsLocale) }, [dayjsLocale])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Layout.Header
      style={{ padding: 0, height: 'auto', background: 'transparent' }}
      className="sticky top-0 z-50 w-full"
    >

      {/* ── Top Info Bar ── */}
      <div className="hidden lg:block w-full bg-[#fafaf9] border-b border-[#efefed]">
        <div className="container">
          <div className="flex items-center justify-between h-[38px] text-[11.5px] text-[#999]">

            {/* Left */}
            <div className="flex items-center gap-5 ">
              <div className="flex items-center gap-1.5 h-[38px]  text-[#E65100] text-[14px] font-semibold px-2.5 py-[0px]  select-none">
                <FireOutlined style={{ fontSize: 14 }} />
                30 daqiqada yetkazib beramiz
              </div>
              <div className="w-px h-3 bg-[#e5e5e3]" />
              <a href="tel:+998904969007" className="flex items-center text-[14px] text-[#333] gap-1.5 hover:text-[#333] transition-colors duration-150">
                <PhoneOutlined style={{ fontSize: 14 }} />
                +998 90 496 90 07
              </a>
              <a href="mailto:info@milliyapp.uz" className="flex items-center text-[14px] text-[#333] gap-1.5 hover:text-[#333] transition-colors duration-150">
                <MailOutlined style={{ fontSize: 14 }} />
                info@milliyapp.uz
              </a>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3.5">
                <a href="#" aria-label="Telegram" className="text-[#229ED9] transition-colors duration-150">
                  <Image src={telegram} alt="Telegram" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                </a>
                <a href="#" aria-label="Facebook" className="text-[#1877F2] transition-colors duration-150">
                  <Image src={facebook} alt="Facebook" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                </a>
                <a href="https://www.instagram.com/milliyapp/" aria-label="Instagram" className="text-[#E4405F] transition-colors duration-150">
                  <Image src={instagram} alt="Instagram" width={20} height={20} style={{ width: 'auto', height: 'auto' }} />
                </a>
              </div>
              <div className="w-px h-3 bg-[#e5e5e3]" />
              <button className="flex items-center gap-1.5 hover:text-[#333] transition-colors duration-150 group">
                <GlobalOutlined style={{ fontSize: 14 }} />
                <span className='text-[14px] text-[#333]'>O&#39;zbekcha</span>
                <DownOutlined style={{ fontSize: 8 }} className="opacity-50 group-hover:opacity-80 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main NavBar ── */}
      <div className={`w-full bg-white transition-all duration-300 ${scrolled
        ? 'shadow-[0_1px_24px_rgba(0,0,0,0.07)]'
        : 'border-b border-[#efefed]'
        }`}>
        <div className="container">
          <div className="flex justify-between items-center gap-8 h-[68px]">
            <div className="flex items-center gap-8">

              {/* Logo */}
              <Link href="/" className=" flex items-center gap-2 flex-shrink-0 hover:opacity-70 transition-opacity duration-200 active:scale-95">
                <Image
                  priority
                  width={48}
                  height={16}
                  src={logo}
                  alt="MilliyGo"
                  className="object-contain"
                  style={{ width: 'auto', height: 'auto' }}
                />
                <Typography.Text className='pacifico-regular  text-[20px] font-bold'>MilliyGo</Typography.Text>
              </Link>

              {/* Search */}

              <Input
                prefix={
                  <SearchOutlined className={` text-[14px] mr-3 flex-shrink-0 transition-colors duration-200 ${searchFocused ? 'text-[#111]' : 'text-[#bbb]'
                    }`} />
                }
                type="text"
                placeholder="Restoran yoki taom qidiring..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="border-[#e5e5e3] min-w-[300px] max-w-[400px] py-2 bg-transparent outline-none w-full text-[13.5px] text-[#111] placeholder-[#bbb] font-[450] tracking-[-0.01em]"
              />
            </div>


            {/* Push right */}
            {/* <div className="flex-1 hidden lg:block" /> */}
            <div className="flex items-center gap-2">

              {/* Location */}
              <div className="border-[#e5e5e3] md:flex items-center gap-2.5 px-3 py-3 rounded-[16px] hover:border-[#e8e8e5] hover:bg-[#fafaf8] transition-all duration-200 group">
                <span className="w-[30px] h-[30px] rounded-[10px] bg-[#FFF3E0] flex items-center justify-center flex-shrink-0">
                  <EnvironmentOutlined className="text-[13px] text-[#E65100]" />
                </span>
                <div className="text-left leading-none">
                  <div className="text-[10px] text-[#bbb] font-semibold uppercase tracking-[0.05em] mb-[3px]">Shahar</div>
                  <div className="text-[13px] font-bold text-[#111] tracking-[-0.01em]">Toshkent</div>
                </div>
                <DownOutlined className="text-[8px] text-[#ccc] group-hover:text-[#888] transition-colors duration-200" />
              </div>

              {/* Vertical rule */}
              <div className="hidden lg:block h-7 w-px bg-[#ebebea]" />

              {/* Orders */}
              <Button onClick={() => router.push('/orders')} className="border-none hidden md:flex flex-col items-center gap-[5px] px-3 py-2 rounded-2xl hover:bg-[#f5f4f1] transition-colors duration-200 group min-w-[62px]">
                <span className="w-[30px] h-[30px] rounded-[10px] bg-[#f5f4f1] group-hover:bg-white group-hover:shadow-[0_2px_10px_rgba(0,0,0,0.07)] flex items-center justify-center transition-all duration-200">
                  <ContainerOutlined className="text-[15px] text-[#666] group-hover:text-[#111] transition-colors duration-200" />
                </span>
                <span className="text-[10.5px] font-semibold text-[#999] group-hover:text-[#333] transition-colors duration-200 whitespace-nowrap leading-none">
                  Buyurtmalar
                </span>
              </Button>

              {/* Cart */}
              <Button onClick={() => router.push('/cart')} className="border-none hidden md:flex flex-col items-center gap-[5px] px-3 py-2 rounded-2xl hover:bg-[#f5f4f1] transition-colors duration-200 group min-w-[52px]">
                <span className="relative w-[30px] h-[30px] rounded-[10px] bg-[#f5f4f1] group-hover:bg-white group-hover:shadow-[0_2px_10px_rgba(0,0,0,0.07)] flex items-center justify-center transition-all duration-200">
                  <ShoppingOutlined className="text-[15px] text-[#666] group-hover:text-[#111] transition-colors duration-200" />
                  {/* <span className="absolute -top-[6px] -right-[6px] w-[16px] h-[16px] bg-[#111] text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none border-2 border-white">
                    3
                  </span> */}
                </span>
                <span className="text-[10.5px] font-semibold text-[#999] group-hover:text-[#333] transition-colors duration-200 leading-none">
                  Savat
                </span>
              </Button>

              {/* Vertical rule */}
              <div className="hidden lg:block h-7 w-px bg-[#ebebea]" />

              {/* Auth */}
              <div className="flex items-center gap-2">
                {isSignedIn ? (
                  <Flex align="center" gap={6}>
                    <div className="hidden sm:flex items-center gap-1">
                      <NotificationPopover light={true} />
                      <ChatDrawer light={true} />
                    </div>
                    <ProfileMenuPopover light={true} />
                  </Flex>
                ) : (
                  <Flex align="center" gap={6}>
                    {/* Login — filled */}

                    <Button
                      onClick={() => {

                        openLogin?.()

                      }}

                      className="
                      relative overflow-hidden
                      flex items-center gap-2
                      bg-[#111] hover:bg-[#2a2a2a] active:bg-black active:scale-[0.97]
                      text-white text-[13px] font-semibold tracking-[-0.01em]
                      px-5 py-[0px] rounded-[13px]
                      transition-all duration-200 group
                      ">
                      {/* shimmer sweep */}
                      <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent skew-x-12" />
                      <LoginOutlined className="text-[13px]" />
                      Kirish
                    </Button>

                    {/* Mobile: icon only */}
                    <Link href="/auth/login" className="sm:hidden">
                      <button className="w-9 h-9 bg-[#f5f4f1] hover:bg-[#ebebea] rounded-xl flex items-center justify-center transition-colors duration-200">
                        <LoginOutlined className="text-[16px] text-[#333]" />
                      </button>
                    </Link>
                  </Flex>
                )}

                {/* Mobile hamburger */}
                <div className="lg:hidden ml-1">
                  <HeaderMenuDrawer isSignedIn={isSignedIn} />
                </div>
              </div>

            </div>
          </div>

          {/* Mobile search - Hidden on Home page fixed search */}
          {router.pathname !== '/' && (
            <div className="lg:hidden pb-3">
              <div className={`flex items-center rounded-2xl px-4 py-[10px] transition-all duration-200 ${searchFocused
                ? 'bg-white ring-[1.5px] ring-[#111] shadow-[0_4px_16px_rgba(0,0,0,0.05)]'
                : 'bg-[#f5f4f1]'
                }`}>
                <SearchOutlined className={`text-[14px] mr-3 flex-shrink-0 transition-colors duration-200 ${searchFocused ? 'text-[#111]' : 'text-[#bbb]'
                  }`} />
                <input
                  type="text"
                  placeholder="Restoran yoki taom qidiring..."
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="bg-transparent border-none outline-none w-full text-[13.5px] text-[#111] placeholder-[#bbb] font-[450]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

    </Layout.Header >
  )
}

export default memo(CHeader)