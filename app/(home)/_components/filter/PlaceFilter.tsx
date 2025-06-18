import { places } from "@/mock/myPlace";
import HomeActiveIcon from "@/assets/images/home-active.svg";
import FarmlandActiveIcon from "@/assets/images/farmland-active.svg";
import AddIcon from "@/assets/images/add.svg";
import Image from "next/image";

interface PlaceIdFilterProps {
  tempPlaceId: number | null;
  setTempPlaceId: (value: number) => void;
}

export default function PlaceFilter({
  tempPlaceId,
  setTempPlaceId,
}: PlaceIdFilterProps) {
  return (
    <div className="flex flex-col gap-6 mt-[6px]">
      <div className="text-gray-700 typo-body-1-m">
        장소 한 곳을 선택해 주세요.
      </div>
      <div className="flex flex-col gap-[10px]">
        {places.map(({ id, name, address, type }, index) => (
          <button
            onClick={() => setTempPlaceId(id)}
            key={index}
            className={`p-[10px] flex gap-[10px] items-center border border-gray-400 rounded-[10px] ${
              tempPlaceId === id
                ? "border-primary bg-primary-light"
                : "border-gray-400"
            }`}
          >
            <Image
              src={type === "residence" ? HomeActiveIcon : FarmlandActiveIcon}
              alt="장소"
              width={34}
              height={34}
            />
            <div className="flex flex-col gap-[2px]">
              <div className="typo-sub-head-sb text-left">{name}</div>
              <div className="typo-body-2-m">{address}</div>
            </div>
          </button>
        ))}
        <button
          className={`p-[10px] flex gap-[10px] items-center border border-gray-400 rounded-[10px]`}
        >
          <Image src={AddIcon} alt="장소 추가" />
          <div className="typo-sub-head-sb">장소 추가하기</div>
        </button>
      </div>
    </div>
  );
}
