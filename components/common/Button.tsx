interface ButtonProps {
  text: string;
  onClick: () => void;
  isActive?: boolean;
}
export default function Button({ text, onClick, isActive }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full py-3 rounded-[10px] border-[2px] transition-colors duration-200 text-lg
        ${
          isActive
            ? "border-primary text-primary"
            : "border-gray-400 hover:border-primary hover:text-primary"
        }`}
    >
      {text}
    </button>
  );
}
