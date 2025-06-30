"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import AgroDistributionIcon from "@/assets/images/agro-distribution.svg";
import AgroDistributionActiveIcon from "@/assets/images/agro-distribution-active.svg";
import MachineryRentalIcon from "@/assets/images/machinery-rental.svg";
import MachineryRentalActiveIcon from "@/assets/images/machinery-rental-active.svg";
import { fetchNearestPlacesByKeyword } from "@/utils/map/fetchNearestPlacesByKeyword";

const INFRA_LABEL = [
  {
    type: "AgroDistribution",
    label: "농수산물유통센터",
    keyword: "농수산물유통센터",
  },
  {
    type: "MachineryRental",
    label: "농기계임대사업소",
    keyword: "농기계임대사업소",
  },
];

export default function InfraInfo({ lat, lng }: { lat: number; lng: number }) {
  const [infraType, setInfraType] = useState<string>("AgroDistribution");
  const [infraList, setInfraList] = useState<
    { name: string; distance: number }[]
  >([]);

  const getIcon = (type: string, isActive: boolean) => {
    if (type === "AgroDistribution") {
      return isActive ? AgroDistributionActiveIcon : AgroDistributionIcon;
    }
    if (type === "MachineryRental") {
      return isActive ? MachineryRentalActiveIcon : MachineryRentalIcon;
    }
    return null;
  };

  useEffect(() => {
    const fetchInfra = async (type: string) => {
      const selected = INFRA_LABEL.find((item) => item.type === type);
      if (!selected) return;

      const data = await fetchNearestPlacesByKeyword(
        selected.keyword,
        lat,
        lng,
      );

      const processed = data.map((item) => ({
        name: item.place_name,
        distance: item.distance,
      }));

      setInfraList(processed);
    };

    fetchInfra(infraType);
  }, [infraType, lat, lng]);

  return (
    <section>
      <h3 className="px-4 mb-5 typo-sub-head-bold">가장 가까운 농사 인프라</h3>
      <div className="px-4 mb-[10px] flex gap-[11px]">
        {INFRA_LABEL.map(({ type, label }) => {
          const isActive = infraType === type;
          return (
            <button
              key={type}
              onClick={() => setInfraType(type)}
              className={`w-full flex gap-[6px] justify-center items-center rounded-[6px] py-[10px] ${
                isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-800"
              }`}
            >
              <Image src={getIcon(type, isActive)!} alt={label} />
              <span className="typo-sub-title-m">{label}</span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-[10px]">
        {infraList.map(({ name, distance }, index) => (
          <div key={index} className="p-4 border-b border-gray-400">
            <div className="typo-body-1-m">{name}</div>
            <div className="typo-14-b">{distance.toFixed(2)}km</div>
          </div>
        ))}
      </div>
    </section>
  );
}
