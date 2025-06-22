"use client";

import CheckIcon from "@/assets/images/check-primary.svg";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface ListSelectorProps {
  list: string[];
  subList?: string[];
  selected: string | string[];
  setSelected: Dispatch<SetStateAction<string | string[]>>;
  limit?: boolean;
}

export default function ListSelector({
  list,
  subList,
  selected,
  setSelected,
  limit,
}: ListSelectorProps) {
  const handleClick = (value: string) => {
    if (limit) {
      if (selected.includes(value)) {
        setSelected(() => [...selected].filter((v) => v !== value));
      } else {
        if (selected.length === 2) return;
        setSelected((prev) => [...prev, value]);
      }
    } else {
      if (selected === value) setSelected("");
      else setSelected(value);
    }
  };

  return (
    <div className="flex flex-col gap-[8px]">
      {limit && (
        <span className="typo-body-2-m text-gray-700">
          최대 2개까지 선택할 수 있습니다.
        </span>
      )}
      <div className="flex flex-col gap-[20px]">
        {list.map((item, i) => (
          <div
            key={i}
            className={`
            border-[1px] rounded-[5px] p-[20px] w-full h-[64px] cursor-pointer flex justify-between 
            ${
              selected === list[i] || selected.includes(list[i])
                ? "bg-primary-light border-primary font-bold"
                : "bg-white border-gray-400"
            }
          `}
            onClick={() => handleClick(list[i])}
          >
            {subList ? (
              <div className="flex items-center gap-[14px]">
                <span className="text-[16px] text-black">{item}</span>
                <span className="text-[12px] text-gray-900">{subList[i]}</span>
              </div>
            ) : (
              <span className="text-[16px] text-black">{item}</span>
            )}
            {(selected === list[i] || selected.includes(list[i])) && (
              <Image
                src={CheckIcon}
                alt="check"
                width={24}
                height={24}
                style={{ width: 24, height: 24 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
