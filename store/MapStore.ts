import { create } from "zustand";

export interface MapBounds {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

interface MapStore {
  bounds: MapBounds | null;
  setBounds: (bounds: MapBounds | null) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  bounds: null,
  setBounds: (bounds) => set({ bounds }),
}));
