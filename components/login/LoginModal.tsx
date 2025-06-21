"use client";

import Image from "next/image";
import Modal from "../common/Modal";
import LoginImg from "@/assets/images/login-img.svg";
import LoginImg2 from "@/assets/images/login-img2.svg";
import LoginTooltip from "@/assets/images/login-tooltip.svg";
import KakaoIcon from "@/assets/images/kakao-icon.svg";
import GoogleIcon from "@/assets/images/google-icon.svg";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";
import { useLoginModalStore } from "@/store/LoginModalStore";

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const { name } = useUserStore();
  const { modalClose } = useLoginModalStore();
  const router = useRouter();

  const kakaoLoginHandler = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
    });
  };

  useEffect(() => {
    console.log("window.Kakao: ", window.Kakao);
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.KAKAO_API_KEY);
        console.log("after Init: ", window.Kakao.isInitialized());
      }
    }
  }, []);

  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.KAKAO_API_KEY);
        console.log("after Init: ", window.Kakao.isInitialized());
      }
    }
  }, [window.Kakao]);

  const handleClose = () => {
    modalClose();
    onClose();
  };

  return (
    <Modal
      width={410}
      onClose={handleClose}
      bgColor={name ? `bg-primary-light` : ""}
    >
      {!name ? (
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
            <Image src={LoginImg} alt="img" className="w-[142px] h-[116px]" />
          </div>

          <div className="flex flex-col gap-[10px] items-center">
            <Image
              src={LoginTooltip}
              alt="tooltip"
              className="w-[145px] h-[42px]"
              width={145}
              height={42}
            />
            <div className="w-full flex flex-col gap-[18px]">
              <button
                className="flex gap-[52px] font-semibold text-[18px] text-black bg-[#FCDC40] rounded-[8px] py-[12px] pl-[51.5px] cursor-pointer"
                onClick={kakaoLoginHandler}
              >
                <Image
                  src={KakaoIcon}
                  alt="kakao"
                  className="w-[23px] h-[23px]"
                  width={23}
                  height={23}
                />
                카카오로 로그인
              </button>
              <button className="flex gap-[52px] font-semibold text-[18px] text-black rounded-[8px] border-[1px] border-gray-500 py-[12px] pl-[51.5px] cursor-pointer">
                <Image
                  src={GoogleIcon}
                  alt="google"
                  className="w-[24px] h-[24px]"
                />
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
              onClick={() => {
                modalClose();
                router.push("/typetest");
              }}
            >
              시작하기
            </button>
          </div>
          <span
            className="text-[14px] text-gray-600 underline cursor-pointer"
            onClick={modalClose}
          >
            다음에 할래요
          </span>
        </div>
      )}
    </Modal>
  );
}
