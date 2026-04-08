import { create } from 'zustand'
import type { IPreferences } from '@/types'

interface IState {
  preferences: IPreferences[] | null
  /* eslint-disable-next-line no-unused-vars */
  setPreferences: (value: IPreferences[]) => void
}

const usePreferencesStore = create<IState>((set) => ({
  preferences: null,
  setPreferences: (preferences: IPreferences[]) => set({ preferences }),
}))

export default usePreferencesStore
