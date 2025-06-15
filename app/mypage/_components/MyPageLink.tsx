"use client";

import Image from "next/image";
import Link from "next/link";
import ArrowBlackIcon from "@/assets/images/arrow-right-black.svg";
import { useState } from "react";
import Modal from "@/components/common/Modal";

export default function MyPageLink({
  tab,
}: {
  tab: {
    key: string;
    title: string;
    content?: string;
  };
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Link
        className="flex justify-between items-center cursor-pointer"
        href={tab.key === "location" ? "/mypage/location" : ""}
        onClick={() => tab.key === "leave" && setOpenModal(true)}
      >
        <span className="text-[16px] font-bold text-black">{tab.title}</span>
        <div className="flex gap-[12px] items-center">
          {tab.key === "login" && (
            <span className="text-[16px] text-gray-700">{tab.content}</span>
          )}
          <Image src={ArrowBlackIcon} alt="right" />
        </div>
      </Link>
      {openModal && (
        <Modal width={410} onClose={() => setOpenModal(false)}>
          <div className="flex flex-col gap-[56px] items-center pt-[59px] pb-[19px]">
            <div className="flex flex-col gap-[20px]">
              <span className="font-bold text-[24px] text-gray-1100">
                정말 탈퇴하시겠습니까?
              </span>
              <span className="text-[16px] text-gray-700 text-center">
                지금 탈퇴하시면 회원님의 모든 정보가
                <br />
                사라지며, 되돌릴 수 없습니다.
              </span>
            </div>
            <button className="w-full text-[18px] font-semibold text-white bg-system-red py-[12px] rounded-[8px] cursor-pointer">
              탈퇴하기
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
