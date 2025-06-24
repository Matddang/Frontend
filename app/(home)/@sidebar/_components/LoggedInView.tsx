"use client";

import ChevroRightIcon from "@/assets/images/chevron-right.svg";
import GuideImg from "@/assets/images/guide.svg";
import AgriPolicyLoggedInImg from "@/assets/images/agri-policy-loggedin.svg";
import MarginRateCropLoggedInImg from "@/assets/images/margin-rate-crop-loggedin.svg";
import Image from "next/image";
import { RANKLISTINGS } from "@/constants/sideBarOption";
import ListingRankCard from "./ListingRankCard";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/UserStore";

export default function LoggedInView() {
  const router = useRouter();
  const { name } = useUserStore();

  return (
    <div className="bg-gray-100">
      <section className="bg-primary-light flex justify-between items-center px-4 py-[10px]">
        <span>{`${name ?? ""}님은 '수익형' 농부입니다☺️`}</span>
        <button
          className="flex p-[10px] gap-[6px] items-center bg-primary rounded-[8px]"
          style={{
            background:
              "linear-gradient(247deg, #D6FF95 -11.27%, #39B94C 44.64%)",
          }}
          onClick={() => alert("수익형")}
        >
          <span className="text-white">수익형</span>
          <Image src={ChevroRightIcon} alt="오른쪽 화살표" />
        </button>
      </section>

      <section className="px-4 mt-4">
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

      <section className="px-4 my-6 flex flex-col gap-[10px]">
        <h2 className="typo-sub-head-sb">000님을 위한 추천 매물 랭킹</h2>
        <div className="flex flex-col gap-5">
          {RANKLISTINGS.map((item, index) => (
            <ListingRankCard
              key={index}
              image={item.image}
              alt={item.alt}
              label={item.label}
              onClick={() => alert(item.type)}
            />
          ))}
        </div>
      </section>

      <section className="px-4 my-[10px] flex flex-col gap-[10px]">
        <h2 className="typo-sub-head-sb">수익형 농부에게 유용한 정보🤔</h2>
        <div className="flex flex-wrap gap-4 w-full">
          <button
            className="relative flex-grow min-w-[100px]"
            style={{ aspectRatio: "171 / 182" }}
          >
            <Image
              src={AgriPolicyLoggedInImg}
              alt="2025 맞춤형 정책"
              fill
              className="object-contain"
            />
          </button>
          <button
            className="relative flex-grow min-w-[100px]"
            style={{ aspectRatio: "171 / 182" }}
          >
            <Image
              src={MarginRateCropLoggedInImg}
              alt="마진율 높은 작물"
              fill
              className="object-contain"
            />
          </button>
        </div>
      </section>
    </div>
  );
}
