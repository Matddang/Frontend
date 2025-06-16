"use client";

import { ReactNode, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

interface CustomSwiperProps {
  children: ReactNode[]; // 슬라이드 컴포넌트 배열
  slidesPerView?: number;
  spaceBetween?: number;
}

export default function CustomSwiper({
  children,
  slidesPerView = 2.5,
  spaceBetween = 16,
}: CustomSwiperProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperClass | null>(null);
  const slidesCount = children.length;

  const handleSlideChange = (swiper: SwiperClass) => {
    setCurrentIndex(swiper.activeIndex);
  };

  // 인디케이터 드래그 이벤트
  const onIndicatorPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();

    const indicator = e.currentTarget;
    const rect = indicator.getBoundingClientRect();

    const onPointerMove = (moveEvent: PointerEvent) => {
      let posX = moveEvent.clientX;
      if (posX < rect.left) posX = rect.left;
      if (posX > rect.right) posX = rect.right;

      const relativePos = (posX - rect.left) / rect.width;
      const targetIndex = Math.round(relativePos * (slidesCount - 1));

      if (swiperRef.current && targetIndex !== currentIndex) {
        swiperRef.current.slideTo(targetIndex);
      }
    };

    const onPointerUp = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div className="cursor-pointer">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={handleSlideChange}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
      >
        {children.map((child, i) => (
          <SwiperSlide key={i}>{child}</SwiperSlide>
        ))}
      </Swiper>

      {/* 인디케이터 */}
      <div
        className="mt-5 h-1 bg-gray-200 rounded-full relative overflow-hidden cursor-pointer"
        onPointerDown={onIndicatorPointerDown}
      >
        <div
          className="absolute h-full bg-gray-600 rounded-full transition-all duration-300"
          style={{
            width: `${100 / (slidesCount - 1)}%`,
            left: `${(100 / (slidesCount - 1)) * currentIndex}%`,
          }}
        />
      </div>
    </div>
  );
}
