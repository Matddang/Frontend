"use client";

import { useState } from "react";
import PropertyItem from "../../_components/PropertyItem";
import CompareResult from "./CompareResult";
import { useQuery } from "@tanstack/react-query";
import { getLikedProperty } from "@/services/getLikedProperty";
import { useTokenStore } from "@/store/useTokenStore";

type property = {
  id: number;
  price: number;
  type: string;
  area: number;
  address: string;
  distance: string;
};

export default function PropertyList() {
  const [selected, setSelected] = useState<property[]>([]);
  const [isCompared, setIsCompared] = useState(false);
  const { token } = useTokenStore();

  const { data } = useQuery({
    queryKey: ["likedProperty"],
    queryFn: () => getLikedProperty(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const handleClick = (value: property) => {
    if (selected.some((v) => v.id === value.id)) {
      setSelected(() => [...selected].filter((v) => v.id !== value.id));
    } else {
      if (selected.length === 2) return;
      setSelected((prev) => [...prev, value]);
    }
  };

  const property_list = [
    {
      id: 1,
      price: 1.5,
      type: "ORCHARD",
      area: 351,
      address: "전라남도 완도군 청산면 12-1",
      distance: "포도 / 집에서 5분 거리",
    },
    {
      id: 2,
      price: 1.5,
      type: "ORCHARD",
      area: 351,
      address: "전라남도 완도군 청산면 12-1",
      distance: "포도 / 집에서 5분 거리",
    },
    {
      id: 3,
      price: 1.5,
      type: "ORCHARD",
      area: 351,
      address: "전라남도 완도군 청산면 12-1",
      distance: "포도 / 집에서 5분 거리",
    },
  ];

  return (
    <div
      className={`w-[818px] rounded-[20px] bg-white px-[40px] pt-[44px] pb-[200px] mt-[24px] mb-[82px] mx-auto flex flex-col ${
        isCompared ? "gap-[24px]" : "gap-[40px]"
      }`}
    >
      <div
        className={`flex flex-col gap-[8px] ${
          isCompared ? "pb-[24px] border-b-[1px] border-b-gray-400" : ""
        }`}
      >
        <span className="typo-head-3 text-black">
          {isCompared ? "매물 비교 결과" : "비교할 2개의 농지를 선택해 주세요."}
        </span>
        {isCompared && (
          <span className="typo-sub-title-m text-gray-1100">
            구체적인 정보를 비교해 보세요!
          </span>
        )}
      </div>
      {isCompared ? (
        <CompareResult selected={selected} />
      ) : (
        <div className="flex flex-col gap-[44px]">
          <div className="flex flex-col gap-[16px]">
            {property_list.map((property, i) => (
              <PropertyItem
                key={i}
                property={property}
                compare
                selected={selected.some((v) => v.id === property.id)}
                handleClick={handleClick}
              />
            ))}
          </div>
          <button
            className="typo-sub-head-sb text-white bg-primary py-[12px] rounded-[8px] cursor-pointer disabled:bg-gray-500 disabled:cursor-auto"
            style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
            disabled={selected.length < 2}
            onClick={() => setIsCompared(true)}
          >
            비교하기
          </button>
        </div>
      )}
    </div>
  );
}
