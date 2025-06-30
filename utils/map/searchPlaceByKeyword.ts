/* eslint-disable @typescript-eslint/no-explicit-any */

import { RefObject } from "react";

export const searchPlaceByKeyword = ({
  keyword,
  kakaoMap,
  markerImages,
  placesMarkersRef,
  searchToggle,
  setSearchToggle,
}: {
  keyword: string;
  kakaoMap: any;
  markerImages: Record<string, string>;
  placesMarkersRef: RefObject<Record<string, any[]>>;
  searchToggle: Record<string, boolean>;
  setSearchToggle: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) => {
  const isActive = searchToggle[keyword];

  if (isActive) {
    // 이미 활성화된 경우 마커 제거 후 상태 변경
    if (placesMarkersRef.current[keyword]) {
      placesMarkersRef.current[keyword].forEach((marker) =>
        marker.setMap(null),
      );
      placesMarkersRef.current[keyword] = [];
    }
    setSearchToggle((prev) => ({ ...prev, [keyword]: false }));
    return;
  }

  const ps = new window.kakao.maps.services.Places();

  const imageSrc = markerImages[keyword];
  const imageSize = new window.kakao.maps.Size(30, 30);
  const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

  const rect = "126,34,128,35.4"; // 전라남도 반경

  const allMarkers: any[] = [];
  let pageCount = 0;
  const maxPages = 5;

  const callback = (data: any, status: string, pagination: any) => {
    if (status === window.kakao.maps.services.Status.OK) {
      data.forEach((place: any) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: kakaoMap,
          title: place.place_name,
          image: markerImage,
        });
        allMarkers.push(marker);
      });

      pageCount++;

      if (pagination.hasNextPage && pageCount < maxPages) {
        pagination.nextPage();
      } else {
        // 모든 페이지 로드 완료 후 마커 저장 및 상태 업데이트
        placesMarkersRef.current[keyword] = allMarkers;
        setSearchToggle((prev) => ({ ...prev, [keyword]: true }));
      }
    } else {
      alert("검색 결과가 없습니다.");
    }
  };

  ps.keywordSearch(keyword, callback, { rect });
};
