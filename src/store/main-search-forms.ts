import { create } from 'zustand'

import type { IMainSearchFormTabs } from '@/types'

interface MainSearchFormsStore {
  currentTab: IMainSearchFormTabs
  setCurrentTab: (_tab: IMainSearchFormTabs) => void
}

export const useMainSearchFormsStore = create<MainSearchFormsStore>((set) => ({
  currentTab: 'hotel',
  setCurrentTab: (tab) => set({ currentTab: tab }),
}))
