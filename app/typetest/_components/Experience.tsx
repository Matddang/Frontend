import ListSelector from "@/components/process/_components/ListSelector";
import ProcessForm from "@/components/process/ProcessForm";
import { useUserStore } from "@/store/UserStore";
import { StepProps, STEPS_LABEL } from "@/types/typetest";
import { useState } from "react";

export default function Experience({ nextStep }: StepProps) {
  const [experience, setExperience] = useState<string | string[]>("");
  const { name } = useUserStore();

  const title = {
    title: "농업 경험, 어느 정도 있으신가요?",
    subTitle: `안녕하세요 ${name || ""}님, 간단한 정보를 먼저 알려주세요.`,
  };

  const experience_types = [
    "완전 처음이에요",
    "주말 농장이나 체험 경험이 있어요",
    "실제로 농사를 지어본 경험이 있어요",
    "현재 농업으로 수익을 내고 있어요",
  ];

  return (
    <ProcessForm
      currentStep={1}
      stepCount={8}
      title={title}
      nextStep={() => nextStep(STEPS_LABEL.EXPERIENCE, experience)}
      disable={experience === ""}
    >
      <ListSelector
        list={experience_types}
        selected={experience}
        setSelected={setExperience}
      />
    </ProcessForm>
  );
}
