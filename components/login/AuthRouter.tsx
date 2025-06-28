"use client";

import { getUserInfo } from "@/services/getUserInfo";
import { googleLogin, kakaoLogin } from "@/services/login";
import { useLoginModalStore } from "@/store/useLoginModalStore";
import { useUserStore } from "@/store/UserStore";
import { useTokenStore } from "@/store/useTokenStore";
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
  const { addToken } = useTokenStore.getState();
  const { modalOpen } = useLoginModalStore.getState();

  useEffect(() => {
    const handleTokens = async () => {
      if (type === "kakao") {
        const res = await kakaoLogin(code);

        if (res.data.status === 200) {
          addUser(res.data.data);
          addToken(res.token);

          const userInfo = await getUserInfo(res.token);

          if (userInfo?.data) {
            if (!userInfo.data.typeTestComplete) {
              modalOpen();
            }
            router.replace("/");
          }
        }
      } else {
        const res = await googleLogin(code, idToken!);

        if (res.data.status === 200) {
          addUser(res.data.data);
          addToken(res.token);

          const userInfo = await getUserInfo(res.token);

          if (userInfo?.data) {
            if (!userInfo.data.typeTestComplete) {
              modalOpen();
            }
            router.replace("/");
          }
        }
      }
    };
    handleTokens();
  }, []);

  return <></>;
}
