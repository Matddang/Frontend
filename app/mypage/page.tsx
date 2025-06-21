import Frame from "@/components/layout/Frame";
import ArrowIcon from "@/assets/images/arrow-right-white.svg";
import Image from "next/image";
import MyPageLink from "./_components/MyPageLink";

export default function Page() {
  const tab = [
    {
      key: "login",
      title: "로그인 정보",
      content: "Kakao",
    },
    {
      key: "location",
      title: "내 장소 관리",
    },
    {
      key: "leave",
      title: "탈퇴하기",
    },
  ];

  return (
    <Frame>
      <div className="w-[817px] h-[589px] rounded-[20px] bg-white px-[40px] py-[44px] mt-[24px] mb-[153px] mx-auto flex flex-col gap-[24px]">
        <h1 className="font-bold text-[24px] text-black">마이 페이지</h1>
        <div className="flex flex-col gap-[40px]">
          <div className="bg-primary-light flex justify-between items-center py-[14px] px-[6px]">
            <span className="text-[16px] text-gray-1200">
              김이화님은 ‘수익형’ 농부입니다☺️
            </span>
            <button
              className="flex gap-[6px] items-center rounded-[8px] p-[10px] cursor-pointer"
              style={{
                background:
                  "linear-gradient(247deg, #D6FF95 -11.27%, #39B94C 44.64%)",
              }}
            >
              <span className="text-white font-bold text-[16px]">수익형</span>
              <Image src={ArrowIcon} alt="right" />
            </button>
          </div>

          <div className="flex flex-col gap-[54px]">
            {tab.map((t) => (
              <MyPageLink key={t.key} tab={t} />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}
