import Image from "next/image";
import Money from "@/assets/images/money.svg";
import Priority from "./Priority";

export default function Policy() {
  const POLICY_LIST = [
    {
      type: "지원금",
      title: "청년농업인 영농정착지원사업",
      content:
        "최장 3년간 월 최대 110만원의 영농정착지원금과 다양한 연계 지원이 제공돼요!",
      period: "1차/2차 상이",
      homepage: "탄탄대로",
    },
    {
      type: "교육",
      title: "농지, 어디까지 알고 있니?",
      content: "농지은행 및 농업 농촌의 이해 등 기초적인 지식을 쌓아요!",
      period: "25.06.01 ~ 25.06.30",
      homepage: "농업교육포털",
    },
  ];

  return (
    <div>
      <Priority
        title={`지금 창업농들이\n가장 관심 있는 정책은 무엇일까?`}
        semiTitle="가장 인기가 많은 정책 정보예요."
      >
        <div
          className="relative w-[131px] h-[153px] flex flex-col justify-center items-center bg-white rounded-[8px] border-[1px] border-gray-300"
          style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="bg-primary text-white typo-body-1-b rounded-tl-[8px] absolute top-0 left-0 w-[33px] h-[30px] flex justify-center items-center">
            인기
          </div>
          <div className="flex flex-col gap-[7px] items-center">
            <Image src={Money} alt="money" />
            <span className="typo-body-1-b text-black text-center">
              청년농업인
              <br />
              영농정착지원사업
            </span>
          </div>
        </div>
      </Priority>

      <div className="px-[16px] py-[24px] flex flex-col gap-[10px]">
        <span className="typo-sub-head-sb">맞땅이 엄선한 창업농 대상 정책</span>
        <div className="flex flex-col gap-[20px]">
          {POLICY_LIST.map((policy, i) => {
            return (
              <div
                key={i}
                className="pl-[19px] pr-[31px] py-[15px] border-[1px] border-gray-300 rounded-[8px] flex flex-col gap-[10px]"
                style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
              >
                <div className="flex flex-col gap-[5px]">
                  <div className="bg-primary text-white typo-14-b py-[1px] px-[6px] rounded-[5px] w-fit">
                    {policy.type}
                  </div>
                  <div className="flex flex-col gap-[2px]">
                    <span className="font-semibold text-[20px] text-black">
                      {policy.title}
                    </span>
                    <span className="typo-14-r">{policy.content}</span>
                  </div>
                  <div className="flex flex-col typo-body-2-m text-gray-900">
                    <span>신청기간: {policy.period}</span>
                    <span>홈페이지: {policy.homepage}</span>
                  </div>
                </div>
                <button className="bg-primary-light text-primary typo-body-2-m p-[10px] rounded-[8px] cursor-pointer">
                  홈페이지 이동하기
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
