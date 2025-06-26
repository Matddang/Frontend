"use client";

import Card from "@/components/common/Card";
import CustomSwiper from "@/components/common/CustomSwiper";
import React from "react";
import { KIND_FILTER } from "@/constants/filterOptions";

interface SimilarItem {
  saleId: number;
  saleCategory: string;
  landType: string;
  saleAddr: string;
  landCategory: string;
  price: number;
  area: number;
  mainCrop: string;
  imgUrl: string;
}

export default function SimilarItems({ items }: { items: SimilarItem[] }) {
  return (
    <section className="px-4">
      <h3 className="typo-sub-head-bold mb-5">이 매물과 비슷한 조건의 매물</h3>
      <CustomSwiper slidesPerView={2.5} spaceBetween={16}>
        {items.map((item: SimilarItem) => (
          <Card
            key={item.saleId}
            imageSrc={item.imgUrl}
            type={item.saleCategory}
            price={item.price}
            area={item.area}
            address={item.saleAddr}
            kind={KIND_FILTER[item.landCategory]}
          />
        ))}
      </CustomSwiper>
    </section>
  );
}
