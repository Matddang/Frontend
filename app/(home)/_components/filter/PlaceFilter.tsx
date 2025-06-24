import HomeActiveIcon from "@/assets/images/home-active.svg";
import FarmlandActiveIcon from "@/assets/images/farmland-active.svg";
import Image from "next/image";
import { useTokenStore } from "@/store/useTokenStore";
import { useQuery } from "@tanstack/react-query";
import { getMyPlace } from "@/services/getMyPlage";
import AddLoctaionButton from "@/components/location/AddLocationButton";

interface PlaceIdFilterProps {
  tempPlace: { id: number | null; name: string | null };
  setTempPlace: (value: { id: number | null; name: string | null }) => void;
}

interface MyPlace {
  placeId: number;
  placeType: "residence" | "farmland";
  placeName: string;
  address: string;
}

export default function PlaceFilter({
  tempPlace,
  setTempPlace,
}: PlaceIdFilterProps) {
  const { token } = useTokenStore();

  const { data } = useQuery<MyPlace[]>({
    queryKey: ["myPlace"],
    queryFn: () => getMyPlace(token!),
    staleTime: 5 * 60 * 1000,
    enabled: !!token,
  });

  return (
    <div className="flex flex-col gap-6 mt-[6px]">
      {data?.length === 0 ? (
        <div className="pt-5">
          <p className="typo-sub-head-sb">아직 등록한 장소가 없어요.</p>
          <p className="typo-body-1-m text-gray-700">
            원활한 필터 사용을 위해 장소를 먼저 등록해 주세요!
          </p>
        </div>
      ) : (
        <div className="text-gray-700 typo-body-1-m">
          장소 한 곳을 선택해 주세요.
        </div>
      )}
      <div className="flex flex-col gap-[10px]">
        {data?.map(({ placeId, placeType, placeName, address }) => (
          <button
            onClick={() => setTempPlace({ id: placeId, name: placeName })}
            key={placeId}
            className={`p-[10px] flex gap-[10px] items-center border border-gray-400 rounded-[10px] ${
              tempPlace.id === placeId
                ? "border-primary bg-primary-light"
                : "border-gray-400"
            }`}
          >
            <Image
              src={
                placeType === "residence" ? HomeActiveIcon : FarmlandActiveIcon
              }
              alt="장소"
              width={34}
              height={34}
            />
            <div className="flex flex-col gap-[2px]">
              <div className="typo-sub-head-sb text-left">{placeName}</div>
              <div className="typo-body-2-m">{address}</div>
            </div>
          </button>
        ))}
        <AddLoctaionButton title="장소 추가하기" />
      </div>
    </div>
  );
}
