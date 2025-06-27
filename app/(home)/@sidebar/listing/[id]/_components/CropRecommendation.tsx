"use client";

import { CROP_IMAGE_MAP } from "@/constants/cropImages";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { formatKoreanUnit } from "@/utils/format";

const TEMP_CROP_DATA = [
  {
    cropId: 11,
    name: "딸기",
    description:
      "해당 농지의 토양에서 가장 잘 자랄 수 있는 최적합 작물은 딸기입니다.",
    estimatedYield: 5.4,
    estimatedProfit: 9230000,
  },
  {
    cropId: 1,
    name: "사과",
    description:
      "해당 농지의 토양에서 가장 잘 자랄 수 있는 최적합 작물은 사과입니다.",
    estimatedYield: 1.4,
    estimatedProfit: 1220000,
  },
  {
    cropId: 21,
    name: "당근",
    description:
      "해당 농지의 토양에서 가장 잘 자랄 수 있는 최적합 작물은 당근입니다.",
    estimatedYield: 1.4,
    estimatedProfit: 1220000,
  },
];

export default function CropRecommendation() {
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
        {TEMP_CROP_DATA.map((crop, index) => (
          <SwiperSlide key={crop.cropId}>
            <div className="rounded-[8px] overflow-hidden  border border-gray-400">
              <div className="relative">
                <Image src={CROP_IMAGE_MAP[crop.cropId]} alt={crop.name} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70" />
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-primary rounded-full text-center px-2 py-1 text-xs">
                      {index + 1}
                    </span>
                    <span className="typo-head-3">{crop.name}</span>
                  </div>
                  <p className="text-gray-400 typo-body-1-m line-clamp-3">
                    {crop.description}
                  </p>
                </div>
              </div>
              <div className="flex justify-around py-5">
                <dl className="flex flex-col gap-[10px] items-center pl-5">
                  <dt className="typo-sub-title-m">예상 수확량</dt>
                  <dd className="typo-head-2">{crop.estimatedYield}톤</dd>
                </dl>
                <div className="w-[1px] bg-gray-400" />
                <dl className="flex flex-col gap-[10px] items-center pr-5">
                  <dt className="typo-sub-title-m">예상 수익</dt>
                  <dd className="typo-head-2 text-primary">
                    {formatKoreanUnit(crop.estimatedProfit)}
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
