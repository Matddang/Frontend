"use client";

import { usePathname } from "next/navigation";
import Logo from "@/assets/images/logo.svg";
import Image from "next/image";
import { useState } from "react";
import LoginModal from "../login/LoginModal";

export default function Header() {
  const [loginModal, setLoginModal] = useState(false);
  const pathname = usePathname();
  const isLoginHidden = pathname === "/typetest";

  return (
    <div className="h-[65px] px-[50px] pt-[14px] pb-[12px] flex justify-center border-b-[1px] bg-white border-b-gray-300">
      <div className="max-w-[1440px] w-full flex justify-between items-center">
        <Image src={Logo} alt="logo" />
        {!isLoginHidden && (
          <button
            className="bg-primary text-white font-semibold text-[18px] text-nowrap w-[96px] h-[37px] rounded-lg cursor-pointer"
            onClick={() => setLoginModal(true)}
          >
            로그인
          </button>
        )}
        {loginModal && <LoginModal onClose={() => setLoginModal(false)} />}
      </div>
    </div>
  );
}
