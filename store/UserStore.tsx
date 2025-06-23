import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserInfo {
  userId: string;
  email: string;
  name: string;
  enabled: boolean;
}

interface UserStore {
  isLogin: boolean;
  name: string | null;
  userInfo: UserInfo | null;
  addUser: (user: UserInfo) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      isLogin: false,
      name: null,
      userInfo: null,

      addUser: (user) => {
        set(() => ({ isLogin: true, name: user.name, userInfo: user }));
      },
      clearUser: () => {
        set({ isLogin: false, name: null, userInfo: null });
        localStorage.removeItem("user");
      },
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
