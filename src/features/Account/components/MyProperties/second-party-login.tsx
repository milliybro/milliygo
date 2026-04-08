'use client'

import { Button } from 'antd'
import { useContext, useEffect, type ReactElement } from 'react'

import MyIdIcon from '@/components/icons/my-id'
import OneIdIcon from '@/components/icons/one-id'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import { AuthContext } from '../../auth/context/authContext'

const oneIdUrl = 'https://sso.egov.uz/sso/oauth/Authorization.do?'

const myIdUrl = 'https://myid.uz/api/v1/oauth2/authorization?'

export default function SecondPartyLogin(): ReactElement {
  const t = useTranslations()
  const { push, query } = useRouter()
  const { oneIdLogin } = useContext(AuthContext) as {
    googleSignIn: () => void
    facebookSignIn: () => void
    // eslint-disable-next-line no-unused-vars
    oneIdLogin: ({ code }: { code: string }) => void
  }

  useEffect(() => {
    if (query.code) {
      oneIdLogin({ code: query.code as string })
    }
  }, [query])

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
    const params = queryString.stringify({
      client_id: 'emehmon_redirect-Yf8DeL9zSUIaFk2213Sh7y74c8ci3TadCmyf1h9i',
      response_type: 'code',
      scope: 'address,contacts,doc_data,common_data',
      method: 'simple',
      state: 'xyzABC123F',
    })

    push(myIdUrl + params)
  }

  return (
    <>
      <Button
        aria-label={t('auth.continue-with-one-id')}
        size="large"
        type="primary"
        shape="default"
        className="flex !h-[56px] w-full items-center justify-between bg-[#4825C2] shadow-none"
        onClick={handleOneId}
      >
        {t('auth.continue-with-one-id')}
        <div className="p-2">
          <OneIdIcon className="text-[50px]" />
        </div>
      </Button>
      <Button
        aria-label={t('auth.continue-with-my-id')}
        size="large"
        type="primary"
        shape="default"
        className="flex !h-[56px] w-full items-center justify-between bg-[#710080] shadow-none"
        onClick={handleMyId}
      >
        {t('auth.continue-with-my-id')}
        <MyIdIcon className="text-[72px]" />
      </Button>
    </>
  )
}
