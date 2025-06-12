import Image from "next/image";
import TypeFilter from "./TypeFilter";
import ResetIcon from "@/assets/images/reset.svg";
import { useFilterStore } from "@/store/FilterStore";
import { useEffect, useState } from "react";
import PriceFilter from "./PriceFilter";
import { PRICE_FILTER } from "@/constants/filterOptions";

interface FilterModalProps {
  filter: { key: string; label: string };
  onApply: (value: string | number | null) => void;
}

export default function FilterModal({ filter, onApply }: FilterModalProps) {
  const { type, price, setType, setPrice } = useFilterStore();
  const [tempFilters, setTempFilters] = useState({
    type,
    price,
  });

  useEffect(() => {
    setTempFilters({ type, price });
  }, [type, price]);

  const handleApply = () => {
    setType(tempFilters.type);
    setPrice(tempFilters.price);
    onApply(tempFilters.price.min);
  };

  const handleReset = () => {
    setType(null);
    setPrice({
      min: PRICE_FILTER[0].value,
      max: PRICE_FILTER[PRICE_FILTER.length - 1].value,
    });
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
        return <div></div>;
      case "kind":
        return <div></div>;
      case "crop":
        return <div></div>;
      default:
        return <div>잘못된 필터입니다.</div>;
    }
  };
  return (
    <div className="bg-white rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.08)] p-5 min-w-[380px]">
      <h2 className="text-lg font-extrabold">{filter.label}</h2>
      <div className="flex flex-col my-6">{renderFilterContent()}</div>
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
