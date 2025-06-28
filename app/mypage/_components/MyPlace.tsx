"use client";

import AddLoctaionButton from "@/components/location/AddLocationButton";
import LocationBar from "@/components/location/LocationBar";
import { getMyPlace } from "@/services/getMyPlace";
import { useTokenStore } from "@/store/useTokenStore";
import { Place } from "@/types/myPlace";
import { useQuery } from "@tanstack/react-query";

export default function MyPlace() {
  const { token } = useTokenStore();

  const { data } = useQuery({
    queryKey: ["myPlace"],
    queryFn: () => getMyPlace(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const places: Place[] = data?.data || [];

  return (
    <div className="flex flex-col gap-[12px]">
      {places?.length ? (
        places.map((place, i) => <LocationBar location={place} key={i} />)
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
  );
}
