import { create } from "zustand";

interface FiltersState {
  type: "lease" | "sale" | null;
  price: { min: number | null; max: number | null };
  area: { min: number | null; max: number | null };
  kind: "rice" | "field" | null;
  crop: { [parent: string]: string[] };
}

interface FilterStore extends FiltersState {
  setType: (type: "lease" | "sale" | null) => void;
  setPrice: (price: { min: number | null; max: number | null }) => void;
  setArea: (area: { min: number | null; max: number | null }) => void;
  setKind: (kind: "rice" | "field" | null) => void;
  setCrop: (crop: { [parent: string]: string[] }) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  type: null,
  price: { min: null, max: null },
  area: { min: null, max: null },
  kind: null,
  crop: {},

  setType: (type) => set({ type }),
  setPrice: (price) => set({ price }),
  setArea: (area) => set({ area }),
  setKind: (kind) => set({ kind }),
  setCrop: (crop) => set({ crop }),
}));
