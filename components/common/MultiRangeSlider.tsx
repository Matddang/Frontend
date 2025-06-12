import React from "react";

interface FilterItem {
  value: number;
  label: string;
}

interface MultiRangeSliderProps {
  filters: FilterItem[];
  step: number;
  minVal: number;
  maxVal: number;
  onChange: (min: number, max: number) => void;
}

export default function MultiRangeSlider({
  filters,
  step,
  minVal,
  maxVal,
  onChange,
}: MultiRangeSliderProps) {
  const min = filters[0].value;
  const max = filters[filters.length - 1].value;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - step);
    onChange(value, maxVal);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + step);
    onChange(minVal, value);
  };

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  return (
    <div className="pt-1 relative">
      {/* 슬라이더 */}
      <div className="relative h-6">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={handleMinChange}
          className="absolute w-full pointer-events-none appearance-none h-1 bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto z-10"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={handleMaxChange}
          className="absolute w-full pointer-events-none appearance-none h-1 bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto z-10"
        />

        {/* 색상 범위 */}
        <div className="relative h-1 bg-gray-400 rounded">
          <div
            className="absolute h-1 bg-primary rounded"
            style={{
              left: `${getPercent(minVal)}%`,
              width: `${getPercent(maxVal) - getPercent(minVal)}%`,
            }}
          />
        </div>
      </div>

      {/* 라벨 */}
      <div className="relative h-4">
        {filters.map((item, index) => {
          const percent = getPercent(item.value);

          let positionClass = "-translate-x-1/2";
          if (index === 0) positionClass = "translate-x-1/2";
          if (index === filters.length - 1) positionClass = "-translate-x-full";

          return (
            <div
              key={item.value}
              className={`absolute text-sm text-gray-800 ${positionClass}`}
              style={{
                left: `${percent}%`,
              }}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
