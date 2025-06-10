import ProcessForm from "@/components/process/ProcessForm";
import { StepProps, STEPS_LABEL } from "@/types/typetest";
import Image from "next/image";
import { useState } from "react";
import Important1 from "@/assets/images/important-1.svg";
import Important2 from "@/assets/images/important-2.svg";
import Important3 from "@/assets/images/important-3.svg";
import Important4 from "@/assets/images/important-4.svg";
import Important5 from "@/assets/images/important-5.svg";
import Important6 from "@/assets/images/important-6.svg";
import CheckIcon from "@/assets/images/check-primary.svg";

export default function Important({ nextStep }: StepProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const title = {
    title:
      "농업의 목적을 농지를 고를 때, 가장 중요하게 생각하는 요소는 무엇인가요?.",
    subTitle: "귀촌까지 고려하고 계시다면, 목적에 맞는 농지를 추천해드릴게요.",
  };

  const important_types = [
    ["유통에 유리한 조건", Important1],
    ["주변의 자연환경, 경관", Important2],
    ["교육, 의료 인프라", Important3],
    ["관리의 편의성", Important4],
    ["집과의 가까운 거리", Important5],
    ["교통 편의성", Important6],
  ];

  const handleClick = (value: string) => {
    if (selected.includes(value)) {
      setSelected(() => [...selected].filter((v) => v !== value));
    } else {
      if (selected.length === 3) return;
      setSelected((prev) => [...prev, value]);
    }
  };

  return (
    <ProcessForm
      currentStep={4}
      stepCount={8}
      title={title}
      nextStep={() => nextStep(STEPS_LABEL.PURPOSE, selected)}
    >
      <div className="flex flex-col gap-[8px]">
        <span className="text-[12px] text-gray-700">
          최대 3개까지 선택할 수 있습니다.
        </span>
        <div className="grid grid-cols-3 gap-[20px]">
          {important_types.map((value, i) => (
            <div
              key={i}
              className={`
                 p-[20px] w-[233px] h-[181px] rounded-[11px] flex flex-col gap-[26px] items-center justify-center cursor-pointer relative
                ${
                  selected.includes(important_types[i][0])
                    ? "bg-primary-light border-primary"
                    : "bg-gray-100 border-gray-400"
                }
              `}
              onClick={() => handleClick(value[0])}
            >
              <Image src={value[1]} alt="" />
              <span className="text-black text-[16px]">{value[0]}</span>
              {selected.includes(important_types[i][0]) && (
                <Image
                  src={CheckIcon}
                  alt="check"
                  className="absolute top-[20px] right-[20px]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </ProcessForm>
  );
}
