interface FilterModalProps {
  filter: { key: string; label: string };
  onApply: () => void;
  onClose: () => void;
}

export default function FilterModal({ filter, onApply }: FilterModalProps) {
  const renderFilterContent = () => {
    switch (filter.key) {
      case "type":
        return <div>{filter.label}</div>;
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
      <div className="flex justify-end gap-2 text-sm">
        <button
          className="bg-[#11C891] text-white px-[14px] py-[7px] rounded-lg hover:bg-[#0fb585] cursor-pointer"
          onClick={onApply}
        >
          적용
        </button>
      </div>
    </div>
  );
}
