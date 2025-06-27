import Image from "next/image";
import CloseIcon from "@/assets/images/close.svg";
import React from "react";

interface TooltipProps {
  left: number;
  title: string;
  content: string;
  onClose: () => void;
}

export default function Tooltip({
  left,
  title,
  content,
  onClose,
}: TooltipProps) {
  const withLineBreaks = (text: string) => {
    return text.split("\n").map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div
      className={`absolute left-[${left}px] top-[53px] gap-2 flex items-start mt-6 px-4 py-[14px] bg-primary-light rounded-[16px] z-100 border-[2px] border-primary-hover`}
    >
      <div className="flex-1 w-full flex flex-col gap-[6px] whitespace-normal">
        <p className="typo-body-1-b">{title}</p>
        <p className="typo-14-r">{withLineBreaks(content)}</p>
      </div>
      <button onClick={onClose}>
        <Image src={CloseIcon} alt="닫기" width={24} />
      </button>
    </div>
  );
}
