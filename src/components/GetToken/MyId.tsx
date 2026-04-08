import queryString from 'query-string'
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'
import { Flex, Spin, message } from 'antd'
import { useTranslations } from 'next-intl'
import { useContext, useEffect } from 'react'

import { AuthContext } from '@/features/Account/auth/context/authContext'
import requestAuth from '@/utils/authRequest'

export default function MyId() {
  const t = useTranslations()
  const { query, replace } = useRouter()

  const code = query?.code as string
  const authCode = query?.auth_code as string
  const state = query?.state as string
  const isStateHotel = state?.includes('hotel')

  const authContext = useContext(AuthContext)
  const authStore = authContext?.authStore as {
    isAuthenticated: boolean
    login: (_user: object) => void
    userInfo: object
  }
  const { login: loginAction } = authStore

  const onSuccess = (data: any) => {
    localStorage.setItem('refresh_token', data.refresh)
    localStorage.setItem('access_token', data.access)
    loginAction(data.user)
    setCookie('userInfo', data.user)
    replace('/account/account-management')
    message.success(t('user.login-success'), 2)
  }

  const onError = (error: any) => {
    replace('/auth/login')
    message.error(error.message, 2)
  }

  useEffect(() => {
    if (isStateHotel || authCode) {
      const params = { code: code || authCode, face: authCode ? 1 : undefined }
      replace(
        `https://${state?.replace('hotel', '')}.em.xdevs.uz/#/new-booking/?${queryString.stringify(
          params,
          { skipNull: true }
        )}`
      )
      return
    }

    if (state === 'xyzABC123F') {
      getToken(code, state).then(onSuccess).catch(onError)
    }
  }, [code, authCode, state, isStateHotel])

  return (
    <Flex className="h-screen w-full items-center justify-center">
      <Spin size="large" />
    </Flex>
  )
}

const getToken = (code: string, state: string): Promise<any> => {
  const res = requestAuth({
    url: `/account/my-id-login/`,
    method: 'get',
    params: {
      code,
      state,
    },
  })

  return res
}
