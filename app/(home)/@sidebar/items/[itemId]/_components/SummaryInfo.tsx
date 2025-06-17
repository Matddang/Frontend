"use client";

import { detailInfos } from "@/constants/labels";
import SampleImage from "@/assets/images/sample-image.svg";
import Image from "next/image";

export default function SummaryInfo() {
  return (
    <>
      <figure className="relative" style={{ aspectRatio: "390 / 200" }}>
        <Image
          src={SampleImage}
          alt="샘플 이미지"
          fill
          className="object-cover"
        />
      </figure>
      <section
        aria-label="매물 요약 정보"
        className="px-4 py-[18px] flex justify-around"
      >
        {detailInfos.map(({ key, label }) => (
          <dl key={key} className="flex flex-col gap-5 items-center">
            <dt className="typo-body-1-m text-gray-900">{label}</dt>
            <dd className="typo-sub-head-sb">임시</dd>
          </dl>
        ))}
      </section>
    </>
  );
}
