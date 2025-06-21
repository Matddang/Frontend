import Frame from "@/components/layout/Frame";
import MyPageLink from "./_components/MyPageLink";
import MyPageBanner from "./_components/MyPageBanner";

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
        <h1 className="typo-head-3 text-black">마이 페이지</h1>
        <div className="flex flex-col gap-[40px]">
          <MyPageBanner />

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
