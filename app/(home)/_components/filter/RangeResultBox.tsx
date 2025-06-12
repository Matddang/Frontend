export default function RangeResultBox({
  title,
  maxValue,
  value,
  unit,
  label,
  subLabel,
}: {
  title: string;
  maxValue?: number;
  value: number;
  unit?: number;
  label: string;
  subLabel?: string;
}) {
  const displayValue = unit ? value / unit : value;
  const isMax = maxValue === value;
  const formattedValue = displayValue.toLocaleString() + (isMax ? "+" : "");

  return (
    <div className="flex flex-col gap-[6px]">
      <div className="flex justify-between typo-sub-title-m">
        <span className="text-primary">{title}</span>
        <span className="text-gray-900">{subLabel}</span>
      </div>
      <div className="flex justify-between bg-gray-100 border border-gray-400 rounded-[10px] px-5 py-3">
        <span>{formattedValue}</span>
        <span>{label}</span>
      </div>
    </div>
  );
}
