import Button from "@/components/common/Button";
import Image from "next/image";
import UnCheckedIcon from "@/assets/images/check-off.svg";
import CheckedIcon from "@/assets/images/check-on.svg";
import { KIND_FILTER } from "@/constants/filterOptions";

interface TypeFilterProps {
  tempKind: string[];
  setTempKind: (value: string[]) => void;
}

const ALL_KINDS = ["답_답", "전_전", "과수원"];

export default function KindFilter({ tempKind, setTempKind }: TypeFilterProps) {
  const toggleKind = (kind: string) => {
    if (tempKind.includes(kind)) {
      setTempKind(tempKind.filter((k) => k !== kind));
    } else {
      setTempKind([...tempKind, kind]);
    }
  };

  const isAllSelected = ALL_KINDS.every((kind) => tempKind.includes(kind));

  const toggleAll = () => {
    if (isAllSelected) {
      setTempKind([]); // 모두 해제
    } else {
      setTempKind(ALL_KINDS); // 모두 선택
    }
  };

  return (
    <div className="flex flex-col mt-6">
      <div className="flex gap-[13px]">
        {Object.entries(KIND_FILTER).map(([key, label]) => (
          <Button
            key={key}
            text={label}
            onClick={() => toggleKind(key)}
            isActive={tempKind.includes(key)}
          />
        ))}
      </div>
      <button className="flex items-align gap-[6px] mt-6" onClick={toggleAll}>
        <Image
          src={isAllSelected ? CheckedIcon : UnCheckedIcon}
          alt={isAllSelected ? "전체 선택됨" : "전체 선택 안 됨"}
        />
        <span>모두 선택</span>
      </button>
    </div>
  );
}
