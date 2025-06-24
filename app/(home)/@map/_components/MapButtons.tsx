import Image from "next/image";
import PlusIcon from "@/assets/images/plus.svg";
import MinusIcon from "@/assets/images/minus.svg";
import CurrentLocationIcon from "@/assets/images/current-location.svg";
import AgroDistributionActiveIcon from "@/assets/images/agro-distribution-active.svg";
import MachineryRentalActiveIcon from "@/assets/images/machinery-rental-active.svg";
import { useState } from "react";

interface MapButtonsProps {
  onMoveToMyLocation: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onSearch: (keyword: string) => void;
}

export default function MapButtons({
  onMoveToMyLocation,
  onZoomIn,
  onZoomOut,
  onSearch,
}: MapButtonsProps) {
  const [activeKeywords, setActiveKeywords] = useState<string[]>([]);

  const handleSearchClick = (keyword: string) => {
    const isActive = activeKeywords.includes(keyword);

    if (isActive) {
      setActiveKeywords((prev) => prev.filter((k) => k !== keyword));
    } else {
      setActiveKeywords((prev) => [...prev, keyword]);
    }

    onSearch(keyword);
  };

  return (
    <div className="absolute top-10 right-10 z-1 flex flex-col gap-[23px]">
      <div className="flex flex-col gap-3">
        <button
          className={`p-[13px] rounded-[50%] flex justify-center items-center bg-primary ${
            activeKeywords.includes("농기계임대사업소")
              ? "ring-4 ring-[#2A7735]"
              : ""
          }`}
          onClick={() => handleSearchClick("농기계임대사업소")}
        >
          <Image src={MachineryRentalActiveIcon} alt="농기계 임대 사업소" />
        </button>
        <button
          className={`p-[13px] rounded-[50%] flex justify-center items-center bg-[#FF822F] ${
            activeKeywords.includes("농수산물유통센터")
              ? "ring-4 ring-[#DD610E]"
              : ""
          }`}
          onClick={() => handleSearchClick("농수산물유통센터")}
        >
          <Image src={AgroDistributionActiveIcon} alt="농수산물 유통 센터" />
        </button>
      </div>
      <button
        onClick={onMoveToMyLocation}
        className="px-[6px] py-2 rounded-[8px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.08)] bg-white flex flex-col gap-1 items-center justify-center"
        aria-label="현위치로 이동"
        title="현위치로 이동"
      >
        <Image src={CurrentLocationIcon} alt="현위치" />
        <span className="typo-sub-title-m text-primary">현위치</span>
      </button>
      <div className="flex flex-col gap-[11.5px] px-3 py-[15px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.08)] bg-white rounded-[8px]">
        <button onClick={onZoomIn} aria-label="지도 확대">
          <Image src={PlusIcon} alt="확대" />
        </button>
        <hr className="w-full h-[1px] text-gray-500" />
        <button onClick={onZoomOut} aria-label="지도 축소">
          <Image src={MinusIcon} alt="축소" />
        </button>
      </div>
    </div>
  );
}
