import { create } from 'zustand'

interface BookingState {
  bookingData: any | null
  setBookingData: (_data: any) => void
  clearBookingData: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  bookingData: null,
  setBookingData: (data) => set({ bookingData: data }),
  clearBookingData: () => set({ bookingData: null }),
}))
