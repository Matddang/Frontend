"use client";

import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isLoginHidden = pathname === "/typetest";

  return (
    <div className="h-[65px] px-[50px] pt-[14px] pb-[12px] flex justify-center border-b-[1px] bg-white border-b-gray-300">
      <div className="max-w-[1440px] w-full flex justify-between items-center">
        <div>Logo</div>
        {!isLoginHidden && (
          <button className="bg-primary text-white font-[600] text-[18px] text-nowrap w-[96px] h-[37px] rounded-lg cursor-pointer">
            로그인
          </button>
        )}
      </div>
    </div>
  );
}
