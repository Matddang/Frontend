import ArrowRight from "@/assets/images/arrow-right-white.svg";
import Image from "next/image";

export default function CompareHistory() {
  const history_list = [
    {
      date: "2025. 05. 24",
      data: [
        {
          price: 1.5,
          type: "ORCHARD",
          area: 351,
          address: "전라남도 완도군 청산면 12-1",
        },
        {
          price: 1.5,
          type: "ORCHARD",
          area: 351,
          address: "전라남도 완도군 청산면 12-1",
        },
      ],
    },
    {
      date: "2025. 05. 24",
      data: [
        {
          price: 1.5,
          type: "ORCHARD",
          area: 351,
          address: "전라남도 완도군 청산면 12-1",
        },
        {
          price: 1.5,
          type: "ORCHARD",
          area: 351,
          address: "전라남도 완도군 청산면 12-1",
        },
      ],
    },
    {
      date: "2025. 05. 24",
      data: [
        {
          price: 1.5,
          type: "ORCHARD",
          area: 351,
          address: "전라남도 완도군 청산면 12-1",
        },
        {
          price: 1.5,
          type: "ORCHARD",
          area: 351,
          address: "전라남도 완도군 청산면 12-1",
        },
      ],
    },
    {
      date: "2025. 05. 24",
      data: [
        {
          price: 1.5,
          type: "ORCHARD",
          area: 351,
          address: "전라남도 완도군 청산면 12-1",
        },
        {
          price: 1.5,
          type: "ORCHARD",
          area: 351,
          address: "전라남도 완도군 청산면 12-1",
        },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-[30px]">
      {history_list.map((history, i) => (
        <div key={i} className="flex flex-col">
          <div className="h-[38px] bg-primary flex items-center justify-between rounded-t-[8px] py-[7px] px-[11px]">
            <span className="text-[16px] text-white">{history.date}</span>
            <Image src={ArrowRight} alt="right" className="cursor-pointer" />
          </div>
          <div className="flex gap-[12px] items-center bg-gray-200 py-[16px] px-[14px] rounded-b-[8px]">
            <Property data={history.data[0]} />
            <span className="text-[16px] font-bold text-primary">VS</span>
            <Property data={history.data[1]} />
          </div>
        </div>
      ))}
    </div>
  );
}

function Property({
  data,
}: {
  data: {
    price: number;
    type: string;
    area: number;
    address: string;
  };
}) {
  return (
    <div className="w-[140px] flex flex-col gap-[12px]">
      <div className="min-w-[140px] min-h-[140px] rounded-[9px] flex justify-center items-center bg-gray-400"></div>
      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-col">
          <span className="text-[16px] font-bold text-black">
            매매 {data.price}억
          </span>
          <span className="text-[14px] text-black">
            {data.area}평 / {data.address}
          </span>
        </div>
        <div className="w-fit bg-primary-light py-[6px] px-[10px] rounded-[4px] text-[12px] font-bold text-primary border-[1px] border-primary">
          {data.type === "ORCHARD" ? "과수원" : "밭"}
        </div>
      </div>
    </div>
  );
}
