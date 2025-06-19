import { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

interface CustomSwiperProps {
  children: ReactNode[]; // 슬라이드 컴포넌트 배열
  slidesPerView?: number;
  spaceBetween?: number;
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
  swiperRef?: React.RefObject<SwiperClass | null>;
}

export default function CustomSwiper({
  children,
  slidesPerView = 2.5,
  spaceBetween = 16,
  setCurrentIndex,
  swiperRef,
}: CustomSwiperProps) {
  const handleSlideChange = (swiper: SwiperClass) => {
    if (setCurrentIndex) {
      setCurrentIndex(swiper.activeIndex);
    }
  };

  return (
    <div className="cursor-pointer">
      <Swiper
        onSwiper={(swiper) => {
          if (swiperRef) {
            swiperRef.current = swiper;
          }
        }}
        onSlideChange={handleSlideChange}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
      >
        {children.map((child, i) => (
          <SwiperSlide key={i}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
