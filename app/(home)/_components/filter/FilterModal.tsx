import Image from "next/image";
import TypeFilter from "./TypeFilter";
import ResetIcon from "@/assets/images/reset.svg";

interface FilterModalProps {
  filter: { key: string; label: string };
  onApply: () => void;
  onClose: () => void;
}

export default function FilterModal({ filter, onApply }: FilterModalProps) {
  const renderFilterContent = () => {
    switch (filter.key) {
      case "type":
        return <TypeFilter label={filter.label} />;
      case "price":
        return <div>{filter.label}</div>;
      case "area":
        return <div>{filter.label}</div>;
      case "kind":
        return <div>{filter.label}</div>;
      case "crop":
        return <div>{filter.label}</div>;
      default:
        return <div>잘못된 필터입니다.</div>;
    }
  };
  return (
    <div className="bg-white rounded-[20px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.08)] p-5 min-w-[380px]">
      <div className="mb-3">{renderFilterContent()}</div>
      <div className="flex justify-between items-center gap-2 text-sm border-t border-gray-400 pt-[10px]">
        <button
          type="button"
          className="flex items-center gap-[4px]"
          onClick={() => alert("초기화")}
        >
          <span className="text-gray-700">초기화</span>
          <Image src={ResetIcon} alt="초기화" />
        </button>
        <button
          className="bg-primary text-white px-[14px] py-[7px] rounded-lg cursor-pointer"
          onClick={onApply}
        >
          적용
        </button>
      </div>
    </div>
  );
}
