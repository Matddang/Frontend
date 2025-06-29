"use client";

import { likeProperty } from "@/services/likeProperty";
import { formatKoreanUnit } from "@/utils/format";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

interface CardProps {
  saleId: number;
  imageSrc: string;
  type: string;
  price: number;
  address: string;
  area: number;
  kind: string;
  isLiked?: boolean;
  variant?: "vertical" | "horizontal";
  crop?: string;
  place?: string;
  time?: string;
  isSwiper?: boolean;
  onClick: () => void;
}

export default function Card({
  saleId,
  imageSrc,
  type,
  price,
  address,
  area,
  kind,
  isLiked,
  variant = "vertical",
  crop,
  place,
  time,
  isSwiper = false,
  onClick,
}: CardProps) {
  const [showMessage, setShowMessage] = useState(false);
  const [like, setLike] = useState(isLiked);

  const mutation = useMutation({
    mutationFn: () => likeProperty(saleId),
    onSuccess: () => {
      setLike((prev) => !prev);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    },
    onError: () => {
      console.error("매물 좋아요 실패");
    },
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    mutation.mutate();
  };

  const isHorizontal = variant === "horizontal";

  return (
    <div
      className={`cursor-pointer ${
        isHorizontal ? "flex gap-[11px] py-4 border-b border-gray-300" : ""
      }`}
      onClick={onClick}
    >
      <div
        className={`relative aspect-square w-full h-full flex-1 ${
          isHorizontal ? "max-w-[115px]" : ""
        }`}
      >
        <Image
          src={imageSrc}
          alt="농지 이미지"
          fill
          className="object-cover rounded-[8px]"
        />
      </div>
      <div className={`${isHorizontal ? "flex-2" : "mt-3"}`}>
        <div className={`${isHorizontal ? "mb-[13px]" : "mb-2"}`}>
          <div className="flex justify-between">
            <div className="typo-body-1-b">
              {type} {formatKoreanUnit(price)}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="20"
              viewBox="0 0 22 20"
              fill="none"
              className="cursor-pointer"
              onClick={handleLikeClick}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.9932 3.21882C8.9938 0.881408 5.65975 0.25265 3.15469 2.39302C0.649644 4.53339 0.296968 8.11198 2.2642 10.6434C3.89982 12.7481 8.84977 17.1871 10.4721 18.6238C10.6536 18.7846 10.7444 18.8649 10.8502 18.8965C10.9426 18.9241 11.0437 18.9241 11.1361 18.8965C11.2419 18.8649 11.3327 18.7846 11.5142 18.6238C13.1365 17.1871 18.0865 12.7481 19.7221 10.6434C21.6893 8.11198 21.3797 4.51088 18.8316 2.39302C16.2835 0.275165 12.9925 0.881408 10.9932 3.21882Z"
                fill={like ? "#39B94C" : ""}
                stroke={like ? "" : "#505154"}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="typo-sub-title-m">
            {area}평 / {address}
          </div>
        </div>
        <div className="inline-block px-[10px] py-[6px] typo-body-2-b bg-primary-light text-primary border border-primary rounded-[4px]">
          {kind}
        </div>
        {isHorizontal && (
          <div className="typo-sub-title-m text-gray-800 mt-[6px]">
            {crop}
            {place && time && (
              <span>
                &nbsp;/ {place}에서 {time} 거리
              </span>
            )}
          </div>
        )}
      </div>

      {/* 찜 메시지 */}
      {!isSwiper && showMessage ? (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#575757] opacity-80 text-white px-4 py-[10px] rounded-[3px] z-50">
          {like ? "찜 목록에 추가되었습니다." : "찜 목록에서 제거되었습니다."}
        </div>
      ) : null}
    </div>
  );
}
