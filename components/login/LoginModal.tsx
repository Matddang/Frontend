"use client";

import Image from "next/image";
import Modal from "../common/Modal";
import LoginImg from "@/assets/images/login-img.svg";
import LoginImg2 from "@/assets/images/login-img2.svg";
import LoginTooltip from "@/assets/images/login-tooltip.svg";
import KakaoIcon from "@/assets/images/kakao-icon.svg";
import GoogleIcon from "@/assets/images/google-icon.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  return (
    <Modal
      width={410}
      onClose={onClose}
      bgColor={isLogin ? `bg-primary-light` : ""}
    >
      {!isLogin ? (
        <div className="flex flex-col gap-[24px] pt-[59px] pb-[12px]">
          <div className="flex flex-col gap-[22px] items-center">
            <div className="flex flex-col gap-[10px]">
              <span className="font-bold text-[24px] text-gray-1100 text-center">
                당신께 딱 맞는 농지,
                <br />
                맞땅이 찾아드려요.
              </span>
              <span className="text-[14px] text-primary text-center">
                회원가입을 하시면 맞춤 매물 추천과
                <br />
                농지 매물 비교 서비스를 이용하실 수 있습니다.
              </span>
            </div>
            <Image src={LoginImg} alt="img" />
          </div>

          <div className="flex flex-col gap-[10px] items-center">
            <Image src={LoginTooltip} alt="tooltip" />
            <div className="w-full flex flex-col gap-[18px]">
              <button className="flex gap-[52px] font-semibold text-[18px] text-black bg-[#FCDC40] rounded-[8px] py-[12px] pl-[51.5px] cursor-pointer">
                <Image src={KakaoIcon} alt="kakao" />
                카카오로 로그인
              </button>
              <button className="flex gap-[52px] font-semibold text-[18px] text-black rounded-[8px] border-[1px] border-gray-500 py-[12px] pl-[51.5px] cursor-pointer">
                <Image src={GoogleIcon} alt="google" />
                Google로 로그인
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-end pt-[59px] pb-[12px]">
          <div className="w-full flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[24px] items-center">
              <div className="flex flex-col gap-[10px]">
                <span className="font-bold text-[24px] text-gray-1100 text-center">
                  농업 라이프 스타일부터
                  <br />
                  체크해봐요
                </span>
                <span className="text-[16px] text-gray-700 text-center">
                  최예은님의 농업 스타일을 기반으로
                  <br />
                  맞춤 매물 정보를 제공해드려요
                </span>
              </div>
              <Image src={LoginImg2} alt="img" />
            </div>
            <button
              className="font-semibold text-[18px] text-white bg-primary py-[12px] rounded-[8px] cursor-pointer"
              onClick={() => router.push("/typetest")}
            >
              시작하기
            </button>
          </div>
          <span className="text-[14px] text-gray-600 underline cursor-pointer">
            다음에 할래요
          </span>
        </div>
      )}
    </Modal>
  );
}
