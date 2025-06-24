import DetailHeader from "./_components/DetailHeader";
import SummaryInfo from "./_components/SummaryInfo";
import DescriptionInfo from "./_components/DescriptionInfo";
import DistanceInfo from "./_components/DistanceInfo";
import InfraInfo from "./_components/InfraInfo";
import ComparisonImage from "@/assets/images/comparison-info-image.svg";
import Image from "next/image";
import SimilarItems from "./_components/SimilarItems";
import CropRecommendation from "./_components/CropRecommendation";
import { getListingDetail } from "@/services/getListingDetail";
import { formatKoreanUnit } from "@/utils/format";
import Link from "next/link";
import { getDeterministicLandUseInfo } from "@/utils/getRandomInfo";

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  if (typeof id !== "string" || !/^\d+$/.test(id)) {
    return null;
  }

  try {
    const data = await getListingDetail(id);
    console.log(data[0]);
    const {
      area,
      imgUrl,
      landCategory,
      landType,
      mainCrop,
      officialPrice,
      price,
      profit,
      regDate,
      saleAddr,
      saleCategory,
      saleId,
      wgsX,
      wgsY,
    } = data[0];

    const { landUse, restrictionArea } = getDeterministicLandUseInfo(id);

    return (
      <main className="flex flex-col mb-[94px]">
        <DetailHeader
          title={`${saleCategory} ${formatKoreanUnit(price)} ${landCategory}`}
        />

        <article className="bg-white">
          <SummaryInfo
            imgUrl={imgUrl}
            area={area}
            kind={landCategory}
            price={price}
          />
          <hr className="h-[5px] bg-gray-300 border-none" />
          <DescriptionInfo
            descriptions={{
              address: saleAddr,
              landUse: landUse,
              restrictionArea: restrictionArea,
              officialPricePerSqm: officialPrice,
              listingPricePerSqm: price / (area * 3.3),
            }}
          />
        </article>

        <aside className="mt-6 space-y-[34px] bg-white" aria-label="추가 정보">
          <DistanceInfo />
          <hr className="h-[5px] bg-gray-300 border-none" />
          <InfraInfo />
          <Image
            src={ComparisonImage}
            alt="매물 비교"
            width={78}
            height={390}
            className="w-[390px] h-auto"
          />
          <CropRecommendation />
          <SimilarItems />
        </aside>
        <Link
          href="https://jnfarm.jeonnam.go.kr/farm/property/propertyView.do?menuCd=farm005002&currentPageNo=1&nPageSize=10&category=002&searchCity=&searchArea=&searchType=&transactState=&type=&propertyId=0000001553"
          className="absolute bottom-0 z-10 text-center w-full bg-primary text-white py-3 typo-sub-head-sb"
        >
          사이트로 이동하기
        </Link>
      </main>
    );
  } catch (error) {
    console.error(error);
    return <div>요청에 실패했습니다.</div>;
  }
}
