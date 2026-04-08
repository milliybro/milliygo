import { create } from 'zustand'
import type { Placement } from '@/types'

interface IState {
  hotels: Placement[] | null
  removeAllHotels: () => void
  /* eslint-disable-next-line no-unused-vars */
  updateHotels: (values: any) => void
}

const useHotelsStore = create<IState>((set) => ({
  hotels: null,
  removeAllHotels: () => set({ hotels: null }),
  updateHotels: (newHotels) => set({ hotels: newHotels }),
}))

export default useHotelsStore
