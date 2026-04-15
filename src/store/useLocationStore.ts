import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface Location {
  lat: number
  lng: number
  address?: string
  city?: string
}

interface LocationStore {
  location: Location | null
  isInServiceArea: boolean
  setLocation: (location: Location) => void
  setIsInServiceArea: (status: boolean) => void
  clearLocation: () => void
}

export const useLocationStore = create<LocationStore>()(
  persist(
    (set) => ({
      location: null,
      isInServiceArea: false,
      setLocation: (location) => set({ location }),
      setIsInServiceArea: (isInServiceArea) => set({ isInServiceArea }),
      clearLocation: () => set({ location: null, isInServiceArea: false }),
    }),
    {
      name: 'location-storage',
    }
  )
)
