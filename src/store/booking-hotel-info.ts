import type { IBookingHotelInfoState, IBookingRoom, Placement } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IState extends IBookingHotelInfoState {
  removeRooms: () => void
  /* eslint-disable-next-line no-unused-vars */
  updateRooms: (values: IBookingRoom[] | null) => void
  removePlacement: () => void
  /* eslint-disable-next-line no-unused-vars */
  updatePlacement: (values: Placement | null) => void
  /* eslint-disable-next-line no-unused-vars */
  updateDate: (values: IBookingHotelInfoState['date']) => void
  removeDate: () => void
  /* eslint-disable-next-line no-unused-vars */
  updateStepOne: (values: any) => void
  removeStepOne: () => void
  updatePlacementRooms: (_placementRooms: IBookingHotelInfoState['placementRooms'] | null) => void
  updateRoomCount: (_roomCount: number) => void
}

const useBookingRoomsStore = create<IState>()(
  persist(
    (set) => ({
      date: null,
      placement: null,
      rooms: null,
      stepOne: false,
      placementRooms: null,
      roomCount: 1,
      removeDate: () => set({ date: null }),
      updatePlacementRooms: (placementRooms) => set({ placementRooms }),
      updateDate: (date) => set({ date }),
      removePlacement: () => set({ rooms: null }),
      updatePlacement: (placement) => set({ placement }),
      removeRooms: () => set({ rooms: null }),
      updateRooms: (rooms) => set({ rooms }),
      updateStepOne: (date) => set({ date }),
      removeStepOne: () => set({ date: null }),
      updateRoomCount: (roomCount) => set({ roomCount }),
    }),
    {
      name: 'booking-hotel-info',
    }
  )
)

export default useBookingRoomsStore
