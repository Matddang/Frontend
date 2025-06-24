import { checkTypetest } from "@/services/checkTypetest";
import StepIndicator from "./_components/StepIndicator";

interface ProcessFormProps {
  currentStep: number;
  stepCount: number;
  children: React.ReactNode;
  title: {
    title: string;
    subTitle: string;
  };
  nextStep: () => void;
  isLocation?: boolean;
  isAgreement?: boolean;
  disable?: boolean;
  prevStep?: () => void;
}

export default function ProcessForm({
  currentStep,
  stepCount,
  children,
  title,
  nextStep,
  isLocation,
  isAgreement,
  disable,
  prevStep,
}: ProcessFormProps) {
  const handleCheck = async () => {
    const status = await checkTypetest();
    if (status === 200) nextStep();
  };

  return (
    <div
      className={`min-w-[817px] max-w-[817px] px-[40px] pt-[34px] pb-[70px] mt-[24px] mb-[87px] mx-auto bg-white rounded-[20px] flex flex-col
      ${
        isLocation
          ? "gap-[90px]"
          : isAgreement
          ? "gap-[31.67px]"
          : "gap-[110px]"
      }
    `}
    >
      <div
        className={`w-full flex flex-col
        ${
          isLocation
            ? "gap-[90px]"
            : isAgreement
            ? "gap-[31.67px]"
            : "gap-[60px]"
        }
      `}
      >
        <div className="flex flex-col gap-[40px] justify-between">
          <StepIndicator
            currentStep={currentStep}
            stepCount={stepCount}
            nextStep={nextStep}
            prevStep={prevStep}
          />

          <div className="flex flex-col gap-[4px]">
            <span className="typo-body-1-m text-gray-900">
              {title.subTitle}
            </span>
            <span className="text-[24px] font-bold text-black">
              {title.title}
            </span>
          </div>
        </div>

        {children}
      </div>
      <div className="flex flex-col gap-[20px]">
        {isLocation && (
          <button
            className="w-full h-[51px] rounded-lg bg-white text-primary typo-sub-head-sb cursor-pointer border-[1px] border-primary"
            style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
            onClick={nextStep}
          >
            다음에 할래요
          </button>
        )}
        <button
          className="w-full h-[51px] rounded-lg bg-primary text-white typo-sub-head-sb cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed"
          style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
          onClick={isAgreement ? handleCheck : nextStep}
          disabled={disable}
        >
          {isAgreement ? "유형 결과 확인하기" : "다음"}
        </button>
      </div>
    </div>
  );
}
