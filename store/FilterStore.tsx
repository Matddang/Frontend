import { AREA_FILTER, PRICE_FILTER } from "@/constants/filterOptions";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface FiltersState {
  type: string | null;
  price: { min: number; max: number };
  area: { min: number; max: number };
  kind: string[];
  crop: { [parent: string]: string[] };
  place: { id: number | null; name: string | null };
}

interface FilterStore extends FiltersState {
  setType: (type: string | null) => void;
  setPrice: (price: { min: number; max: number }) => void;
  setArea: (area: { min: number; max: number }) => void;
  setKind: (kind: string[]) => void;
  setCrop: (crop: { [parent: string]: string[] }) => void;
  setPlace: (place: { id: number | null; name: string | null }) => void;
}

export const useFilterStore = create(
  persist<FilterStore>(
    (set) => ({
      type: null,
      price: {
        min: PRICE_FILTER[0].value,
        max: PRICE_FILTER[PRICE_FILTER.length - 1].value,
      },
      area: {
        min: AREA_FILTER[0].value,
        max: AREA_FILTER[AREA_FILTER.length - 1].value,
      },
      kind: [],
      crop: {},
      place: { id: null, name: null },

      setType: (type) => set({ type }),
      setPrice: (price) => set({ price }),
      setArea: (area) => set({ area }),
      setKind: (kind) => set({ kind }),
      setCrop: (crop) => set({ crop }),
      setPlace: (place) => set({ place }),
    }),
    {
      name: "filter-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
