"use client";

interface FilterButtonProps {
  text: string;
  onClick: () => void;
  isActive?: boolean;
}

export default function FilterButton({
  text,
  onClick,
  isActive = false,
}: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full border transition-colors duration-200 outline-none text-[18px] cursor-pointer
        ${
          isActive
            ? "bg-[#11C891] text-white"
            : "border-transparent hover:border-[#11C891] hover:bg-[#EFFFF4] hover:text-[#11C891]"
        }`}
    >
      {text}
    </button>
  );
}
