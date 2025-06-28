import { create } from "zustand";

export interface MapBounds {
  swLat: number;
  swLng: number;
  neLat: number;
  neLng: number;
}

interface MapStore {
  mode: "map" | "ranking";
  bounds: MapBounds | null;
  setMode: (mode: "map" | "ranking") => void;
  setBounds: (bounds: MapBounds | null) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  mode: "map",
  bounds: null,
  setMode: (mode) => set({ mode }),
  setBounds: (bounds) => set({ bounds }),
}));
