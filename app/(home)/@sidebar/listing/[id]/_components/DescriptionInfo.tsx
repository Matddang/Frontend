"use client";

import Image from "next/image";
import ChevronDownIcon from "@/assets/images/chevron-down.svg";
import { detailDescriptions } from "@/constants/labels";
import React, { useState } from "react";
import { formatKoreanUnit } from "@/utils/format";

interface DescriptionInfoProps {
  descriptions: Record<string, string | number>;
}

export default function DescriptionInfo({
  descriptions,
}: DescriptionInfoProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <section aria-label="매물 상세 정보">
      <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-[10px] bg-gray-100 p-4">
        {detailDescriptions.map(({ key, label }) => {
          const value = descriptions[key];
          const displayValue =
            typeof value === "number"
              ? formatKoreanUnit(value)
              : value ?? "정보 없음";

          return (
            <React.Fragment key={key}>
              <dt className="text-right typo-sub-title-m text-gray-1000">
                {label}
              </dt>
              <dd
                className={`typo-14-b ${
                  !isExpanded ? "truncate" : "whitespace-normal"
                }`}
              >
                {displayValue}
              </dd>
            </React.Fragment>
          );
        })}
      </dl>

      <button
        onClick={toggleExpand}
        className="w-full flex justify-center items-center gap-1 bg-gray-300"
      >
        <span className="text-gray-700 py-[6px]">
          {isExpanded ? "접기" : "펼치기"}
        </span>
        <Image
          src={ChevronDownIcon}
          alt={isExpanded ? "접기" : "펼치기"}
          className={`${
            isExpanded ? "rotate-180" : ""
          } transition-transform duration-200`}
        />
      </button>
    </section>
  );
}
