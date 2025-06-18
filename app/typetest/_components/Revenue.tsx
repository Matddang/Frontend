import ListSelector from "@/components/process/_components/ListSelector";
import ProcessForm from "@/components/process/ProcessForm";
import { StepProps, STEPS_LABEL } from "@/types/typetest";
import { useState } from "react";

export default function Revenue({ nextStep, prevStep }: StepProps) {
  const [revenue, setRevenue] = useState<string | string[]>("");

  const title = {
    title: "농지를 통한 수익은 어느 정도를기대하고 계신가요?",
    subTitle: "마지막 질문이에요!",
  };

  const revenue_types = [
    "용돈벌이 정도면 괜찮아요",
    "부업 도전!",
    "자립을 꿈꿔요",
    "성장가능성이 중요해요",
    "프로 경영인이 되고 싶어요",
  ];

  const revenue_ex = [
    "연 수익 1,000만 원 이하",
    "소농, 연 수익 1,000만~3,000만 원",
    "중농, 연 수익 3,000만~7,000만 원",
    "중대농, 연 수익 7,000만~1.5억 원",
    "대농, 연 수익 1.5억 원 이상",
  ];

  return (
    <ProcessForm
      currentStep={7}
      stepCount={8}
      title={title}
      nextStep={() => nextStep(STEPS_LABEL.REVENUE, revenue)}
      disable={revenue === ""}
      prevStep={prevStep}
    >
      <ListSelector
        list={revenue_types}
        subList={revenue_ex}
        selected={revenue}
        setSelected={setRevenue}
      />
    </ProcessForm>
  );
}
