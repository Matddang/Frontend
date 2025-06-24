import Image from "next/image";
import CloseIcon from "@/assets/images/close.svg";

interface PlaceTooltipProps {
  onClose: () => void;
}

export default function PlaceTooltip({ onClose }: PlaceTooltipProps) {
  return (
    <div className="absolute left-0 gap-2 flex items-start mt-6 w-[323px] px-4 py-[14px] bg-primary-light rounded-[16px] z-100">
      <div className="flex-1 w-full flex flex-col gap-[6px] whitespace-normal">
        <p className="typo-body-1-b">내 장소 기반 필터는 무엇인가요?</p>
        <p className="typo-14-r">
          내가 기존에 살고 있는 거주지, 농사 짓고 있는 농지와 가까운 거리 순으로
          매물을 추천해 드리는 필터입니다.
          <br />
          등록하신 장소 중에 하나만 선택해 주세요!
        </p>
      </div>
      <button onClick={onClose}>
        <Image src={CloseIcon} alt="닫기" width={24} height={24} />
      </button>
    </div>
  );
}
