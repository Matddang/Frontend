import AddLoctaionButton from "@/components/location/AddLocationButton";
import ProcessForm from "@/components/process/ProcessForm";
import { StepProps, STEPS_LABEL } from "@/types/typetest";
import Image from "next/image";
import HomeIcon from "@/assets/images/home-white.svg";
import PlantIcon from "@/assets/images/plant.svg";
import { useQuery } from "@tanstack/react-query";
import { getMyPlace } from "@/services/getMyPlace";
import { useTokenStore } from "@/store/useTokenStore";
import { useEffect, useState } from "react";

interface Place {
  placeId: number;
  address: string;
  placeType: string;
  placeName: string;
  latitude: string;
  longitude: string;
}

export default function AddLoaction({ nextStep, prevStep }: StepProps) {
  const title = {
    title: "내 장소를 등록하고, 가까운 농지를 추천받아보세요.",
    subTitle: "해당 장소와 가까운 농지를 추천해 드릴게요.",
  };
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
    <ProcessForm
      currentStep={6}
      stepCount={8}
      title={title}
      nextStep={() => nextStep(STEPS_LABEL.LOCATION, "")}
      isLocation
      disable={locations.length === 0}
      prevStep={prevStep}
    >
      {locations.length ? (
        <div className="flex flex-col gap-[10px]">
          <span className="typo-sub-title-m text-gray-900">
            내 장소 관리는 마이페이지에서 가능합니다.
          </span>
          {locations.map((location, i) => (
            <div
              className="w-full h-[67px] rounded-[10px] border-[1px] p-[10px] border-gray-400 flex gap-[10px] items-center"
              key={i}
            >
              <div className="w-[34px] h-[34px] rounded-[50%] bg-primary flex justify-center items-center">
                <Image
                  src={location.placeType === "HOME" ? HomeIcon : PlantIcon}
                  alt="icon"
                />
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="font-semibold typo-sub-head-sb">
                  {location.placeName}
                </span>
                <span className="typo-body-2-m">{location.address}</span>
              </div>
            </div>
          ))}
          <AddLoctaionButton title="내 장소 등록하기" />
        </div>
      ) : (
        <AddLoctaionButton title="내 장소 등록하기" />
      )}
    </ProcessForm>
  );
}
