import ProcessForm from "@/components/process/ProcessForm";
import { StepProps, STEPS_LABEL } from "@/types/typetest";
import { useEffect, useState } from "react";

export default function Budget({ nextStep }: StepProps) {
  const [minBudget, setMinBudget] = useState<string | number>("");
  const [maxBudget, setMaxBudget] = useState<string | number>("");

  const title = {
    title: "구할 농지에 대한 예산을 알려주세요.",
    subTitle: "얼마의 예산을 투자하실 수 있나요?",
  };

  useEffect(() => {
    setMinBudget(0);
    setMaxBudget(0);
  }, []);

  const getHandlePosition = (value: number | "") => {
    const max = 30000;
    const val = typeof value === "number" ? value : 0;
    const percent = Math.min(Math.max(val / max, 0), 1);

    if (Number(maxBudget) === 30000) {
      return `${percent * 100}%`;
    }

    if (Number(maxBudget) >= 20000) {
      return `${percent * 100}% - 4%`;
    }

    return `${percent * 100}% - 1%`;
  };

  return (
    <ProcessForm
      currentStep={3}
      stepCount={8}
      title={title}
      nextStep={() =>
        nextStep(STEPS_LABEL.BUDGET, {
          min: Number(minBudget),
          max: Number(maxBudget),
        })
      }
    >
      <div className="flex w-[343px] flex-col gap-[48px] m-auto">
        <div className="flex flex-col gap-[8px]">
          <div className="h-[24px] flex flex-col justify-center">
            <div className="relative">
              <div className="w-full h-[4px] rounded-[5px] bg-gray-400 relative">
                <div
                  className="w-full h-full absolute top-0"
                  style={{
                    left: getHandlePosition(Number(minBudget)),
                    width: `calc(${getHandlePosition(
                      Number(maxBudget),
                    )} - ${getHandlePosition(Number(minBudget))})`,
                    background:
                      "linear-gradient(98deg, #D6FF95 -18.87%, #39B94C 58.42%)",
                  }}
                />
              </div>
              <div
                className="w-[24px] h-[24px] bg-white rounded-[50%] border-[1px] border-gray-400 absolute bottom-[50%] transform translate-y-[50%] cursor-pointer"
                style={{
                  left: `calc(${getHandlePosition(Number(minBudget))}) - 24px`,
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.08)",
                }}
              />
              <div
                className="w-[24px] h-[24px] bg-white rounded-[50%] border-[1px] border-gray-400 absolute bottom-[50%] transform translate-y-[50%] cursor-pointer"
                style={{
                  left: `calc(${getHandlePosition(Number(maxBudget))}) - 24px`,
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.08)",
                }}
              />
            </div>
          </div>

          <div className="flex justify-between text-[14px] text-gray-800">
            <span>0</span>
            <span>1억</span>
            <span>2억</span>
            <span>3억 이상</span>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex flex-col gap-[6px]">
            <div className="flex justify-between">
              <span className="text-[14px] text-primary">최저</span>
              {Number(minBudget) >= 10000 && (
                <span className="text-[14px] text-gray-900">
                  {Math.floor(Number(minBudget) / 10000)}억{" "}
                  {Number(minBudget) % 10000}천
                </span>
              )}
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                min={0}
                className="text-[18px] text-gray-1300 font-semibold bg-gray-100 border-[1px] border-gray-400 rounded-[10px] pl-[20px] pr-[76px] py-[12px] w-[343px] focus:outline-none"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
              />
              <span className="text-[18px] text-gray-1300 font-semibold absolute top-[50%] right-[20px] transform translate-y-[-50%]">
                만 원
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className="flex justify-between">
              <span className="text-[14px] text-primary">최대</span>
              {Number(maxBudget) >= 10000 && (
                <span className="text-[14px] text-gray-900">
                  {Math.floor(Number(maxBudget) / 10000)}억{" "}
                  {Number(maxBudget) % 10000}천
                </span>
              )}
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                min={0}
                className="text-[18px] text-gray-1300 font-semibold bg-gray-100 border-[1px] border-gray-400 rounded-[10px] pl-[20px] pr-[76px] py-[12px] w-[343px] focus:outline-none"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
              />
              <span className="text-[18px] text-gray-1300 font-semibold absolute top-[50%] right-[20px] transform translate-y-[-50%]">
                만 원
              </span>
            </div>
          </div>
        </div>
      </div>
    </ProcessForm>
  );
}
