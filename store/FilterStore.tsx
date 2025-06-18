import { AREA_FILTER, PRICE_FILTER } from "@/constants/filterOptions";
import { create } from "zustand";

interface FiltersState {
  type: "lease" | "sale" | null;
  price: { min: number | null; max: number | null };
  area: { min: number | null; max: number | null };
  kind: ("paddy" | "field" | "orchard")[];
  crop: { [parent: string]: string[] };
  placeId: number | null;
}

interface FilterStore extends FiltersState {
  setType: (type: "lease" | "sale" | null) => void;
  setPrice: (price: { min: number | null; max: number | null }) => void;
  setArea: (area: { min: number | null; max: number | null }) => void;
  setKind: (kind: ("paddy" | "field" | "orchard")[]) => void;
  setCrop: (crop: { [parent: string]: string[] }) => void;
  setPlaceId: (placeId: number | null) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
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
  placeId: null,

  setType: (type) => set({ type }),
  setPrice: (price) => set({ price }),
  setArea: (area) => set({ area }),
  setKind: (kind) => set({ kind }),
  setCrop: (crop) => set({ crop }),
  setPlaceId: (placeId) => set({ placeId }),
}));
