import ArrowLeft from "@/assets/images/arrow-left.svg";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function InfoHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const title = {
    "/info/margin": "마진율 높은 작물",
    "/info/policy": "창업농에게 필요한 2025 정책",
    "/info/city-property": "도시별 매물 현황",
  };

  type TitleType = keyof typeof title;

  return (
    <div className="flex gap-[16px] items-center bg-white h-[59px] w-full p-[16px] border-b-[1px] border-b-gray-300">
      <button
        className="w-[24px] h-[24px] cursor-pointer"
        onClick={() => router.back()}
      >
        <Image src={ArrowLeft} alt="prev" width={24} height={24} />
      </button>
      <span className="typo-sub-head-sb">{title[pathname as TitleType]}</span>
    </div>
  );
}
