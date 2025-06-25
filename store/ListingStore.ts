import { create } from "zustand";

export interface ListingItem {
  saleId: number;
  saleCategory: string;
  landType: string;
  saleAddr: string;
  wgsX: number;
  wgsY: number;
  landCategory: string;
  price: number;
  officialPrice: number;
  regDate: string;
  area: number;
  mainCrop: string;
  profit: number;
  imgUrl: string | null;
}

interface ListingStore {
  listings: ListingItem[];
  setListings: (listings: ListingItem[]) => void;
}

export const useListingStore = create<ListingStore>((set) => ({
  listings: [],
  setListings: (listings) => set({ listings }),
}));
