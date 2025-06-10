import ProcessForm from "@/components/process/ProcessForm";
import { StepProps, STEPS_LABEL } from "@/types/typetest";
import AddIcon from "@/assets/images/add-gray.svg";
import Image from "next/image";

export default function AddLoaction({ nextStep }: StepProps) {
  const title = {
    title: "내 장소를 등록하고, 가까운 농지를 추천받아보세요.",
    subTitle: "해당 장소와 가까운 농지를 추천해 드릴게요.",
  };

  return (
    <ProcessForm
      currentStep={6}
      stepCount={8}
      title={title}
      nextStep={() => nextStep(STEPS_LABEL.LOCATION, "")}
      isLocation
    >
      <button className="w-full h-[64px] flex gap-[10px] items-center bg-gray-100 border-[1px] border-gray-400 rounded-[10px] py-[15px] px-[10px] cursor-pointer">
        <Image src={AddIcon} alt="add" />
        <span className="text-[18px] font-semibold text-black">
          장소 추가하기
        </span>
      </button>
    </ProcessForm>
  );
}
