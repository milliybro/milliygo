import { useRouter } from 'next/router' // Import from 'next/router'
import { useContext, useEffect } from 'react'

import { AuthContext } from '@/features/Account/auth/context/authContext'

import type { FC, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

interface authStore {
  isAuthenticated: boolean
  userInfo: any
}

const CheckAuthLayout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const authContext = useContext(AuthContext)

  useEffect(() => {
    if (!authContext) {
      return
    }

    const { authStore } = authContext as { authStore: authStore }
    const { isAuthenticated } = authStore

    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [authContext, router])

  if (!authContext) {
    return null
  }

  return <div className="h-full bg-[#f8f8fa]">{children}</div>
}

export default CheckAuthLayout
