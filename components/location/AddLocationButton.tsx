"use client";

import AddIcon from "@/assets/images/add-gray.svg";
import Image from "next/image";
import { useAddLocationModal } from "@/store/useAddLocationModal";
import { useUserStore } from "@/store/UserStore";
import { useState } from "react";
import LoginModal from "../login/LoginModal";

export default function AddLoctaionButton({ title }: { title: string }) {
  const { modalOpen } = useAddLocationModal();
  const { isLogin } = useUserStore();
  const [loginModal, setLoginModal] = useState(false);

  const handleClick = () => {
    if (isLogin) modalOpen(title);
    else setLoginModal(true);
  };

  return (
    <>
      <button
        className="w-full h-[64px] flex gap-[10px] items-center bg-gray-100 border-[1px] border-gray-400 rounded-[10px] py-[15px] px-[10px] cursor-pointer"
        onClick={handleClick}
      >
        <Image src={AddIcon} alt="add" />
        <span className="typo-sub-head-sb font-semibold text-black">
          장소 추가하기
        </span>
      </button>

      {loginModal && <LoginModal onClose={() => setLoginModal(false)} />}
    </>
  );
}
