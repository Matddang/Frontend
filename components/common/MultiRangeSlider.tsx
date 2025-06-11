interface LabelItem {
  value: number;
  label: string;
}

interface MultiRangeSliderProps {
  labels: LabelItem[];
  step: number;
  minVal: number;
  maxVal: number;
  onChange: (min: number, max: number) => void;
}

export default function MultiRangeSlider({
  labels,
  step,
  minVal,
  maxVal,
  onChange,
}: MultiRangeSliderProps) {
  const min = labels[0].value;
  const max = labels[labels.length - 1].value;

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - step);
    onChange(value, maxVal);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + step);
    onChange(minVal, value);
  };

  return (
    <div className="py-2">
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
              left: `${((minVal - min) / max - min) * 100}%`,
              width: `${((maxVal - minVal) / max - min) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* 라벨 */}
      <div className="flex justify-between text-sm text-gray-800">
        {labels.map((item) => (
          <div key={item.value}>{item.label}</div>
        ))}
      </div>
    </div>
  );
}
