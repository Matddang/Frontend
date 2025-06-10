import Image from "next/image";
import TypeImage from "@/assets/images/type-image.svg";
import { useEffect, useState } from "react";
import Loading from "@/assets/images/loading.svg";

export default function Type() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return (
      <div className="h-svh flex flex-col gap-[48px] items-center pt-[268px]">
        <Image src={Loading} alt="loading" className="animate-spin" />
        <span className="text-[24px] font-bold text-black">
          유형을 불러오고 있어요
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-[40px] px-[40px] pt-[34px] pb-[70px] rounded-[20px] w-[817px] h-[920px] mx-auto mt-[24px] mb-[87px]"
      style={{
        background: "linear-gradient(180deg, #F0FFD7 0%, #D7EFAE 100%)",
      }}
    >
      <div className="flex flex-col gap-[60px]">
        <div className="w-full flex flex-col gap-[4px] items-start">
          <p className="text-[24px] font-bold text-black">
            김이화님의 농업 라이프 스타일은
          </p>
          <button className="text-[16px] text-gray-900 underline cursor-pointer">
            재진단하기
          </button>
        </div>
        <div className="w-full flex flex-col gap-[40px]">
          <Image src={TypeImage} alt="image" className="mx-auto" />
          <div className="w-full flex flex-col gap-[24px] bg-primary-light px-[16px] py-[40px] rounded-[12px]">
            <div className="flex flex-col gap-[10px] items-center">
              <div className="flex flex-col gap-[3px] items-center">
                <span className="text-[16px] text-gray-1000">
                  대농의 꿈을 향해!
                </span>
                <span className="text-[28px] font-bold text-gray-1100">
                  수익형 농부
                </span>
              </div>
              <span className="text-[16px] font-bold text-primary">
                #정착&nbsp;&nbsp;#수익성&nbsp;&nbsp;#장기농업
              </span>
            </div>
            <span className="text-[16px] text-gray-800 text-center">
              마을 정착과 수익성을 중요시하는 청년 창업농형에 맞는 최적의 농지를
              추천해드릴게요. 마을 정착과 수익성을 중요시하는 청년 창업농형에
              맞는 최적의 농지를 추천해드릴게요. 마을 정착과 수익성을 중요시하는
              청년 창업농형에 맞는 최적의 농지를 추천해드릴게요. 수익성을
              중요시하는 창업농형에 맞는 최적의 농지를 추천해드릴게요.
            </span>
          </div>
        </div>
      </div>
      <button
        className="w-full h-[51px] rounded-lg bg-primary text-white font-semibold text-[18px] cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
        style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
      >
        맞춤 추천 받으러가기
      </button>
    </div>
  );
}
