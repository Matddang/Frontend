"use client";

import Image from "next/image";
import GuideImg from "@/assets/images/guide.svg";
import TypeQuizImg from "@/assets/images/type-quiz.svg";
import AgriPolicyImg from "@/assets/images/agri-policy.svg";
import LandListingImg from "@/assets/images/land-listing.svg";
import Card from "@/components/common/Card";
import CustomSwiper from "@/components/common/CustomSwiper";
import { useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import SwiperIndicator from "@/components/common/SwiperIndicatior";

export default function LoggedOutView() {
  const slides = Array.from({ length: 5 });

  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="px-4 py-[14px]">
      <section>
        <button
          className="rounded-[8px] relative w-full"
          style={{ aspectRatio: "361 / 60" }}
          onClick={() => alert("로그인 모달")}
        >
          <Image
            src={TypeQuizImg}
            alt="맞땅 가이드"
            fill
            className="object-contain"
          />
        </button>
      </section>

      <section className="flex flex-col gap-5 mt-4">
        <h2 className="typo-sub-head-sb">가장 인기 많은 농지 매물🌾</h2>
        <CustomSwiper
          slidesPerView={2.5}
          spaceBetween={16}
          setCurrentIndex={setCurrentIndex}
          swiperRef={swiperRef}
        >
          {slides.map((_, i) => (
            <Card
              key={i}
              imageSrc={LandListingImg}
              type="매매"
              price={150000000}
              area={351}
              address="전라남도 여수시 청산면 12-1"
              kind="과수원"
            />
          ))}
        </CustomSwiper>

        <SwiperIndicator
          currentIndex={currentIndex}
          slidesCount={slides.length}
          swiperRef={swiperRef}
        />
      </section>
      <section className="my-6 flex flex-col gap-[10px]">
        <h2 className="typo-sub-head-sb">농지 구하기 전 중요한 정보🍎</h2>
        <div className="flex flex-wrap gap-4 w-full">
          <button
            className="relative flex-grow min-w-[100px]"
            style={{ aspectRatio: "171 / 182" }}
          >
            <Image
              src={AgriPolicyImg}
              alt="2025 농업 정책"
              fill
              className="object-contain"
            />
          </button>
          <button
            className="relative flex-grow min-w-[100px]"
            style={{ aspectRatio: "171 / 182" }}
          >
            <Image
              src={LandListingImg}
              alt="도시별 매물 현황"
              fill
              className="object-contain"
            />
          </button>
        </div>
      </section>

      <section>
        <button
          className="rounded-[8px] relative w-full "
          style={{ aspectRatio: "358 / 108" }}
          onClick={() => alert("맞땅 가이드")}
        >
          <Image
            src={GuideImg}
            alt="맞땅 가이드"
            fill
            priority
            className="object-contain"
          />
        </button>
      </section>
    </div>
  );
}
