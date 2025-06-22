import MultiRangeSlider from "@/components/common/MultiRangeSlider";
import { AREA_FILTER } from "@/constants/filterOptions";
import RangeResultBox from "./RangeResultBox";

interface AreaFilterProps {
  tempArea: { min: number; max: number };
  setTempArea: (area: { min: number; max: number }) => void;
}

export default function AreaFilter({ tempArea, setTempArea }: AreaFilterProps) {
  return (
    <div className="flex flex-col gap-6 mt-6">
      <MultiRangeSlider
        filters={AREA_FILTER}
        step={100}
        minVal={tempArea.min ?? AREA_FILTER[0].value}
        maxVal={tempArea.max ?? AREA_FILTER[AREA_FILTER.length - 1].value}
        onChange={(min, max) => {
          setTempArea({ min, max });
        }}
      />
      <div className="flex flex-col gap-4">
        <RangeResultBox
          title="최소"
          value={tempArea.min ?? AREA_FILTER[0].value}
          label="평"
        />
        <RangeResultBox
          title="최대"
          maxValue={AREA_FILTER[AREA_FILTER.length - 1].value}
          value={tempArea.max ?? AREA_FILTER[AREA_FILTER.length - 1].value}
          label="평"
        />
      </div>
    </div>
  );
}
