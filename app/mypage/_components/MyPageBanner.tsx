"use client";

import ArrowIcon from "@/assets/images/arrow-right-white.svg";
import { getUserInfo } from "@/services/getUserInfo";
import { useUserStore } from "@/store/UserStore";
import { useTokenStore } from "@/store/useTokenStore";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import TypeTestBanner from "@/assets/images/type-quiz.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginModal from "@/components/login/LoginModal";

export default function MyPageBanner() {
  const { name, isLogin } = useUserStore();
  const { token } = useTokenStore();
  const router = useRouter();
  const [loginModal, setLoginModal] = useState(false);

  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(),
    staleTime: 5 * 60 * 1000,
    enabled: !!token,
  });

  const handleClick = () => {
    if (isLogin) router.push("/typetest");
    else setLoginModal(true);
  };

  if (!data?.data?.typeTestComplete)
    return (
      <>
        <Image
          src={TypeTestBanner}
          alt="banner"
          onClick={handleClick}
          className="cursor-pointer"
        />
        {loginModal && <LoginModal onClose={() => setLoginModal(false)} />}
      </>
    );
  else
    return (
      <div className="bg-primary-light flex justify-between items-center py-[14px] px-[6px]">
        <span className="typo-body-1-m text-gray-1200">
          {name}님은 ‘수익형’ 농부입니다☺️
        </span>
        <button
          className="flex gap-[6px] items-center rounded-[8px] p-[10px]"
          style={{
            background:
              "linear-gradient(247deg, #D6FF95 -11.27%, #39B94C 44.64%)",
          }}
          onClick={() => router.push("/typetest/result")}
        >
          <span className="text-white typo-body-1-b">수익형</span>
          <Image src={ArrowIcon} alt="right" />
        </button>
      </div>
    );
}
