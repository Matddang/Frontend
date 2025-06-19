"use client";

import Image from "next/image";
import HomeIcon from "@/assets/images/home-white.svg";
import PlantIcon from "@/assets/images/plant.svg";
import EditIcon from "@/assets/images/edit.svg";
import { useState } from "react";
import AddLocationModal from "./AddLocationModal";

interface LocationBarType {
  location: {
    type: string;
    name: string;
    address: string;
  };
}

export default function LocationBar({ location }: LocationBarType) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-[738px] h-[67px] rounded-[10px] border-[1px] py-[10px] px-[12px] border-gray-400 flex justify-between">
      <div className="flex gap-[10px] items-center">
        <div className="w-[34px] h-[34px] rounded-[50%] bg-primary flex justify-center items-center">
          <Image
            src={location.type === "HOME" ? HomeIcon : PlantIcon}
            alt="icon"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <span className="font-semibold text-[18px]">{location.name}</span>
          <span className="text-[12px]">{location.address}</span>
        </div>
      </div>
      <Image
        src={EditIcon}
        alt="edit"
        className="cursor-pointer"
        onClick={() => setOpenModal(true)}
      />
      {openModal && (
        <AddLocationModal
          title="내 장소 수정하기"
          onClose={() => setOpenModal(false)}
          data={location}
        />
      )}
    </div>
  );
}
