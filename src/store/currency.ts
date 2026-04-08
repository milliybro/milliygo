import { create } from 'zustand'
import type { Currency } from '@/types'
import { persist } from 'zustand/middleware'

interface IState {
  currency: Currency | null
  allCurrencies: Currency[]
  setAllCurrencies: (_data: Currency[]) => void
  updateCurrency: (_value: Currency) => void
  convertCurrency: (_amount: number) => number | null
}

const useCurrencyStore = create<IState>()(
  persist(
    (set, get) => ({
      currency: null,
      allCurrencies: [],
      setAllCurrencies: (data: Currency[]) => set({ allCurrencies: data }),
      updateCurrency: (currency: Currency) => set({ currency }),
      convertCurrency: (amount) => {
        const curr = get().currency
        return amount / (curr?.rate || 1)
      },
    }),
    {
      name: 'currency',
      version: 2,
    }
  )
)

export default useCurrencyStore
