import ProcessForm from "@/components/process/ProcessForm";
import { StepProps, STEPS_LABEL } from "@/types/typetest";
import { useState } from "react";
import CheckDefaultIcon from "@/assets/images/check-gray.svg";
import CheckIcon from "@/assets/images/check-primary.svg";
import Image from "next/image";

export default function Agreement({ nextStep, prevStep }: StepProps) {
  const [agree, setAgree] = useState(false);

  const title = {
    title: "마지막으로 김이화님의 위치정보 이용을 승인해 주세요",
    subTitle: "다 왔습니다!",
  };

  return (
    <ProcessForm
      currentStep={8}
      stepCount={8}
      title={title}
      nextStep={() => nextStep(STEPS_LABEL.AGREEMENT, agree)}
      isAgreement
      disable={!agree}
      prevStep={prevStep}
    >
      <div className="flex flex-col gap-[31.67px]">
        <div className="p-[10px] bg-gray-100 flex flex-col gap-[25px]">
          <p className="font-bold text-[16px]">[위치정보 이용 동의]</p>
          <span className="text-[14px] font-medium text-gray-1100">
            본 서비스는 귀하의 정확한 위치정보를 활용하여 맞춤형 콘텐츠 및 주변
            추천 정보를 제공합니다.
            <br />
            &nbsp;&nbsp;•&nbsp;&nbsp;수집 항목: GPS 등으로 수집되는 현재
            위치정보
            <br />
            &nbsp;&nbsp;•&nbsp;&nbsp;이용 목적: 위치 기반 추천 서비스 제공, 주변
            시설 정보 안내
            <br />
            &nbsp;&nbsp;•&nbsp;&nbsp;보유 기간: 수집일로부터 1년 또는 회원 탈퇴
            시까지
            <br />
            &nbsp;&nbsp;•&nbsp;&nbsp;제공 대상: (해당 없음 또는 위탁 업체 명시)
            <br />
            귀하는 위치정보 제공을 거부할 권리가 있으며, 거부 시 일부 서비스
            이용에 제한이 있을 수 있습니다.
          </span>
        </div>
        <div className="flex gap-[6px]">
          {agree ? (
            <Image
              src={CheckIcon}
              alt="check"
              onClick={() => setAgree((prev) => !prev)}
              className="cursor-pointer"
            />
          ) : (
            <Image
              src={CheckDefaultIcon}
              alt="check"
              onClick={() => setAgree((prev) => !prev)}
              className="cursor-pointer"
            />
          )}
          <span
            className={`font-[14px] text-black ${agree ? "font-bold" : ""}`}
          >
            위 내용을 확인하였으며, 위치정보 제공에 동의합니다.
          </span>
        </div>
      </div>
    </ProcessForm>
  );
}
