import Image from "next/image";
import HeartActiveIcon from "@/assets/images/heart-primary.svg";
import HeartIcon from "@/assets/images/heart-white.svg";
import CheckDefaultIcon from "@/assets/images/check-gray.svg";
import CheckIcon from "@/assets/images/check-primary.svg";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { likeProperty } from "@/services/likeProperty";

type property = {
  id: number;
  price: number;
  type: string;
  area: number;
  address: string;
  distance: string;
};

interface PropertyItemProps {
  property: property;
  compare?: boolean;
  selected?: boolean;
  handleClick?: (value: property) => void;
}

export default function PropertyItem({
  property,
  compare = false,
  selected,
  handleClick,
}: PropertyItemProps) {
  const [like, setLike] = useState(true);

  const mutation = useMutation({
    mutationFn: () => likeProperty(1),
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
        className={`min-w-[115px] h-[115px] rounded-[8px] flex justify-center items-center bg-gray-200 ${
          selected ? "border-[2px] border-primary" : ""
        }`}
      ></div>
      <div className="w-full flex justify-between items-center">
        <div className="min-h-[115px] w-full flex flex-col justify-between">
          <div className="flex flex-col">
            <div className="flex justify-between">
              <span className="typo-body-1-b text-black">
                매매 {property.price}억
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
              {property.area}평 / {property.address}
            </span>
          </div>

          <div className="flex flex-col gap-[6px]">
            <div
              className="w-fit bg-primary-light py-[6px] px-[10px] rounded-[4px] typo-body-2-sb text-primary"
              style={{ border: "1px solid rgba(0, 221, 155, 0.23)" }}
            >
              {property.type === "ORCHARD" ? "과수원" : "밭"}
            </div>
            <span className="typo-sub-title-m text-gray-800">
              {property.distance}
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
