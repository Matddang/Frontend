import DetailHeader from "./_components/DetailHeader";
import SummaryInfo from "./_components/SummaryInfo";
import DescriptionInfo from "./_components/DescriptionInfo";
import DistanceInfo from "./_components/DistanceInfo";
import InfraInfo from "./_components/InfraInfo";
import ComparisonImage from "@/assets/images/comparison-info-image.svg";
import Image from "next/image";
import SimilarItems from "./_components/SimilarItems";
import CropRecommendation from "./_components/CropRecommendation";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    return null;
  }

  console.log(id);

  return (
    <main className="flex flex-col">
      <DetailHeader />

      <article className="bg-white">
        <SummaryInfo />
        <hr className="h-[5px] bg-gray-300 border-none" />
        <DescriptionInfo />
      </article>

      <aside className="mt-6 space-y-[34px] bg-white" aria-label="추가 정보">
        <DistanceInfo />
        <hr className="h-[5px] bg-gray-300 border-none" />
        <InfraInfo />
        <Image src={ComparisonImage} alt="매물 비교" />
        <CropRecommendation />
        <SimilarItems />
      </aside>
      <button className="w-full bg-primary text-white py-3 typo-sub-head-sb mt-[43px]">
        사이트로 이동하기
      </button>
    </main>
  );
}
