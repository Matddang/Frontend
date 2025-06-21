import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserInfo {
  userId: string;
  email: string;
  name: string;
  enabled: boolean;
}

interface UserStore {
  name: string | null;
  userInfo: UserInfo | null;
  addUser: (user: UserInfo) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      name: null,
      userInfo: null,

      addUser: (user) => {
        set(() => ({ name: user.name, userInfo: user }));
      },
      clearUser: () => {
        set({ name: null, userInfo: null });
        localStorage.removeItem("user");
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
