"use client";

import SearchBar from "@/components/common/SearchBar";
import { ReactNode, useState } from "react";
import ChevronLeftIcon from "@/assets/images/chevron-left.svg";
import Image from "next/image";

export default function SideBar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* 사이드바 */}
      <aside
        className={`relative flex flex-col h-full max-w-[390px] shrink-0 border-r border-[#F3F3F3] transition-opacity duration-300 ease-in-out`}
        style={{
          width: isOpen ? "100%" : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-4 py-[13px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] max-h-[65px] flex items-center">
          <SearchBar onSubmit={(value) => alert("검색어: " + value)} />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>

        {/* 닫기 버튼 */}
        <button
          onClick={() => setIsOpen(false)}
          className="z-10 absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-[38px] h-[85px] flex items-center justify-center bg-white border border-gray-400 rounded-r-[4px]"
          aria-label="사이드바 닫기"
        >
          <Image src={ChevronLeftIcon} alt="닫기" />
        </button>
      </aside>

      {/* 열기 버튼 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="z-10 absolute top-1/2 left-0 transform -translate-y-1/2 w-[38px] h-[85px] flex items-center justify-center bg-white border border-gray-400 rounded-r-[4px]"
          aria-label="사이드바 열기"
        >
          <Image
            src={ChevronLeftIcon}
            alt="열기"
            className="rotate-180 transition-transform duration-300"
          />
        </button>
      )}
    </>
  );
}
