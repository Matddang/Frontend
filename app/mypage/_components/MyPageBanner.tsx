"use client";

import ArrowIcon from "@/assets/images/arrow-right-white.svg";
import { useUserStore } from "@/store/UserStore";
import Image from "next/image";

export default function MyPageBanner() {
  const { name } = useUserStore();

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
      >
        <span className="text-white typo-body-1-b">수익형</span>
        <Image src={ArrowIcon} alt="right" />
      </button>
    </div>
  );
}
