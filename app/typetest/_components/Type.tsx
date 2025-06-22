import Image from "next/image";
import TypeImage from "@/assets/images/type-image.svg";
import { useEffect, useState } from "react";
import Loading from "@/assets/images/loading.svg";
import { useUserStore } from "@/store/UserStore";

export default function Type() {
  const [loading, setLoading] = useState(true);
  const { name } = useUserStore();

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);

  if (loading) {
    return (
      <div className="h-svh flex flex-col gap-[48px] items-center pt-[268px]">
        <Image src={Loading} alt="loading" className="animate-spin" />
        <span className="typo-head-3 text-black">유형을 불러오고 있어요</span>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-[40px] px-[40px] pt-[34px] pb-[70px] rounded-[20px] w-[817px] mx-auto mt-[24px] mb-[87px]"
      style={{
        background: "linear-gradient(180deg, #F0FFD7 0%, #D7EFAE 100%)",
      }}
    >
      <div className="flex flex-col gap-[60px]">
        <div className="w-full flex flex-col gap-[4px] items-start">
          <p className="typo-head-3 text-black">
            {name}님의 농업 라이프 스타일은
          </p>
          <button className="typo-body-1-m text-gray-900 underline">
            재진단하기
          </button>
        </div>
        <div className="w-full flex flex-col gap-[40px]">
          <Image src={TypeImage} alt="image" className="mx-auto" />
          <div className="w-full flex flex-col gap-[24px] bg-primary-light px-[32px] py-[40px] rounded-[12px]">
            <div className="flex flex-col gap-[10px] items-center">
              <div className="flex flex-col gap-[3px] items-center">
                <span className="typo-body-1-m text-gray-1000">
                  대농의 꿈을 향해!
                </span>
                <span className="typo-head-1 text-gray-1100">수익형 농부</span>
              </div>
              <span className="typo-body-1-b text-primary">
                #정착&nbsp;&nbsp;#수익성&nbsp;&nbsp;#장기농업
              </span>
            </div>
            <span className="text-[16px] text-gray-800 text-center tracking-[-0.01em]">
              &nbsp;농업을 새로운 삶의 출발점으로 삼으려는 당신은 도전 정신이
              강한 초보 농민입니다. 도시 생활을 뒤로하고 자립적인 삶을 꿈꾸며
              농업에 첫발을 내디딘 당신은, 아직은 전문 지식이 부족할 수 있지만
              학습 의지와 실행력이 뛰어난 사람이에요. 실패 가능성을 줄이고
              안정적으로 시작하고자 키우기 간단하고 관리 부담이 적은 작물부터
              시작하고 싶어 하고, 단순한 체험이나 취미 농사에 그치지 않고
              실질적인 수익과 자립을 목표로 하고 있습니다.
              <br />
              <br />
              &nbsp; 이런 당신에게는 초기 진입 장벽이 낮고 소규모로도 시작할 수
              있는 작목(예: 엽채류, 버섯류, 특용작물 등)이 잘 맞으며,
              농업기술센터나 귀농교육 프로그램을 활용해 기초 역량을 다져나가는
              것이 중요합니다. 무엇보다 시장성과 유통 경로 확보를 고려한 작목
              선정이 자립 기반을 만드는 핵심이 될 거예요.
              <br />
              <br />
              초보 농민이 시작하기에 적합한 농지 매물을 추천해드리고,
              <br />
              직접 원하는 조건에 맞는 농지를 검색하고 비교할 수 있도록
              도와드릴게요!
            </span>
          </div>
        </div>
      </div>
      <button
        className="w-full h-[51px] rounded-lg bg-primary text-white typo-sub-head-sb cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
        style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
      >
        맞춤 추천 받으러가기
      </button>
    </div>
  );
}
