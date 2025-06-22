import ListSelector from "@/components/process/_components/ListSelector";
import ProcessForm from "@/components/process/ProcessForm";
import { useUserStore } from "@/store/UserStore";
import { StepProps, STEPS_LABEL } from "@/types/typetest";
import { useState } from "react";

export default function Purpose({ nextStep, prevStep }: StepProps) {
  const [purpose, setPurpose] = useState<string[] | string>([]);
  const { name } = useUserStore();

  const title = {
    title: "농업의 목적을 알려주세요.",
    subTitle: `${name || ""}님의 농업목적에 맞는 농지를 추천해드릴게요.`,
  };

  const purpose_types = [
    "농사를 통해 수익을 내고 싶어요.",
    "은퇴 후 조용하고 편안한 삶을 살고 싶어요.",
    "가족/아이들과 건강한 삶을 살고 싶어요.",
    "단순한 취미나 체험으로 시작하고 싶어요.",
  ];

  return (
    <ProcessForm
      currentStep={2}
      stepCount={8}
      title={title}
      nextStep={() => nextStep(STEPS_LABEL.PURPOSE, purpose)}
      disable={purpose.length === 0}
      prevStep={prevStep}
    >
      <ListSelector
        list={purpose_types}
        selected={purpose}
        setSelected={setPurpose}
        limit
      />
    </ProcessForm>
  );
}
