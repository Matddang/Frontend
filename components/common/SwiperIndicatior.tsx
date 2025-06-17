import React from "react";
import type { Swiper as SwiperClass } from "swiper";

interface SwiperIndicatorProps {
  currentIndex: number;
  slidesCount: number;
  swiperRef: React.RefObject<SwiperClass | null>;
}

export default function SwiperIndicator({
  currentIndex,
  slidesCount,
  swiperRef,
}: SwiperIndicatorProps) {
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

      if (swiperRef?.current && targetIndex !== currentIndex) {
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
  );
}
