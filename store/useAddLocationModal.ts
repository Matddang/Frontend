import { create } from "zustand";

interface AddLocationModalStore {
  isOpen: boolean;
  title: string;
  modalOpen: (title: string) => void;
  modalClose: () => void;
}

export const useAddLocationModal = create<AddLocationModalStore>((set) => ({
  isOpen: false,
  title: "",
  modalOpen: (title) => {
    set(() => ({ isOpen: true, title }));
  },
  modalClose: () => set({ isOpen: false, title: "" }),
}));
