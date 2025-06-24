"use client";

import { useState } from "react";
import LikedProperty from "./LikedProperty";
import CompareHistory from "./CompareHistory";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { compareProperty } from "@/services/compareProperty";

export default function TabComponent() {
  const [tab, setTab] = useState("관심 농지 매물");
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => compareProperty(1, 2),
    onSuccess: (status) => {
      if (status === 200) {
        router.push("/compare-properties/compare");
      }
    },
    onError: () => {
      console.error("매물 비교 실패");
    },
  });

  const handleCompare = () => {
    mutation.mutate();
  };

  return (
    <div className="flex flex-col gap-[40px]">
      <div className="flex flex-col gap-[44px]">
        <div className="flex">
          {["관심 농지 매물", "이전 비교 내역"].map((title, i) => (
            <div
              key={i}
              className={`flex-1 text-center typo-body-1-m text-black h-[32px] border-b-[4px] cursor-pointer ${
                tab === title ? "border-b-primary" : "border-b-gray-300"
              }`}
              onClick={() => setTab(title)}
            >
              {title}
            </div>
          ))}
        </div>
        {tab === "관심 농지 매물" ? <LikedProperty /> : <CompareHistory />}
      </div>
      {tab === "관심 농지 매물" && (
        <button
          className="typo-sub-head-sb text-white bg-primary py-[12px] rounded-[8px] cursor-pointer"
          style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
          onClick={handleCompare}
        >
          매물 비교 시작
        </button>
      )}
    </div>
  );
}
