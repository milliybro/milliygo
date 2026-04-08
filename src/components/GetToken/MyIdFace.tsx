import { Flex, Spin } from 'antd'
import { useEffect } from 'react'
import queryString from 'query-string'
import { useRouter } from 'next/router'

export default function MyIdFace() {
  const { query, replace, isReady } = useRouter()

  useEffect(() => {
    if (!isReady) return

    const hostname = window.location.hostname

    const authCode = query.auth_code as string
    const hotelSlug = query.hotelSlug as string

    if (!authCode || !hotelSlug) return

    const params = { code: authCode, face: authCode ? 1 : undefined }

    replace(
      `https://${hotelSlug}.${hostname === 'sayohat.uz' ? 'uzsayohat' : 'em.xdevs'}.uz/#/new-booking/?${queryString.stringify(params, { skipNull: true })}`
    )
  }, [isReady, query, replace])

  return (
    <Flex className="h-screen w-full items-center justify-center">
      <Spin size="large" />
    </Flex>
  )
}
