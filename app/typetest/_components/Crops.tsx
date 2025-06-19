import ListSelector from "@/components/process/_components/ListSelector";
import ProcessForm from "@/components/process/ProcessForm";
import { StepProps, STEPS_LABEL } from "@/types/typetest";
import { useState } from "react";

export default function Crops({ nextStep, prevStep }: StepProps) {
  const [crops, setCrops] = useState<string | string[]>("");

  const title = {
    title: "농지를 구하면 키우고 싶은 작물이 있나요?",
    subTitle: "키우고 싶은 작물을 골라주세요.",
  };

  const crops_types = [
    "고수익 작물",
    "간단한 텃밭 작물",
    "아이들과 함께 키울 수 있는 작물",
    "관리가 쉬운 작물",
    "현재 시장 트렌드, 수요가 많은 작물",
  ];

  const crops_ex = [
    "약용작물, 프리미엄 작물",
    "허브, 채소류",
    "옥수수, 과일류",
    "감자, 고구마류",
    "시장 데이터 기반 수요작물",
  ];

  return (
    <ProcessForm
      currentStep={5}
      stepCount={8}
      title={title}
      nextStep={() => nextStep(STEPS_LABEL.CROPS, crops)}
      disable={crops.length === 0}
      prevStep={prevStep}
    >
      <ListSelector
        list={crops_types}
        subList={crops_ex}
        selected={crops}
        setSelected={setCrops}
        limit
      />
    </ProcessForm>
  );
}
