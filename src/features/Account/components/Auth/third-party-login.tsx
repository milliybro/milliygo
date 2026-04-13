'use client'

import { Button, Flex } from 'antd'
import { useContext, useEffect, type ReactElement } from 'react'

import FacebookIcon from '@/components/icons/facebook'
import GoogleIcon from '@/components/icons/google'
import MyIdIcon from '@/components/icons/my-id'
import OneIdIcon from '@/components/icons/one-id'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import { AuthContext } from '../../auth/context/authContext'
import { LoginButton } from '@telegram-auth/react'

const oneIdUrl = 'https://sso.egov.uz/sso/oauth/Authorization.do?'

const hostname = typeof window !== 'undefined' ? window.location.hostname : ''

const isDev = hostname !== 'sayohat.uz'
const myIdUrlProd = 'https://myid.uz/api/v1/oauth2/authorization?'

const myIdUrlDev = 'https://myid.uz/api/v1/oauth2/authorization?'
const myIdClientIdDev = 'emehmon_redirect-Yf8DeL9zSUIaFk2213Sh7y74c8ci3TadCmyf1h9i'
const myIdClientIdProd = 'emehmon_redirect-Yf8DeL9zSUIaFk2213Sh7y74c8ci3TadCmyf1h9i'

export default function ThirdPartyLogin(): ReactElement {
  const t = useTranslations()
  const locale = useLocale()
  const { push, query } = useRouter()
  const { googleSignIn, facebookSignIn, oneIdLogin, telegramLogin } = useContext(AuthContext) as {
    googleSignIn: () => void
    facebookSignIn: () => void
    // eslint-disable-next-line no-unused-vars
    oneIdLogin: ({ code }: { code: string }) => void
    telegramLogin: (data: any) => Promise<void>
  }

  useEffect(() => {
    if (query.code) {
      oneIdLogin({ code: query.code as string })
    }
  }, [query])

  const handleSignInGoogle = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignInFacebook = async () => {
    try {
      await facebookSignIn()
    } catch (error) {
      console.error(error)
    }
  }

  const handleOneId = () => {
    const origin =
      typeof window !== 'undefined'
        ? window.location.origin === 'http://localhost:8090'
          ? 'https://sayohat.uz'
          : window.location.origin
        : ''

    const redirectUri = `${origin}/auth/login`

    const params = queryString.stringify({
      redirect_uri: redirectUri,
      client_id: 'emehmon_platform',
      scope: 'emehmon_platform',
      response_type: 'one_code',
      state: 'test',
    })

    push(oneIdUrl + params)
  }

  const handleMyId = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''

    const params = queryString.stringify({
      redirect_uri: `${origin}/get-token-my-id/`,

      client_id: isDev ? myIdClientIdDev : myIdClientIdProd,
      response_type: 'code',
      scope: 'address,contacts,doc_data,common_data',
      method: 'simple',
      state: 'xyzABC123F',
    })
    push((isDev ? myIdUrlDev : myIdUrlProd) + params)
  }

  return (
    <>
      <Button
        aria-label={t('auth.continue-with-my-id')}
        size="large"
        type="primary"
        shape="default"
        className="mb-4 flex !h-[56px] w-full items-center justify-between bg-[#710080] shadow-none"
        onClick={handleMyId}
      >
        {t('auth.continue-with-my-id')}
        <MyIdIcon className="text-[72px] dsm:text-[56px]" />
      </Button>
      <Button
        aria-label={t('auth.continue-with-one-id')}
        size="large"
        type="primary"
        shape="default"
        className="mb-4 flex !h-[56px] w-full items-center justify-between bg-[#4825C2] shadow-none"
        onClick={handleOneId}
      >
        {t('auth.continue-with-one-id')}
        <div className="p-2">
          <OneIdIcon className="text-[50px] dsm:text-[38px]" />
        </div>
      </Button>
      <div className="mb-4 w-full">
        <LoginButton
          botUsername={process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || 'milliy_go_bot'}
          onAuthCallback={(data) => telegramLogin(data)}
          buttonSize="large"
          cornerRadius={16}
          showUserPhoto={false}
          lang={locale}
        />
      </div>
      <Flex gap={16} className="mb-[50px] dsm:mb-[30px] dsm:flex-col">
        <Button
          onClick={handleSignInGoogle}
          aria-label={t('auth.continue-with')}
          size="large"
          className="flex !h-[54px] w-full items-center justify-between gap-3 shadow-none"
        >
          {locale === 'uz' ? (
            <div className="flex gap-3 dsm:justify-between">
              <GoogleIcon className="text-2xl" />

              <span className="dsm:text-[16px]">{t('auth.continue-with')}</span>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center gap-3 dsm:justify-between">
              {t('auth.continue-with')}
              <GoogleIcon className="text-2xl" />
            </div>
          )}
        </Button>
        <Button
          aria-label={t('auth.continue-with')}
          onClick={handleSignInFacebook}
          size="large"
          className="flex !h-[54px] w-full items-center justify-between shadow-none"
        >
          {locale === 'uz' ? (
            <div className="flex gap-2">
              <FacebookIcon className="text-2xl" />
              {t('auth.continue-with')}
            </div>
          ) : (
            <div className="flex w-full items-center justify-center gap-2">
              {t('auth.continue-with')}
              <FacebookIcon className="text-2xl" />
            </div>
          )}
        </Button>
      </Flex>
    </>
  )
}
