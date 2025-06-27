import Frame from "@/components/layout/Frame";
import MyPlace from "../_components/MyPlace";

export default function Page() {
  return (
    <Frame>
      <div className="w-[818px] rounded-[20px] bg-white px-[40px] py-[44px] mt-[24px] mb-[153px] mx-auto flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="typo-head-3 text-black">내 장소 관리</h1>
          <span className="typo-sub-title-m text-gray-1100">
            필터에서 사용 가능한 ‘내 장소’를 관리할 수 있는 페이지입니다.
          </span>
        </div>
        <MyPlace />
      </div>
    </Frame>
  );
}
