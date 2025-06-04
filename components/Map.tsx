/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.kakao) return;
    if (!mapRef.current) return;

    window.kakao.maps.load(() => {
      const map = new window.kakao.maps.Map(mapRef.current!, {
        center: new window.kakao.maps.LatLng(34.9, 126.7),
        level: 9,
      });

      // 마커 위치 및 지역 임시 데이터
      const positions = [
        {
          latlng: new window.kakao.maps.LatLng(34.8161, 126.5),
          region: "나주시",
        },
        {
          latlng: new window.kakao.maps.LatLng(34.82, 126.52),
          region: "목포시",
        },
        {
          latlng: new window.kakao.maps.LatLng(34.82, 126.53),
          region: "목포시",
        },
        {
          latlng: new window.kakao.maps.LatLng(34.81, 126.48),
          region: "나주시",
        },
        { latlng: new window.kakao.maps.LatLng(35.82, 127.48), region: "전북" },
        {
          latlng: new window.kakao.maps.LatLng(35.82, 127.481),
          region: "전북",
        },
      ];

      // 지역별로 마커를 그룹핑하기 위한 객체
      const groupMarkers: Record<string, any[]> = {};
      positions.forEach(({ latlng, region }) => {
        if (!groupMarkers[region]) groupMarkers[region] = [];
        groupMarkers[region].push(
          new window.kakao.maps.Marker({ position: latlng }),
        );
      });

      // 클러스터 스타일
      const clusterStyle = [
        {
          width: "60px",
          height: "60px",
          background: "rgba(0, 123, 255, 0.7)",
          color: "#fff",
          textAlign: "center",
          lineHeight: "60px",
          borderRadius: "30px",
          fontWeight: "bold",
          fontSize: "14px",
          border: "2px solid white",
          boxShadow: "0 0 5px rgba(0,0,0,0.3)",
        },
      ];

      let regionClusterers: any[] = []; // 지역별 클러스터러들
      let numberClusterer: any = null; // 숫자 클러스터러
      let currentMode: "region" | "number" = "region"; // 현재 클러스터 모드

      // 지역명 클러스터 세팅
      const setupRegionClusters = () => {
        clearAllClusters();
        regionClusterers = Object.entries(groupMarkers).map(
          ([region, markers]) => {
            const clusterer = new window.kakao.maps.MarkerClusterer({
              map,
              averageCenter: true,
              minLevel: 4,
              disableClickZoom: false,
              texts: [region],
              styles: clusterStyle,
            });
            clusterer.addMarkers(markers);
            return clusterer;
          },
        );
        currentMode = "region";
      };

      // 위치 기반 숫자 클러스터 세팅
      const setupNumberCluster = () => {
        clearAllClusters();
        const allMarkers = positions.map(
          ({ latlng }) => new window.kakao.maps.Marker({ position: latlng }),
        );
        numberClusterer = new window.kakao.maps.MarkerClusterer({
          map,
          averageCenter: true,
          minLevel: 4,
          disableClickZoom: false,
        });
        numberClusterer.addMarkers(allMarkers);
        currentMode = "number";
      };

      const clearAllClusters = () => {
        regionClusterers.forEach((c) => c.clear());
        if (numberClusterer) numberClusterer.clear();
        regionClusterers = [];
        numberClusterer = null;
      };

      const handleZoomChanged = () => {
        const level = map.getLevel();
        console.log("zoom level:", level);
        if (level <= 8 && currentMode !== "number") setupNumberCluster();
        if (level > 8 && currentMode !== "region") setupRegionClusters();
      };

      // 초기 설정
      setupRegionClusters();
      window.kakao.maps.event.addListener(
        map,
        "zoom_changed",
        handleZoomChanged,
      );

      // 언마운트 시 이벤트 제거
      return () => {
        window.kakao.maps.event.removeListener(
          map,
          "zoom_changed",
          handleZoomChanged,
        );
        clearAllClusters();
      };
    });
  }, []);

  return <div ref={mapRef} className="w-screen h-[calc(100vh-65px)]" />;
}
