"use client";

import { useUserStore } from "@/store/UserStore";
import LoggedInView from "./_components/LoggedInView";
import LoggedOutView from "./_components/LoggedOutView";

export default function Page() {
  const { isLogin } = useUserStore();

  return isLogin ? <LoggedInView /> : <LoggedOutView />;
}
