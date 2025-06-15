"use client";

interface FilterButtonProps {
  text: string;
  onClick: () => void;
  isActive?: boolean;
  hasValue?: boolean;
}

export default function FilterButton({
  text,
  onClick,
  isActive = false,
  hasValue = false,
}: FilterButtonProps) {
  const baseClass =
    "px-4 py-2 rounded-full border transition-colors duration-200 outline-none text-[18px] cursor-pointer";
  const activeClass = "border-primary bg-primary-light text-primary";
  const hasValueClass = "bg-primary text-white";
  const defaultClass =
    "border-transparent hover:border-primary hover:bg-primary-light hover:text-primary";

  const className = `${baseClass} ${
    isActive ? activeClass : hasValue ? hasValueClass : defaultClass
  }`;

  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}
