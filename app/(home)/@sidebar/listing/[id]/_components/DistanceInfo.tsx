"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/assets/images/home.svg";
import HomeActiveIcon from "@/assets/images/home-active.svg";
import FarmlandIcon from "@/assets/images/farmland.svg";
import FarmlandActiveIcon from "@/assets/images/farmland-active.svg";
import CarIcon from "@/assets/images/car.svg";
import WalkIcon from "@/assets/images/walk.svg";
import { useState } from "react";

const TEMP_PLACES = [
  { id: 1, type: "residence", label: "거주지1" },
  { id: 2, type: "residence", label: "거주지2" },
  { id: 3, type: "farm", label: "농지1" },
];

export default function DistanceInfo() {
  const [selectedId, setSelectedId] = useState<number>(1);

  const getIcon = (id: number, type: string, isActive: boolean) => {
    if (type === "residence") {
      return isActive ? HomeActiveIcon : HomeIcon;
    }
    if (type === "farm") {
      return isActive ? FarmlandActiveIcon : FarmlandIcon;
    }
    return "";
  };

  return (
    <section className="px-4">
      <div className="flex justify-between items-center">
        <h3 className="typo-sub-head-bold">내 장소 기반 거리</h3>
        <Link
          href={"#"}
          className="text-gray-700 border-b border-gray-700 typo-sub-title-m"
        >
          내 장소 편집
        </Link>
      </div>
      <div className="flex gap-[11px] mt-5 mb-[27px]">
        {TEMP_PLACES.map(({ id, type, label }) => {
          const isActive = selectedId === id;
          return (
            <button
              key={id}
              onClick={() => setSelectedId(id)}
              className={`flex items-center gap-[6px] p-[10px] border rounded-[6px] ${
                isActive ? "border-primary bg-primary-light" : "border-gray-400"
              }`}
            >
              <Image src={getIcon(id, type, isActive)} alt={label} />
              <span className="typo-sub-title-m">{label}</span>
            </button>
          );
        })}
      </div>
      <div className="flex gap-3">
        <div className="w-full flex gap-[6px] justify-center items-center rounded-[10px] bg-gray-300 py-[20px]">
          <Image src={CarIcon} alt="차량" />
          <span>10분</span>
        </div>
        <div className="w-full flex gap-[6px] justify-center items-center rounded-[10px] bg-gray-300 py-[20px]">
          <Image src={WalkIcon} alt="도보" />
          <span>10분</span>
        </div>
      </div>
    </section>
  );
}
