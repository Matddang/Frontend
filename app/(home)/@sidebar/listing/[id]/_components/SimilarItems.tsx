"use client";

import Card from "@/components/common/Card";
import CustomSwiper from "@/components/common/CustomSwiper";
import LandListingImg from "@/assets/images/land-listing.svg";
import React from "react";

export default function SimilarItems() {
  const slides = Array.from({ length: 5 });

  return (
    <section className="px-4">
      <h3 className="typo-sub-head-bold mb-5">이 매물과 비슷한 조건의 매물</h3>
      <CustomSwiper slidesPerView={2.5} spaceBetween={16}>
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
    </section>
  );
}
