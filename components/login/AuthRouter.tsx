"use client";

import { getTokens } from "@/services/getTokens";
import { useLoginModalStore } from "@/store/LoginModalStore";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthRouter({ code }: { code: string }) {
  const router = useRouter();
  const { addUser } = useUserStore.getState();
  const { modalOpen } = useLoginModalStore.getState();

  useEffect(() => {
    const handleTokens = async () => {
      const res = await getTokens(code);

      if (res.status === 200) {
        addUser(res.data);
        modalOpen();

        router.replace("/");
      }
    };

    handleTokens();
  }, []);

  return <></>;
}
