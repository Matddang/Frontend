"use client";

import { getLikedProperty } from "@/services/getLikedProperty";
import { getUserInfo } from "@/services/getUserInfo";
import { likeProperty } from "@/services/likeProperty";
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

  const prevLogin = async (token: string) => {
    const userInfo = await getUserInfo(token);
    const likedProperty = await getLikedProperty();

    if (!likedProperty.data.length) {
      await likeProperty(5);
      await likeProperty(6);
      await likeProperty(7);
      await likeProperty(8);
    }

    if (userInfo?.data) {
      if (!userInfo.data.typeTestComplete) {
        modalOpen();
      }
      router.replace("/");
    }
  };

  useEffect(() => {
    const handleTokens = async () => {
      if (type === "kakao") {
        const res = await kakaoLogin(code);

        if (res.data.status === 200) {
          addUser(res.data.data);
          addToken(res.token);

          prevLogin(res.token);
        }
      } else {
        const res = await googleLogin(code, idToken!);

        if (res.data.status === 200) {
          addUser(res.data.data);
          addToken(res.token);

          prevLogin(res.token);
        }
      }
    };
    handleTokens();
  }, []);

  return <></>;
}
