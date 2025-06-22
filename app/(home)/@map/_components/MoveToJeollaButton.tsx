interface MoveToJeollaButtonProps {
  onClick: () => void;
}

export default function MoveToJeollaButton({
  onClick,
}: MoveToJeollaButtonProps) {
  return (
    <div className="group absolute z-10 bottom-[110px] left-1/2 -translate-x-1/2 flex flex-col items-center">
      <button
        onClick={onClick}
        className="relative typo-sub-head-sb px-[34px] py-3 w-fit rounded-[119px] border border-[2px] border-primary bg-primary-light shadow-[0_0_20px_rgba(0,0,0,0.08)]"
      >
        전라남도 지도로 이동하기
        <p className="absolute bottom-full mb-[24px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[16px] bg-primary-light px-4 py-[14px] typo-body-1-m opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
          맞땅은 지금 전라도 지역 매물부터 소개하고 있어요 🙂
          <br />
          전라도 지도로 이동하려면 아래 버튼을 눌러주세요!
        </p>
      </button>
    </div>
  );
}
