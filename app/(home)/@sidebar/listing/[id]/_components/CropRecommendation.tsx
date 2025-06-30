"use client";

import { CROP_IMAGE_MAP, CROP_NAME_IMAGE_MAP } from "@/constants/cropImages";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getCropRecommendation } from "@/services/getCropRecommendation";

type Crop = { cropName: string; harvestAmount: number; profit: number };

export default function CropRecommendation({ saleId }: { saleId: number }) {
  const { data } = useQuery({
    queryKey: ["cropRecommendation", saleId],
    queryFn: () => getCropRecommendation(saleId),
    staleTime: 1000 * 60 * 5,
  });

  const crops: Crop[] = data?.data || [];

  return (
    <section className="px-4 overflow-hidden">
      <h3 className="typo-sub-head-bold mb-5">
        해당 농지에 적합한 높은 수익성의 작물
      </h3>
      <Swiper
        slidesPerView={1.01}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="crop-swiper"
      >
        {crops.map((crop, index) => (
          <SwiperSlide key={crop.cropName}>
            <div className="rounded-[8px] overflow-hidden  border border-gray-400">
              <div className="relative min-h-[193px] max-h-[193px] overflow-hidden">
                <Image
                  src={CROP_NAME_IMAGE_MAP[crop.cropName] || CROP_IMAGE_MAP[1]}
                  alt={crop.cropName}
                  className="h-full w-full object-fit"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-primary rounded-full text-center px-2 py-1 text-xs">
                      {index + 1}
                    </span>
                    <span className="typo-head-3">{crop.cropName}</span>
                  </div>
                  <p className="text-gray-400 typo-body-1-m line-clamp-3">
                    해당 농지의 토양에서 가장 잘 자랄 수 있는 최적합 작물은{" "}
                    {crop.cropName}입니다.
                  </p>
                </div>
              </div>
              <div className="flex justify-around py-5">
                <dl className="flex flex-col gap-[10px] items-center pl-5">
                  <dt className="typo-sub-title-m">예상 수확량</dt>
                  <dd className="typo-head-2">
                    {Math.round(crop.harvestAmount)}톤
                  </dd>
                </dl>
                <div className="w-[1px] bg-gray-400" />
                <dl className="flex flex-col gap-[10px] items-center pr-5">
                  <dt className="typo-sub-title-m">예상 수익</dt>
                  <dd className="typo-head-2 text-primary">
                    {Math.round(crop.profit)}만원
                  </dd>
                </dl>
              </div>
              <div className="px-4 py-3 bg-gray-100 text-gray-700 typo-caption-small-m">
                <ul className="list-disc pl-3 ">
                  <li>모든 작물은 노지 재배를 기준으로 합니다.</li>
                  <li>한 작물을 농지 전체에 재배했을 때의 예상 수익입니다.</li>
                </ul>
              </div>
              <button className="w-full bg-gray-300 py-[10px] text-gray-900 typo-sub-head-sb">
                자세히 보기
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
