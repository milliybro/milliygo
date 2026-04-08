import { create } from 'zustand'

interface IState {
  selectedRooms: null | any[]
  show: boolean
  setShow: (_value: boolean) => void
  addSelectedRooms: (_value: any) => void
  removeSelectedRooms: (_value: any) => void
}

const useNewBookingConfirmationStore = create<IState>((set, get) => ({
  selectedRooms: null,
  show: false,
  setShow: (show: boolean) => set({ show }),

  addSelectedRooms: (product: any) => {
    const { selectedRooms } = get()

    const updateCart = selectedRooms ? [product, ...selectedRooms] : [product]
    set({ selectedRooms: updateCart })
  },

  removeSelectedRooms: (product: any) =>
    set((state) => {
      const index = state.selectedRooms?.findIndex((item) => item.id === product.id)
      if (index && index !== -1) {
        const newItems = state.selectedRooms ? [...state.selectedRooms] : []
        newItems.splice(index, 1)
        return { selectedRooms: newItems }
      }
      return state
    }),
}))

export default useNewBookingConfirmationStore
