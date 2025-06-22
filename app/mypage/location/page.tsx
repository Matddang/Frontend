import Frame from "@/components/layout/Frame";
import AddLoctaionButton from "@/components/location/AddLocationButton";
import LocationBar from "@/components/location/LocationBar";

export default function Page() {
  const locations = [
    {
      type: "ORCHARD",
      name: "여수 과수원",
      address: "여수시 신촌동 234길 ",
    },
    {
      type: "ORCHARD",
      name: "여수 과수원",
      address: "여수시 신촌동 234길 ",
    },
    {
      type: "HOME",
      name: "여수 집",
      address: "여수시 신촌동 234길 ",
    },
  ];

  return (
    <Frame>
      <div className="w-[818px] h-[589px] rounded-[20px] bg-white px-[40px] py-[44px] mt-[24px] mb-[153px] mx-auto flex flex-col gap-[32px]">
        <div className="flex flex-col gap-[8px]">
          <h1 className="typo-head-3 text-black">내 장소 관리</h1>
          <span className="typo-sub-title-m text-gray-1100">
            필터에서 사용 가능한 ‘내 장소’를 관리할 수 있는 페이지입니다.
          </span>
        </div>
        <div className="flex flex-col gap-[12px]">
          {locations.length ? (
            locations.map((location, i) => (
              <LocationBar location={location} key={i} />
            ))
          ) : (
            <div className="flex flex-col gap-[2px] mt-[68px]">
              <span className="typo-sub-head-sb text-black">
                아직 등록한 장소가 없어요.
              </span>
              <span className="typo-body-1-m text-gray-700">
                원활한 필터 사용을 위해 장소를 먼저 등록해 주세요!
              </span>
            </div>
          )}
          <AddLoctaionButton title="내 장소 등록하기" />
        </div>
      </div>
    </Frame>
  );
}
