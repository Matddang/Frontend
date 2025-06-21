import Image from "next/image";
import TypeFilter from "./TypeFilter";
import ResetIcon from "@/assets/images/reset.svg";
import { useFilterStore } from "@/store/FilterStore";
import { useEffect, useState } from "react";
import PriceFilter from "./PriceFilter";
import { AREA_FILTER, PRICE_FILTER } from "@/constants/filterOptions";
import AreaFilter from "./AreaFilter";
import KindFilter from "./KindFilter";
import CropFilter from "./CropFilter";
import PlaceFilter from "./PlaceFilter";
import InfoIcon from "@/assets/images/info.svg";
import Link from "next/link";

interface FilterModalProps {
  filter: { key: string; label: string };
  onApply: (value: string | number | null) => void;
}

export default function FilterModal({ filter, onApply }: FilterModalProps) {
  const {
    type,
    price,
    area,
    kind,
    crop,
    place,
    setType,
    setPrice,
    setArea,
    setKind,
    setCrop,
    setPlace,
  } = useFilterStore();
  const [tempFilters, setTempFilters] = useState({
    type,
    price,
    area,
    kind,
    crop,
    place,
  });

  useEffect(() => {
    setTempFilters({ type, price, area, kind, crop, place });
  }, [type, price, area, kind, crop, place]);

  const handleApply = () => {
    setType(tempFilters.type);
    setPrice(tempFilters.price);
    setArea(tempFilters.area);
    setKind(tempFilters.kind);
    setCrop(tempFilters.crop);
    setPlace(tempFilters.place);
    onApply(
      `임대/매매: ${tempFilters.type ?? "전체"}, ` +
        `희망가: 최소-${tempFilters.price.min ?? "없음"}/최대-${
          tempFilters.price.max ?? "없음"
        }, ` +
        `면적: 최소-${tempFilters.area.min ?? "없음"}/최대-${
          tempFilters.area.max ?? "없음"
        }, ` +
        `종류: ${
          tempFilters.kind.length > 0 ? tempFilters.kind.join(", ") : "전체, "
        }` +
        `선택한 장소: ${tempFilters.place.name ?? "없음"}`,
    );
  };

  const handleReset = () => {
    switch (filter.key) {
      case "type":
        setTempFilters((prev) => ({ ...prev, type: null }));
        break;
      case "price":
        setTempFilters((prev) => ({
          ...prev,
          price: {
            min: PRICE_FILTER[0].value,
            max: PRICE_FILTER[PRICE_FILTER.length - 1].value,
          },
        }));
        break;
      case "area":
        setTempFilters((prev) => ({
          ...prev,
          area: {
            min: AREA_FILTER[0].value,
            max: AREA_FILTER[AREA_FILTER.length - 1].value,
          },
        }));
        break;
      case "kind":
        setTempFilters((prev) => ({ ...prev, kind: [] }));
        break;
      case "crop":
        setTempFilters((prev) => ({ ...prev, crop: {} }));
        break;
      case "place":
        setTempFilters((prev) => ({
          ...prev,
          place: { id: null, name: null },
        }));
        break;
      default:
        break;
    }
  };

  const renderFilterContent = () => {
    switch (filter.key) {
      case "type":
        return (
          <TypeFilter
            tempType={tempFilters.type}
            setTempType={(value) =>
              setTempFilters((prev) => ({ ...prev, type: value }))
            }
          />
        );
      case "price":
        return (
          <PriceFilter
            tempPrice={tempFilters.price}
            setTempPrice={(value) =>
              setTempFilters((prev) => ({ ...prev, price: value }))
            }
          />
        );
      case "area":
        return (
          <AreaFilter
            tempArea={tempFilters.area}
            setTempArea={(value) =>
              setTempFilters((prev) => ({ ...prev, area: value }))
            }
          />
        );
      case "kind":
        return (
          <KindFilter
            tempKind={tempFilters.kind}
            setTempKind={(value) =>
              setTempFilters((prev) => ({ ...prev, kind: value }))
            }
          />
        );
      case "crop":
        return (
          <CropFilter
            tempCrop={tempFilters.crop}
            setTempCrop={(value) =>
              setTempFilters((prev) => ({ ...prev, crop: value }))
            }
          />
        );
      case "place":
        return (
          <PlaceFilter
            tempPlace={tempFilters.place}
            setTempPlace={(value) =>
              setTempFilters((prev) => ({ ...prev, place: value }))
            }
          />
        );
      default:
        return <div>잘못된 필터입니다.</div>;
    }
  };
  return (
    <div className="bg-white rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.08)] p-5 min-w-[380px]">
      <div className="flex justify-between">
        <div className="flex items-center gap-[5px]">
          <h2 className="text-lg font-extrabold">{filter.label}</h2>
          {filter.key === "place" && <Image src={InfoIcon} alt="정보" />}
        </div>
        {filter.key === "place" && (
          <Link
            href={"#"}
            className="text-gray-700 border-b border-gray-700 typo-body-1-m h-5.5"
          >
            내 장소 편집
          </Link>
        )}
      </div>

      <div className="flex flex-col mb-6">{renderFilterContent()}</div>
      <div className="flex justify-between items-center gap-2 text-sm border-t border-gray-400 pt-[10px]">
        <button
          type="button"
          className="flex items-center gap-[4px]"
          onClick={handleReset}
        >
          <span className="text-gray-700">초기화</span>
          <Image src={ResetIcon} alt="초기화" />
        </button>
        <button
          className="bg-primary text-white px-[14px] py-[7px] rounded-lg cursor-pointer"
          onClick={handleApply}
        >
          적용
        </button>
      </div>
    </div>
  );
}
