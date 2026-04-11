import dynamic from 'next/dynamic'
import { useHasHydrated } from '@/hooks/useHasHydrated'

const SignUp = dynamic(() => import('@/features/Account/auth/sign-up'), { ssr: false })

export async function getStaticProps(context: any) {
  let messages = {};
  try {
    if (context && context.locale) {
      messages = (await import(`../../../locales/${context.locale}.json`)).default;
    } else {
      messages = (await import(`../../../locales/uz.json`)).default;
    }
  } catch (err) {
    console.warn("Failed to load locales in src/pages/auth/login/index.tsx", err);
  }
  return { props: { messages } }
}

export default function SignUpPage(props: any) {
  const hasHydrated = useHasHydrated()
  if (!hasHydrated) return null
  return <SignUp />
}
