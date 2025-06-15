"use client";

import { useState } from "react";
import FilterButton from "./filter/FilterButton";
import FilterModal from "./filter/FilterModal";
import { useFilterStore } from "@/store/FilterStore";
import { AREA_FILTER, FILTERS, PRICE_FILTER } from "@/constants/filterOptions";

export default function NavBar() {
  const { type, price, area, kind, crop } = useFilterStore();

  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const handleClick = (key: string) => {
    setOpenFilter((prev) => (prev === key ? null : key));
  };

  // key별로 값이 있는지 확인하는 함수
  const hasFilterValue = (key: string) => {
    switch (key) {
      case "type":
        return type !== null;
      case "price":
        return (
          price.min !== PRICE_FILTER[0].value ||
          price.max !== PRICE_FILTER[PRICE_FILTER.length - 1].value
        );
      case "area":
        return (
          area.min !== AREA_FILTER[0].value ||
          area.max !== AREA_FILTER[AREA_FILTER.length - 1].value
        );
      case "kind":
        return kind.length > 0;
      case "crop":
        return Object.keys(crop).length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="absolute bg-white w-full z-10 max-h-[65px] border-b border-[#F3F3F3] flex justify-between items-center px-[50px] py-4 gap-[12px]">
      <div className="flex gap-[12px] whitespace-nowrap">
        {FILTERS.map((filter) => {
          const isActive = openFilter === filter.key;
          const hasValue = hasFilterValue(filter.key);

          return (
            <div key={filter.key} className="relative">
              <FilterButton
                text={filter.label}
                isActive={isActive}
                hasValue={hasValue}
                onClick={() => handleClick(filter.key)}
              />
              {isActive && (
                <div className="absolute top-full left-0 z-50 mt-5">
                  <FilterModal
                    filter={filter}
                    onApply={(value) => {
                      alert(value);
                      setOpenFilter(null);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button className="opacity-0 flex gap-[10px] flex-shrink-0 items-center px-4 py-2 rounded-full border border-[#DDDFE5] transition-colors duration-200 outline-none text-[18px] text-[#9C9EA5] cursor-pointer">
        <span>초기화</span>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.6667 7.16667C14.6667 7.16667 13.33 5.34548 12.2441 4.25883C11.1582 3.17218 9.6576 2.5 8 2.5C4.68629 2.5 2 5.18629 2 8.5C2 11.8137 4.68629 14.5 8 14.5C10.7354 14.5 13.0433 12.6695 13.7655 10.1667M14.6667 7.16667V3.16667M14.6667 7.16667H10.6667"
            stroke="#9C9EA5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
