import ArrowRight from "@/assets/images/arrow-right-black.svg";
import Image from "next/image";
import InfoIcon from "@/assets/images/info.svg";
import { Property } from "@/types/property";
import { formatKoreanUnit } from "@/utils/format";
import { useQuery } from "@tanstack/react-query";
import { getMyPlace } from "@/services/getMyPlace";
import { useTokenStore } from "@/store/useTokenStore";
import { useEffect, useState } from "react";
import { getDurationTime } from "@/utils/getDurationTime";
import { Place } from "@/types/myPlace";
import { getListingDetail } from "@/services/getListingDetail";

export default function CompareResult({ selected }: { selected: Property[] }) {
  return (
    <div className="flex justify-between">
      {selected.map((value) => (
        <ResultItem key={value.saleId} data={value} />
      ))}
    </div>
  );
}

function ResultItem({ data }: { data: Property }) {
  const { token } = useTokenStore();
  const [infra, setInfra] = useState<string[]>([]);

  const { data: saleData } = useQuery({
    queryKey: ["listingDetail", data],
    queryFn: () => getListingDetail(data.saleId),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const { data: places } = useQuery({
    queryKey: ["myPlace"],
    queryFn: () => getMyPlace(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  useEffect(() => {
    const getDistance = async (place: Place) => {
      const durationTime = await getDurationTime(place, [
        saleData.sale[0].wgsX,
        saleData.sale[0].wgsY,
      ]);
      return `${place.placeName} : ${durationTime || "-"}`;
    };

    const loadInfra = async () => {
      if (places?.data && saleData?.sale) {
        const infraList = await Promise.all(
          places.data.map((place: Place) => getDistance(place)),
        );
        setInfra(infraList);
      }
    };

    loadInfra();
  }, [places, data, saleData]);

  const details = [
    {
      key: "landType",
      title: "농지 유형",
      value: data.landType,
    },
    {
      key: "price",
      title: "금액",
      value: formatKoreanUnit(data.price),
    },
    {
      key: "price_of_area",
      title: "평당 가격",
      value: formatKoreanUnit(data.price / data.area),
    },
    {
      key: "area",
      title: "면적",
      value: data.area,
    },
    {
      key: "profit",
      title: "예상 수익",
      value: data.profit,
    },
    {
      key: "infra",
      title: "인프라",
      value: infra,
    },
    {
      key: "mainCrop",
      title: "적합 농산물",
      value: data.mainCrop,
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
      case "infra":
        return Array.isArray(value)
          ? value.map((v, i) => <div key={i}>{v}</div>)
          : "";
      default:
        return value;
    }
  };

  return (
    <div className="w-[348px] flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-col">
          <span className="typo-head-3 text-black">
            {data.saleCategory} {formatKoreanUnit(data.price)}
          </span>
          <span className="typo-sub-title-m text-gray-900">
            {data.saleAddr}
          </span>
        </div>
        <div className="w-full h-[214px] rounded-[9px] bg-gray-200 flex justify-center items-center overflow-hidden">
          <Image
            src={data.imgUrl}
            alt="img"
            width={348}
            height={214}
            className="w-full h-full object-cover"
          />
        </div>
        <button
          className="flex items-center justify-center gap-[8px] typo-sub-head-sb text-gray-1100 bg-gray-200 border-[1px] border-gray-400 cursor-pointer py-[12px] rounded-[8px]"
          style={{ boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)" }}
        >
          자세히 보기
          <Image src={ArrowRight} alt="right" className="w-[18px] h-[18px]" />
        </button>
      </div>
      <div className="flex flex-col gap-[16px]">
        {details.map((detail) => (
          <div key={detail.key} className="flex flex-col">
            <div className="typo-14-r text-gray-700 flex gap-[4px] items-center">
              {detail.title}
              {(detail.key === "profit" ||
                detail.key === "infra" ||
                detail.key === "mainCrop") && (
                <Image src={InfoIcon} alt="info" width={15} height={15} />
              )}
            </div>
            <span
              className={`typo-14-b ${
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
