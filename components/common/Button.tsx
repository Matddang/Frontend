interface ButtonProps {
  text: string;
  onClick: () => void;
  isActive?: boolean;
  activeColor?: [string, string, string]; // border, background, text
}

export default function Button({
  text,
  onClick,
  isActive,
  activeColor = ["border-primary", "bg-white", "text-primary"],
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full py-3 rounded-[10px] border-[2px] transition-colors duration-200 text-lg
        ${isActive ? `${activeColor.join(" ")}` : "border-gray-400"}`}
    >
      {text}
    </button>
  );
}
