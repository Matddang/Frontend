"use client";

import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  options: string[];
  onSelect: (value: string) => void;
  defaultValue?: string;
}

export default function Dropdown({
  options,
  onSelect,
  defaultValue,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="inline-block relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 text-gray-1000"
      >
        {selected}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          className="float-right"
        >
          <path
            d="M5.79241 5.97063C5.3921 6.49064 4.6079 6.49064 4.20759 5.97063L1.04322 1.85999C0.537025 1.20243 1.00579 0.25 1.83563 0.25L8.16437 0.250001C8.99421 0.250001 9.46298 1.20243 8.95678 1.86L5.79241 5.97063Z"
            fill="#9C9EA5"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="min-w-[125px] absolute right-0 z-10 w-full bg-white rounded-[10px] mt-2 shadow-[0_0_20px_0_rgba(0,0,0,0.08)] overflow-hidden">
          {options.map((option, index) => (
            <li
              key={option}
              className={`px-[10px] py-4 hover:bg-gray-300 cursor-pointer text-center typo-sub-title-m ${
                index !== options.length - 1 ? "border-b border-gray-400" : ""
              } ${option === selected ? "bg-gray-300" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
