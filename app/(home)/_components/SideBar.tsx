"use client";

import SearchBar from "@/components/common/SearchBar";
import { ReactNode } from "react";

export default function SideBar({ children }: { children: ReactNode }) {
  return (
    <aside className="flex flex-col w-[390px] h-full shrink-0 border-r border-[#F3F3F3]">
      <div className="px-4 py-[13px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)] max-h-[65px] flex items-center">
        <SearchBar onSubmit={(value) => alert("검색어: " + value)} />
      </div>
      {children}
    </aside>
  );
}
