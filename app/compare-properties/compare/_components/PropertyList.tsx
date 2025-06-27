"use client";

import { useEffect, useState } from "react";
import PropertyItem from "../../_components/PropertyItem";
import CompareResult from "./CompareResult";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLikedProperty } from "@/services/getLikedProperty";
import { useTokenStore } from "@/store/useTokenStore";
import { Property } from "@/types/property";
import { compareProperty } from "@/services/compareProperty";

export default function PropertyList() {
  const [selected, setSelected] = useState<Property[]>([]);
  const [isCompared, setIsCompared] = useState(false);
  const [sales, setSales] = useState<Property[]>([]);
  const { token } = useTokenStore();

  const { data } = useQuery({
    queryKey: ["likedProperty"],
    queryFn: () => getLikedProperty(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const mutation = useMutation({
    mutationFn: () => compareProperty(selected[0].saleId, selected[1].saleId),
    onSuccess: (status) => {
      if (status === 200) {
        setIsCompared(true);
      }
    },
    onError: () => {
      console.error("매물 비교 실패");
    },
  });

  const handleClick = (value: Property) => {
    if (selected.some((v) => v.saleId === value.saleId)) {
      setSelected(() => [...selected].filter((v) => v.saleId !== value.saleId));
    } else {
      if (selected.length === 2) return;
      setSelected((prev) => [...prev, value]);
    }
  };

  const handleCompare = () => {
    mutation.mutate();
  };

  useEffect(() => {
    if (data?.data) {
      setSales(data.data);
    }
  }, [data]);

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
            {sales.map((sale) => (
              <PropertyItem
                key={sale.saleId}
                property={sale}
                compare
                selected={selected.some((v) => v.saleId === sale.saleId)}
                handleClick={handleClick}
              />
            ))}
          </div>
          <button
            className="typo-sub-head-sb text-white bg-primary py-[12px] rounded-[8px] cursor-pointer disabled:bg-gray-500 disabled:cursor-auto"
            style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
            disabled={selected.length < 2}
            onClick={handleCompare}
          >
            비교하기
          </button>
        </div>
      )}
    </div>
  );
}
