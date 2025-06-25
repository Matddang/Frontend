import Button from "@/components/common/Button";
import { TYPE_FILTER } from "@/constants/filterOptions";

interface TypeFilterProps {
  tempType: string | null;
  setTempType: (value: string | null) => void;
}
export default function TypeFilter({ tempType, setTempType }: TypeFilterProps) {
  return (
    <div className="flex gap-[21px] mt-6">
      {Object.entries(TYPE_FILTER).map(([key, label]) => (
        <Button
          key={key}
          text={label}
          onClick={() => setTempType(key)}
          isActive={tempType === key}
        />
      ))}
    </div>
  );
}
