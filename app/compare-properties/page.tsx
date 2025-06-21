import Frame from "@/components/layout/Frame";
import TabComponent from "./_components/TabComponent";

export default function Page() {
  return (
    <Frame>
      <div className="w-[818px] rounded-[20px] bg-white px-[40px] pt-[44px] pb-[200px] mt-[24px] mb-[82px] mx-auto flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[8px]">
          <span className="typo-head-3 text-black">매물 비교</span>
          <span className="typo-sub-title-m text-gray-1100">
            찜한 매물 중 어떤 농지가 더 적합할까? 비교해 보세요!
          </span>
        </div>
        <TabComponent />
      </div>
    </Frame>
  );
}
