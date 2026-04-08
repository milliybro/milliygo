import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VerifiedEmailState {
  verifiedEmail: string | null
  isVerified: boolean
  setVerifiedEmail: (_email: string | null) => void
  setIsVerified: (_isVerified: boolean) => void
  verifiedTelegram: number | null
  setVerifiedTelegram: (_telegram_id: number | null) => void
}

export const useVerification = create<VerifiedEmailState>()(
  persist(
    (set) => ({
      isVerified: false,
      setIsVerified: (isVerified) => set({ isVerified }),
      verifiedEmail: '',
      setVerifiedEmail: (email) => set({ verifiedEmail: email }),
      verifiedTelegram: null,
      setVerifiedTelegram: (verifiedTelegram) => set({ verifiedTelegram }),
    }),
    { name: 'verification', version: 2 }
  )
)
