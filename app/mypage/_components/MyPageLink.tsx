"use client";

import Image from "next/image";
import Link from "next/link";
import ArrowBlackIcon from "@/assets/images/arrow-right-black.svg";
import { useState } from "react";
import Modal from "@/components/common/Modal";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/services/getUserInfo";
import { useTokenStore } from "@/store/useTokenStore";

export default function MyPageLink({
  tab,
}: {
  tab: {
    key: string;
    title: string;
  };
}) {
  const [openModal, setOpenModal] = useState(false);
  const { token } = useTokenStore();
  const { data } = useQuery({
    queryKey: ["userInfo"],
    queryFn: () => getUserInfo(token!),
    staleTime: 5 * 60 * 1000,
    enabled: !!token,
  });

  return (
    <>
      <Link
        className="flex justify-between items-center cursor-pointer"
        href={tab.key === "location" ? "/mypage/location" : ""}
        onClick={() => tab.key === "leave" && setOpenModal(true)}
      >
        <span className="typo-body-1-b text-black">{tab.title}</span>
        <div className="flex gap-[12px] items-center">
          {tab.key === "login" && (
            <span className="typo-body-1-m text-gray-700">
              {data?.data.socialLoginType || ""}
            </span>
          )}
          <Image src={ArrowBlackIcon} alt="right" />
        </div>
      </Link>
      {openModal && (
        <Modal width={410} onClose={() => setOpenModal(false)}>
          <div className="flex flex-col gap-[56px] items-center pt-[59px] pb-[19px]">
            <div className="flex flex-col gap-[20px]">
              <span className="typo-head-3 text-gray-1100">
                정말 탈퇴하시겠습니까?
              </span>
              <span className="typo-body-1-m text-gray-700 text-center">
                지금 탈퇴하시면 회원님의 모든 정보가
                <br />
                사라지며, 되돌릴 수 없습니다.
              </span>
            </div>
            <button className="w-full typo-sub-head-sb text-white bg-system-red py-[12px] rounded-[8px] cursor-pointer">
              탈퇴하기
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
