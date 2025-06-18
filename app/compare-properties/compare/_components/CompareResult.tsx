import ArrowRight from "@/assets/images/arrow-right-black.svg";
import Image from "next/image";
import InfoIcon from "@/assets/images/info.svg";

type property = {
  id: number;
  price: number;
  type: string;
  area: number;
  address: string;
  distance: string;
};

export default function CompareResult({ selected }: { selected: property[] }) {
  return (
    <div className="flex justify-between">
      {selected.map((value) => (
        <ResultItem key={value.id} />
      ))}
    </div>
  );
}

function ResultItem() {
  const details = [
    {
      key: "type",
      title: "농지 유형",
      value: "과수원",
    },
    {
      key: "price",
      title: "금액",
      value: "4억 3천",
    },
    {
      key: "price_of_area",
      title: "평당 가격",
      value: "3천 8백",
    },
    {
      key: "area",
      title: "면적",
      value: 123,
    },
    {
      key: "revenue",
      title: "예상 수익",
      value: 34000,
    },
    {
      key: "infra",
      title: "인프라",
      value: [
        "거주지1 : 도보 30분",
        "거주지2: 도보 2시간 20분",
        "농지1: 도보 24분",
        "농지1: 도보 24분",
      ],
    },
    {
      key: "crops",
      title: "적합 농산물",
      value: ["포도", "복숭아", "사과"],
    },
  ];

  const formatValue = (
    key: string,
    value: string | string[] | number,
  ): string | React.ReactNode => {
    switch (key) {
      case "price":
        return `매매 ${value}`;
      case "area":
        return `${value}평`;
      case "revenue":
        return `최대 ${value.toLocaleString()}만원`;
      case "infra":
        return Array.isArray(value)
          ? value.map((v, i) => <div key={i}>{v}</div>)
          : "";
      case "crops":
        return (value as string[]).join(", ");
      default:
        return value;
    }
  };

  return (
    <div className="w-[348px] flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-col">
          <span className="text-[24px] font-bold text-black">매매 4억 3천</span>
          <span className="text-[14px] text-gray-900">
            전라남도 완도군 청산면 12-1
          </span>
        </div>
        <div className="w-full h-[214px] rounded-[9px] bg-gray-200 flex justify-center items-center" />
        <button
          className="flex items-center justify-center gap-[8px] font-semibold text-[18px] text-gray-1100 bg-gray-200 border-[1px] border-gray-400 cursor-pointer py-[12px] rounded-[8px]"
          style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
        >
          자세히 보기
          <Image src={ArrowRight} alt="right" className="w-[18px] h-[18px]" />
        </button>
      </div>
      <div className="flex flex-col gap-[16px]">
        {details.map((detail) => (
          <div key={detail.key} className="flex flex-col">
            <div className="font-light text-[14px] text-gray-700 flex gap-[4px] items-center">
              {detail.title}
              {(detail.key === "revenue" ||
                detail.key === "infra" ||
                detail.key === "crops") && <Image src={InfoIcon} alt="info" />}
            </div>
            <span
              className={`font-bold text-[14px] ${
                detail.key === "price" || detail.key === "price_of_area"
                  ? "text-system-red"
                  : "text-black"
              }`}
            >
              {formatValue(detail.key, detail.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
