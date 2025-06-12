import Button from "@/components/common/Button";
import { TYPE_FILTER } from "@/constants/filterOptions";

type TypeKey = keyof typeof TYPE_FILTER | null;

interface TypeFilterProps {
  tempType: TypeKey;
  setTempType: (value: TypeKey) => void;
}
export default function TypeFilter({ tempType, setTempType }: TypeFilterProps) {
  return (
    <div className="flex gap-[21px]">
      {Object.entries(TYPE_FILTER).map(([key, label]) => (
        <Button
          key={key}
          text={label}
          onClick={() => setTempType(key as TypeKey)}
          isActive={tempType === key}
        />
      ))}
    </div>
  );
}
