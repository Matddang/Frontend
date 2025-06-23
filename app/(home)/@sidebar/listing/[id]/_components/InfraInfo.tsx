"use client";

import Image from "next/image";
import React, { useState } from "react";
import AgroDistributionIcon from "@/assets/images/agro-distribution.svg";
import AgroDistributionActiveIcon from "@/assets/images/agro-distribution-active.svg";
import MachineryRentalIcon from "@/assets/images/machinery-rental.svg";
import MachineryRentalActiveIcon from "@/assets/images/machinery-rental-active.svg";

const INFRA_LABEL = [
  { type: "AgroDistribution", label: "농수산물유통센터" },
  { type: "MachineryRental", label: "농기계임대사업소" },
];

const TEMP_INFA = [
  { type: "AgroDistribution", name: "목포 농수산물 유통센터", distance: 345 },
  { type: "AgroDistribution", name: "목포 농수산물 유통센터", distance: 350 },
  { type: "AgroDistribution", name: "목포 농수산물 유통센터", distance: 355 },
  { type: "MachineryRental", name: "목포 농기계 임대 사업소", distance: 345 },
  { type: "MachineryRental", name: "목포 농기계 임대 사업소", distance: 350 },
  { type: "MachineryRental", name: "목포 농기계 임대 사업소", distance: 355 },
];

export default function InfraInfo() {
  const [infraType, setInfraType] = useState<string>("AgroDistribution");

  const getIcon = (type: string, isActive: boolean) => {
    if (type === "AgroDistribution") {
      return isActive ? AgroDistributionActiveIcon : AgroDistributionIcon;
    }
    if (type === "MachineryRental") {
      return isActive ? MachineryRentalActiveIcon : MachineryRentalIcon;
    }
    return null;
  };

  const currentInfra = TEMP_INFA.filter((item) => item.type === infraType);

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
        {currentInfra.map(({ name, distance }, index) => (
          <div key={index} className="p-4 border-b border-gray-400">
            <div className="typo-body-1-m">{name}</div>
            <div className="typo-14-b">{distance}m</div>
          </div>
        ))}
      </div>
    </section>
  );
}
