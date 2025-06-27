"use client";

import clearIcon from "@/assets/images/clear.svg";
import searchIcon from "@/assets/images/search.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const [showClear, setShowClear] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (input) {
      setShowClear(true);
    } else {
      const timer = setTimeout(() => setShowClear(false), 300);
      return () => clearTimeout(timer);
    }
  }, [input]);

  const handleClear = () => setInput("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    const params = new URLSearchParams(window.location.search);
    params.set("keyword", input);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit} role="search">
      <input
        className="w-full border border-[#DDDFE5] rounded-lg bg-[#F8F9FB] pl-4 pr-12 py-3 outline-none max-h-[48px]"
        placeholder="지역, 지번으로 검색"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex items-center gap-[12px] absolute right-3 top-1/2 -translate-y-1/2">
        <button
          onClick={handleClear}
          type="button"
          className={`cursor-pointer transition-opacity duration-300 ${
            input ? "opacity-100 visible" : "opacity-0"
          } ${showClear ? "visible" : "invisible"}`}
        >
          <Image src={clearIcon} alt="지우기" width={18} height={18} />
        </button>
        <button className="cursor-pointer">
          <Image src={searchIcon} alt="검색" width={20} height={20} />
        </button>
      </div>
    </form>
  );
}
