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

  // 활성화된 상태면 마커 제거
  if (isActive) {
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

  ps.keywordSearch(keyword, (data: any, status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const newMarkers: any[] = [];

      data.forEach((place: any) => {
        const markerPosition = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: kakaoMap,
          title: place.place_name,
          image: markerImage,
        });
        newMarkers.push(marker);
      });

      placesMarkersRef.current[keyword] = newMarkers;
      setSearchToggle((prev) => ({ ...prev, [keyword]: true }));
    } else {
      alert("검색 결과가 없습니다.");
    }
  });
};
