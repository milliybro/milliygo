import { create } from 'zustand'

interface CategoryScrollState {
    activeCategoryId: number | null
    scrollTrigger: number
    setActiveCategoryId: (id: number | null) => void  // faqat IntersectionObserver ishlatadi
    triggerScroll: (id: number | null) => void         // faqat sidebar click ishlatadi
}

export const useCategoryScrollStore = create<CategoryScrollState>((set) => ({
    activeCategoryId: null,
    scrollTrigger: 0,
    setActiveCategoryId: (id) => set({ activeCategoryId: id }),
    triggerScroll: (id) =>
        set((s) => ({ activeCategoryId: id, scrollTrigger: s.scrollTrigger + 1 })),
}))