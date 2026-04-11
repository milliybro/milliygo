import dynamic from 'next/dynamic'
import { useHasHydrated } from '@/hooks/useHasHydrated'

const RegisterContractor = dynamic(() => import('@/features/Account/auth/register-contract'), { ssr: false })

export async function getStaticProps() {
  return { props: { messages: {} } }
}

function RegisterContractorPage() {
  const hasHydrated = useHasHydrated()
  if (!hasHydrated) return null
  return <RegisterContractor />
}

export default RegisterContractorPage
