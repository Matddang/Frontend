import MultiRangeSlider from "@/components/common/MultiRangeSlider";
import { PRICE_FILTER } from "@/constants/filterOptions";
import RangeResultBox from "./RangeResultBox";

interface PriceFilterProps {
  tempPrice: { min: number | null; max: number | null };
  setTempPrice: (price: { min: number | null; max: number | null }) => void;
}

export default function PriceFilter({
  tempPrice,
  setTempPrice,
}: PriceFilterProps) {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <MultiRangeSlider
        filters={PRICE_FILTER}
        step={10000000}
        minVal={tempPrice.min ?? PRICE_FILTER[0].value}
        maxVal={tempPrice.max ?? PRICE_FILTER[PRICE_FILTER.length - 1].value}
        onChange={(min, max) => {
          setTempPrice({ min, max });
        }}
      />
      <div className="flex flex-col gap-4">
        <RangeResultBox
          title="최소"
          value={tempPrice.min ?? PRICE_FILTER[0].value}
          unit={10000}
          label="만 원"
        />
        <RangeResultBox
          title="최대"
          maxValue={PRICE_FILTER[PRICE_FILTER.length - 1].value}
          value={tempPrice.max ?? PRICE_FILTER[PRICE_FILTER.length - 1].value}
          unit={10000}
          label="만 원"
        />
      </div>
    </div>
  );
}
