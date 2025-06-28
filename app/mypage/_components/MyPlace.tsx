"use client";

import AddLoctaionButton from "@/components/location/AddLocationButton";
import LocationBar from "@/components/location/LocationBar";
import { getMyPlace } from "@/services/getMyPlace";
import { useTokenStore } from "@/store/useTokenStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Place {
  placeId: number;
  address: string;
  placeType: string;
  placeName: string;
  latitude: string;
  longitude: string;
}

export default function MyPlace() {
  const { token } = useTokenStore();
  const [locations, setLocations] = useState<Place[]>([]);

  const { data } = useQuery({
    queryKey: ["myPlace"],
    queryFn: () => getMyPlace(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      setLocations(data.data);
    }
  }, [data]);

  return (
    <div className="flex flex-col gap-[12px]">
      {locations?.length ? (
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
  );
}
