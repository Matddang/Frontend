import Image from "next/image";
import StrawBerry from "@/assets/images/strawberry.svg";
import TomatoIcon from "@/assets/images/tomato.svg";
import Grape from "@/assets/images/grape.svg";
import Priority from "./Priority";

export default function Margin() {
  const CROPS_RANKING = [
    {
      type: "딸기",
      image: StrawBerry,
      title: "최대 70% 예상",
      content:
        "고급 품종과 직거래를 선택하면 매우 높은 마진율이 가능해요. 하지만 하우스 시설이 필요해 초기비용이 들어요.",
    },
    {
      type: "토마토",
      image: TomatoIcon,
      title: "최대 60% 예상",
      content:
        "유기농, 컬러 품종, 꾸러미 판매 등으로 프리미엄 판매가 가능해요. 회전이 빠르다는 게 특징이에요.",
    },
    {
      type: "포도",
      image: Grape,
      title: "최대 55% 예상",
      content:
        "선물세트나 고급 과일 시장을 노리면 수익이 높아요. 하지만, 초기 정착 시간이 2~3년 정도 필요해요.",
    },
  ];

  return (
    <div>
      <Priority
        title={`농지를 통해 몇 퍼센트\n마진까지 남길 수 있을까?`}
        semiTitle="맞땅이 마진율이 높은 작물의 예상 최대 마진율을 정리했어요."
      >
        <div
          className="relative w-[131px] h-[153px] flex flex-col justify-center items-center bg-white rounded-[8px] border-[1px] border-gray-300"
          style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="bg-primary text-white typo-body-1-b rounded-tl-[8px] absolute top-0 left-0 w-[33px] h-[30px] flex justify-center items-center">
            1위
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col gap-[7px] items-center">
              <Image src={StrawBerry} alt="strawberry" />
              <span className="typo-body-1-b text-black text-center">딸기</span>
            </div>
          </div>
          <span className="typo-body-1-b text-primary">약 70%</span>
        </div>
      </Priority>

      <div className="px-[16px] py-[24px] flex flex-col gap-[10px]">
        <span className="typo-sub-head-sb">마진율 높은 작물 랭킹</span>
        <div className="flex flex-col gap-[20px]">
          {CROPS_RANKING.map((crop, i) => {
            return (
              <div
                key={i}
                className="relative pl-[31px] pr-[17px] py-[17px] border-[1px] border-gray-300 rounded-[8px] flex items-center gap-[21px]"
                style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
              >
                <div
                  className={` text-white typo-body-1-b rounded-tl-[8px] absolute top-0 left-0 w-[33px] h-[30px] flex justify-center items-center ${
                    i === 0 ? "bg-primary" : "bg-[#9DDA2B]"
                  }`}
                >
                  {i + 1}위
                </div>
                <div className="flex flex-col gap-[7px] items-center min-w-[64px]">
                  <Image src={crop.image} alt="crop" width={64} />
                  <span className="typo-body-1-b text-black text-center">
                    딸기
                  </span>
                </div>
                <div className="flex flex-col gap-[7px]">
                  <span className="font-semibold text-[20px] text-black">
                    {crop.title}
                  </span>
                  <span className="typo-14-r">{crop.content}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
