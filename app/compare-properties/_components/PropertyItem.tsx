import Image from "next/image";
import HeartActiveIcon from "@/assets/images/heart-primary.svg";
import HeartIcon from "@/assets/images/heart-white.svg";
import CheckDefaultIcon from "@/assets/images/check-gray.svg";
import CheckIcon from "@/assets/images/check-primary.svg";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { likeProperty } from "@/services/likeProperty";
import { Property } from "@/types/property";
import { formatKoreanUnit } from "@/utils/format";
import { Place } from "@/types/myPlace";
import { useTokenStore } from "@/store/useTokenStore";
import { getMyPlace } from "@/services/getMyPlace";
import { getDurationTime } from "@/utils/getDurationTime";
import { getListingDetail } from "@/services/getListingDetail";

interface PropertyItemProps {
  property: Property;
  compare?: boolean;
  selected?: boolean;
  handleClick?: (value: Property) => void;
}

export default function PropertyItem({
  property,
  compare = false,
  selected,
  handleClick,
}: PropertyItemProps) {
  const [like, setLike] = useState(true);
  const [location, setLocation] = useState<Place>();
  const [distance, setDistance] = useState("");

  const { token } = useTokenStore();

  const { data } = useQuery({
    queryKey: ["myPlace"],
    queryFn: () => getMyPlace(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const { data: saleData } = useQuery({
    queryKey: ["listingDetail", property],
    queryFn: () => getListingDetail(property.saleId),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const { data: durationTime } = useQuery({
    queryKey: ["durationTime", property],
    queryFn: () =>
      getDurationTime(location!, [
        saleData.sale[0].wgsX,
        saleData.sale[0].wgsY,
      ]),
    staleTime: 1000 * 60 * 5,
    enabled: !!token && !!location && !!saleData,
  });

  useEffect(() => {
    if (data) {
      const homes = data.data.filter(
        (v: Place) => v.placeType === "HOME" && v.latitude && v.longitude,
      );
      const farms = data.data.filter((v: Place) => v.latitude && v.longitude);

      if (homes.length) {
        setLocation(homes[0]);
      } else {
        setLocation(farms[0]);
      }
    }
  }, [data]);

  useEffect(() => {
    const getDistance = async () => {
      if (!location) return;
      else {
        if (durationTime) setDistance(durationTime);
        else setDistance("");
      }
    };

    getDistance();
  }, [location, durationTime]);

  const mutation = useMutation({
    mutationFn: () => likeProperty(property.saleId),
    onSuccess: (status) => {
      if (status === 200) {
        setLike((prev) => !prev);
      }
    },
    onError: () => {
      console.error("매물 좋아요 실패");
    },
  });

  const handleLike = () => {
    mutation.mutate();
  };

  return (
    <div
      className={`pb-[16px] flex gap-[12px] border-b-[1px] border-b-gray-300 ${
        selected ? "bg-primary-light" : "bg-white"
      } ${compare ? "cursor-pointer" : "cursor-auto"}`}
      onClick={() => handleClick && handleClick(property)}
    >
      <div
        className={`min-w-[115px] h-[115px] rounded-[8px] flex justify-center items-center bg-gray-200 overflow-hidden ${
          selected ? "border-[2px] border-primary" : ""
        }`}
      >
        <Image
          src={property.imgUrl}
          alt="img"
          width={115}
          height={115}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="min-h-[115px] w-full flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span className="typo-body-1-b text-black">
                {property.saleCategory} {formatKoreanUnit(property.price)}
              </span>
              {!compare && (
                <Image
                  src={like ? HeartActiveIcon : HeartIcon}
                  alt="heart"
                  className="cursor-pointer"
                  onClick={handleLike}
                />
              )}
            </div>
            <span className="typo-sub-title-m text-black">
              {property.area}평 / {property.saleAddr}
            </span>
          </div>

          <div className="flex flex-col gap-[6px]">
            <div
              className="w-fit bg-primary-light py-[6px] px-[10px] rounded-[4px] typo-body-2-sb text-primary"
              style={{ border: "1px solid rgba(0, 221, 155, 0.23)" }}
            >
              {property.landType}
            </div>
            <span className="typo-sub-title-m text-gray-800">
              {location
                ? `${property.mainCrop} / ${
                    location.placeType === "HOME" ? "집" : "농지"
                  }에서 ${distance} 거리`
                : property.mainCrop}
            </span>
          </div>
        </div>
      </div>
      {compare &&
        (selected ? (
          <Image src={CheckIcon} alt="check" className="cursor-pointer" />
        ) : (
          <Image
            src={CheckDefaultIcon}
            alt="check"
            className="cursor-pointer"
          />
        ))}
    </div>
  );
}
