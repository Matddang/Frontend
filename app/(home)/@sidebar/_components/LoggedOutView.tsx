"use client";

import Image from "next/image";
import GuideImg from "@/assets/images/guide.svg";
import TypeQuizImg from "@/assets/images/type-quiz.svg";
import AgriPolicyImg from "@/assets/images/agri-policy.svg";
import LandListingImg from "@/assets/images/land-listing.svg";
import Card from "@/components/common/Card";
import CustomSwiper from "@/components/common/CustomSwiper";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import SwiperIndicator from "@/components/common/SwiperIndicatior";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "@/services/getProperties";
import { Property } from "@/types/property";
import LoginModal from "@/components/login/LoginModal";

export default function LoggedOutView() {
  const slides = Array.from({ length: 5 });

  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const [sales, setSales] = useState<Property[]>([]);
  const [loginModal, setLoginModal] = useState(false);

  const searchParams = useSearchParams();

  const { data } = useQuery({
    queryKey: ["salesRanking"],
    queryFn: () => getProperties("liked"),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (data?.data.content.length) {
      setSales(data.data.content);
    }
  }, [data]);

  const moveToDetail = (id: number) => {
    router.push(`/listing/${id}?${searchParams.toString()}`);
  };

  return (
    <div className="px-4 py-[14px]">
      <section>
        <button
          className="rounded-[8px] relative w-full"
          style={{ aspectRatio: "361 / 60" }}
          onClick={() => setLoginModal(true)}
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
          {sales.map((sale) => (
            <Card
              key={sale.saleId}
              imageSrc={sale.imgUrl}
              type={sale.saleCategory}
              price={sale.price}
              area={sale.area}
              address={sale.saleAddr}
              kind={sale.landType}
              onClick={() => moveToDetail(sale.saleId)}
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
          onClick={() => router.push("/guide")}
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
      {loginModal && <LoginModal onClose={() => setLoginModal(false)} />}
    </div>
  );
}
