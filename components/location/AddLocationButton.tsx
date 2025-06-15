"use client";

import AddIcon from "@/assets/images/add-gray.svg";
import Image from "next/image";
import { useState } from "react";
import AddLocationModal from "./AddLocationModal";

export default function AddLoctaionButton({ title }: { title: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        className="w-full h-[64px] flex gap-[10px] items-center bg-gray-100 border-[1px] border-gray-400 rounded-[10px] py-[15px] px-[10px] cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <Image src={AddIcon} alt="add" />
        <span className="text-[18px] font-semibold text-black">
          장소 추가하기
        </span>
      </button>
      {modalOpen && (
        <AddLocationModal title={title} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
