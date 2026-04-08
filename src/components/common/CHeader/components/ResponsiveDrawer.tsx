import { Button, Drawer } from 'antd'
import { memo, useContext, useEffect, useMemo, useState } from 'react'

import type { FC } from 'react'

import HotelIcon from '@/components/icons/hotel'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import { useTranslations } from 'next-intl'
import { CheckCircleOutlined, HeartOutlined, MenuOutlined } from '@ant-design/icons'
import LanguageModal from './LanguageModal'
import CurrencyModal from './CurrencyModal'
import { mainRoutes } from '@/config/main-routes'
import ChatDrawer from './ChatDrawer'
import CloseIcon from '@/components/icons/close'
import { useRouter } from 'next/router'

interface AuthStore {
  logout: () => void
  userInfo: {
    id: number
    last_login: string
    is_guide: boolean
    is_superuser: boolean
    username: string
    first_name: string
    middle_name: string
    last_name: string
    email: string
    avatar: string
    phone: string
    passport_sn: string
    passport_given_by: string
    passport_expire_date: string
    position: string
    address: string
    is_staff: boolean
    is_active: boolean
    date_joined: string
    region: string
    district: string
    type: string
    deleted: string
    deleted_by_cascade: boolean
    birth_date: string
    gender: string
    unsubscribe_reason: string
    created_at: string
    updated_at: string
    organization: string
    country: string
    passport_first_name: string
    passport_last_name: string
    groups: { id: number; name: string }[]
  }
}

const HeaderMenuDrawer: FC<{ light?: boolean; setCheckBookingModal?: any; isSignedIn?: any }> = ({
  setCheckBookingModal,
  isSignedIn,
}) => {
  const { pathname, push } = useRouter()
  const [_name, setName] = useState('My account')
  const authContext = useContext(AuthContext)
  const { authStore } = authContext as { authStore: AuthStore }
  const { userInfo } = authStore
  const [open, setOpen] = useState(false)

  const t = useTranslations('')

  const partnerURL = useMemo(() => {
    if (typeof window === 'undefined') return ''

    const hostname = window.location.hostname

    return hostname.includes('sayohat.uz')
      ? 'https://cabinet.sayohat.uz/'
      : 'https://cabinet.emehmon.xdevs.uz/'
  }, [])

  useEffect(() => {
    setName(
      userInfo?.first_name || userInfo?.last_name
        ? userInfo?.first_name + ' ' + userInfo?.last_name
        : userInfo?.username
    )
  }, [userInfo])

  if (!authContext) {
    return null
  }
  const isMain = mainRoutes.includes(pathname)

  if (!authContext) {
    return null
  }

  return (
    <>
      <div className="hidden dmd:inline">
        <MenuOutlined className="text-[24px]" onClick={() => setOpen(true)} />
      </div>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        placement="bottom"
        height="97vh"
        closeIcon={false}
        styles={{ body: { padding: 0 } }}
      >
        <div className="relative mt-4 p-4">
          <h1 className="translate pb-3 text-xl font-bold">Menu</h1>
          <button className="absolute right-6 top-3" onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
          <div className="">
            <LanguageModal light={!isMain} />
            <CurrencyModal light={!isMain} />
            <Button
              size="large"
              type="primary"
              className="flex h-[46px] items-center justify-center gap-2 rounded-xl border-[1px] bg-[#4DD282] px-4 py-[9px] text-[14px] font-medium leading-6 duration-200 hover:bg-opacity-60 dmd:bg-transparent dmd:px-0 dmd:text-[#0c0c0c]"
              onClick={() => {
                if (partnerURL) {
                  window.location.href = partnerURL
                }
              }}
            >
              <HotelIcon className="me-1 text-[24px]" />
              {t('others.partner')}
            </Button>
            <Button
              size="large"
              type="primary"
              className="mb-3 flex h-[46px] items-center justify-center gap-2 rounded-xl border-[1px] bg-[#4DD282] px-4 py-[9px] text-[14px] font-medium leading-6 duration-200 hover:bg-opacity-60 dmd:bg-transparent dmd:px-0 dmd:text-[#0c0c0c]"
              onClick={() => {
                push('/tour-for-disabled')
                setOpen(false)
              }}
            >
              <HeartOutlined className="me-1 text-[24px]" />
              {t('others.disability')}
            </Button>
            {isSignedIn ? (
              <ChatDrawer light={!isMain} />
            ) : (
              <Button
                size="large"
                type="primary"
                className={`flex items-center border-[1px] dmd:mt-2 ${
                  isMain
                    ? 'border-transparent bg-[#232E40] text-[#ffffff] dmd:bg-transparent'
                    : 'border-[#232E40] bg-white text-[#232E40]'
                } h-[46px] justify-center gap-2 rounded-xl border px-4 py-[9px] text-[14px] font-medium leading-6 duration-200 hover:bg-opacity-60 dmd:p-0`}
                aria-label={t('buttons.check-reservation')}
                onClick={() => {
                  setCheckBookingModal(true)
                }}
              >
                <CheckCircleOutlined className="text-2xl dmd:text-[#0c0c0c]" />
                <div className="dmd:text-[#0c0c0c]">{t('buttons.check-reservation')}</div>
              </Button>
            )}
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default memo(HeaderMenuDrawer)
