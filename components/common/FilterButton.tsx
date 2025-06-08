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
            ? "border-primary bg-primary-light text-primary"
            : "border-transparent hover:border-primary hover:bg-primary-light hover:text-primary"
        }`}
    >
      {text}
    </button>
  );
}
