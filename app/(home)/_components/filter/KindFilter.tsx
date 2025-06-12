import Button from "@/components/common/Button";
import Image from "next/image";
import UnCheckedIcon from "@/assets/images/check-off.svg";
import CheckedIcon from "@/assets/images/check-on.svg";

interface TypeFilterProps {
  tempKind: ("paddy" | "field" | "orchard")[];
  setTempKind: (value: ("paddy" | "field" | "orchard")[]) => void;
}

const ALL_KINDS: ("paddy" | "field" | "orchard")[] = [
  "paddy",
  "field",
  "orchard",
];

export default function KindFilter({ tempKind, setTempKind }: TypeFilterProps) {
  const toggleKind = (kind: "paddy" | "field" | "orchard") => {
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
    <div className="flex flex-col">
      <div className="flex gap-[13px]">
        <Button
          text="답(논)"
          onClick={() => toggleKind("paddy")}
          isActive={tempKind.includes("paddy")}
        />
        <Button
          text="전(밭)"
          onClick={() => toggleKind("field")}
          isActive={tempKind.includes("field")}
        />
        <Button
          text="과수원"
          onClick={() => toggleKind("orchard")}
          isActive={tempKind.includes("orchard")}
        />
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
