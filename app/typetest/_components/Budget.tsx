import ProcessForm from "@/components/process/ProcessForm";
import { StepProps, STEPS_LABEL } from "@/types/typetest";
import { useCallback, useEffect, useState } from "react";

export default function Budget({ nextStep, prevStep }: StepProps) {
  const fixedMinPrice = 0;
  const fixedMaxPrice = 30000;
  const priceGap = 1000;

  const [minBudget, setMinBudget] = useState<number | string>("");
  const [maxBudget, setMaxBudget] = useState<number | string>("");
  const [rangeMinPercent, setRangeMinPercent] = useState(0);
  const [rangeMaxPercent, setRangeMaxPercent] = useState(100);

  const title = {
    title: "구할 농지에 대한 예산을 알려주세요.",
    subTitle: "얼마의 예산을 투자하실 수 있나요?",
  };

  const prcieRangeMinValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMinBudget(parseInt(e.target.value));
  };

  const prcieRangeMaxValueHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setMaxBudget(parseInt(e.target.value));
  };

  const twoRangeHandler = useCallback(() => {
    if (Number(maxBudget) - Number(minBudget) < priceGap) {
      if (minBudget === "") {
        setMinBudget(0);
      } else if (maxBudget === "") {
        setMaxBudget(30000);
      } else {
        setMaxBudget((rangeMinValue) => Number(rangeMinValue) + priceGap);
        setMinBudget((rangeMaxValue) => Number(rangeMaxValue) - priceGap);
      }
    } else {
      setRangeMinPercent(() => (Number(minBudget) / fixedMaxPrice) * 100);
      setRangeMaxPercent(() => 100 - (Number(maxBudget) / fixedMaxPrice) * 100);
    }
  }, [maxBudget, minBudget]);

  useEffect(() => {
    if (minBudget !== "" && maxBudget !== "") twoRangeHandler();
  }, [minBudget, maxBudget, twoRangeHandler]);

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
      disable={minBudget === "" && maxBudget === ""}
      prevStep={prevStep}
    >
      <div className="flex w-[343px] flex-col gap-[48px] m-auto">
        <div className="flex flex-col gap-[8px]">
          <div className="h-[24px]">
            <div className="h-[4px] rounded-[5px] bg-gray-400 relative">
              <div
                className="h-[4px] absolute"
                style={{
                  left: `calc(${rangeMinPercent}% + 12px)`,
                  right: `calc(${rangeMaxPercent}% + 12px)`,
                  background:
                    "linear-gradient(98deg, #D6FF95 -18.87%, #39B94C 58.42%)",
                }}
              />
            </div>
            <div className="relative">
              <input
                type="range"
                className="absolute top-[-5px] w-full h-[7px] appearance-none bg-transparent pointer-events-none thumb-custom"
                min={fixedMinPrice}
                max={fixedMaxPrice - priceGap}
                step="1000"
                value={minBudget === "" ? fixedMinPrice : minBudget}
                onChange={(e) => {
                  prcieRangeMinValueHandler(e);
                  twoRangeHandler();
                }}
              />
              <input
                type="range"
                className="absolute top-[-5px] w-full h-[7px] appearance-none bg-transparent pointer-events-none thumb-custom"
                min={0 + priceGap}
                max={fixedMaxPrice}
                step="1000"
                value={maxBudget === "" ? fixedMaxPrice : maxBudget}
                onChange={(e) => {
                  prcieRangeMaxValueHandler(e);
                  twoRangeHandler();
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
                  {Number(minBudget) % 10000
                    ? `${Number(minBudget) % 10000}천`
                    : ""}
                </span>
              )}
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                min={0}
                className="text-[18px] text-gray-1300 font-semibold bg-gray-100 border-[1px] border-gray-400 rounded-[10px] pl-[20px] pr-[76px] py-[12px] w-[343px] focus:outline-none"
                value={minBudget}
                onChange={(e) => setMinBudget(Number(e.target.value))}
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
                  {Number(maxBudget) % 10000
                    ? `${Number(maxBudget) % 10000}천`
                    : ""}
                </span>
              )}
            </div>
            <div className="relative w-fit">
              <input
                type="number"
                min={0}
                className="text-[18px] text-gray-1300 font-semibold bg-gray-100 border-[1px] border-gray-400 rounded-[10px] pl-[20px] pr-[76px] py-[12px] w-[343px] focus:outline-none"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
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
