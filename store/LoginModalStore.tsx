import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  modalOpen: () => void;
  modalClose: () => void;
}

export const useLoginModalStore = create<LoginModalStore>((set) => ({
  isOpen: false,
  modalOpen: () => {
    set(() => ({ isOpen: true }));
  },
  modalClose: () => set({ isOpen: false }),
}));
