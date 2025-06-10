import Image from "next/image";
import PrevIcon from "@/assets/images/arrow-left.svg";

export default function StepIndicator({
  currentStep,
  stepCount,
}: {
  currentStep: number;
  stepCount: number;
}) {
  const percentage = (currentStep / stepCount) * 100;

  return (
    <div className="flex flex-col gap-[24px] justify-between">
      <div className="flex justify-between">
        <Image
          src={PrevIcon}
          alt="prev"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <span className="text-[16px] text-gray-700 cursor-pointer">
          건너뛰기
        </span>
      </div>
      <div className="flex flex-col gap-[4px] items-end">
        <div className="w-full h-[3.58px] bg-gray-300 relative">
          <div
            className="absolute top-0 left-0 h-[3.58px] bg-primary transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="font-normal text-[12px] text-gray-700">
          {currentStep}/{stepCount}
        </span>
      </div>
    </div>
  );
}
