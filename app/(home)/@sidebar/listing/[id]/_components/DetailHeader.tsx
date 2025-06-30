"use client";

import Image from "next/image";
import ShareIcon from "@/assets/images/share.svg";
import ChevronLeftIcon from "@/assets/images/chevron-left.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { likeProperty } from "@/services/likeProperty";
import { useTokenStore } from "@/store/useTokenStore";

interface DetailHeaderProps {
  title: string;
  isLiked: boolean;
  saleId: number;
}

export default function DetailHeader({
  title,
  isLiked,
  saleId,
}: DetailHeaderProps) {
  const router = useRouter();

  const { token } = useTokenStore();

  const [like, setLike] = useState(isLiked);
  const [showMessage, setShowMessage] = useState(false);

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

  const handleLikeClick = () => {
    if (!token) return;

    mutation.mutate();
  };

  return (
    <header className="flex justify-between items-center p-4 border-t border-b border-gray-300 mb-2">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()}>
          <Image src={ChevronLeftIcon} alt="뒤로 가기" />
        </button>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Image src={ShareIcon} alt="공유" />
        <button
          onClick={handleLikeClick}
          aria-label={like ? "찜 해제" : "찜하기"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none"
            className="cursor-pointer"
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
        </button>
      </div>

      {/* 찜 메시지 */}
      {showMessage && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#575757] opacity-80 text-white px-4 py-[10px] rounded-[3px] z-50">
          {like ? "찜 목록에 추가되었습니다." : "찜 목록에서 제거되었습니다."}
        </div>
      )}
    </header>
  );
}
