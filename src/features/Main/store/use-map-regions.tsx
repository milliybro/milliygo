import { create } from 'zustand'

interface IMapRegions {
  selectedRegion: number | null
  setSelectedRegion: (_region: number | null) => void
  hoveredRegion: number | null
  setHoveredRegion: (_region: number | null) => void
}

export const useMapRegions = create<IMapRegions>((set) => ({
  selectedRegion: null,
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  hoveredRegion: null,
  setHoveredRegion: (region) => set({ hoveredRegion: region }),
}))
