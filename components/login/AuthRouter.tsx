"use client";

import { googleLogin, kakaoLogin } from "@/services/login";
import { useLoginModalStore } from "@/store/LoginModalStore";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthRouter({
  type,
  code,
  idToken,
}: {
  type: string;
  code: string;
  idToken?: string;
}) {
  const router = useRouter();
  const { addUser } = useUserStore.getState();
  const { modalOpen } = useLoginModalStore.getState();

  useEffect(() => {
    const handleTokens = async () => {
      if (type === "kakao") {
        const res = await kakaoLogin(code);

        if (res.status === 200) {
          addUser(res.data);
          modalOpen();

          router.replace("/");
        }
      } else {
        const res = await googleLogin(code, idToken!);

        if (res.status === 200) {
          addUser(res.data);
          modalOpen();

          router.replace("/");
        }
      }
    };
    handleTokens();
  }, []);

  return <></>;
}
