import { Col, message, Row } from 'antd'
import { setCookie } from 'cookies-next'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'

import banner from '@/assets/uz-unesco.jpg'
import { login } from '@/features/Account/auth/api'
import { AuthContext } from '@/features/Account/auth/context/authContext'
import AgreeWithTerms from '@/features/Account/components/Auth/agree-with-terms'
import FirstStep from '@/features/Account/components/Auth/first-step'

import Logo from '@/components/icons/logo'
import useWindowSize from '@/hooks/useWindowsSize'
import { fingerprint, FingerprintResult } from '@/utils/fingerprint'
import type { RadioChangeEvent } from 'antd/es/radio'
import { AxiosError } from 'axios'
import CheckOtp from '../components/Auth/check-otp'

function Login({ isModal }: { isModal?: boolean }) {
  const authContext = useContext(AuthContext)
  const authStore = authContext?.authStore as {
    isAuthenticated: boolean
    login: (_user: object) => void
    logout: () => void
    userInfo: object
  }
  const t = useTranslations()
  const router = useRouter()
  const width = useWindowSize()
  const { isAuthenticated, login: loginAction } = authStore
  const fingerPrintRef = useRef<any>(null)

  const { mutate: loginActionMutate, isPending } = useMutation({
    mutationFn: (data: { phone_number: string; password?: string }) =>
      login(data, fingerPrintRef.current?.visitorId || ''),
    onSuccess: (res) => {
      localStorage.setItem('refresh_token', res.refresh)
      localStorage.setItem('access_token', res.access)
      loginAction(res.user)
      const { user_permissions: _permissions, ...shortUserInfo } = res.user
      setCookie('userInfo', shortUserInfo)

      message.success(t('user.login-success'), 2)

      if (isModal) {
        authContext?.setLoginModalOpen(false)
      } else {
        router.push('/account/account-management')
      }
    },
    onError: (err: AxiosError) => {
      console.error('Login error:', err)
      message.error('Telefon raqam yoki parol noto\'g\'ri')
    },
  })



  useEffect(() => {
    fingerprint
      .generate()
      .then((result) => {
        fingerPrintRef.current = result
      })
      .catch((err) => {
        console.error('fingerprint error:', err)
      })
  }, [])

  return (
    <div className="overflow-hidden">
      <Row>
        {!isModal && (
          <Col span={8} className="dmd:hidden">
            <div className="relative h-screen bg-primary-dark">
              <Image
                src={banner}
                className="h-full w-full object-cover object-[15%]"
                alt="banner"
                fill
                unoptimized
              />
              <Link href={'/'} aria-label={`open main route`}>
                <Image
                  className="absolute left-[calc(50%-150px)] top-10"
                  width={183.58}
                  height={48}
                  src={'/logo-new.png'}
                  alt=""
                  unoptimized
                />
              </Link>
            </div>
          </Col>
        )}
        <Col
          span={isModal ? 24 : (width <= 840 ? 24 : 16)}
          className={`flex items-center justify-center ${isModal ? 'py-10' : 'dmd:mt-16 dmd:px-5'}`}
        >
          <div className="flex h-full max-w-[486px] flex-col dsm:max-w-[350px]">
            <div className="flex-1" />
            <div className="mb-3 hidden w-full justify-center dmd:flex">
              <Logo className="text-[24px]" />
            </div>
            <FirstStep
              onLogin={(data) => loginActionMutate(data)}
              isLoading={isPending}
              nextPageHandler={() => { }}
            />



            <div className="flex-1 mt-4" />
            <AgreeWithTerms />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Login
