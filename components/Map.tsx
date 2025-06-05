/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { positions } from "@/mock/markerPositions";
import { clusterStyle } from "@/styles/mapClusterStyle";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null); // 지도를 표시할 HTML DOM 요소 참조
  const kakaoMapRef = useRef<any>(null); // 카카오 지도 인스턴스 저장

  // 현재 선택된 지도 타입 상태
  const [activeMapType, setActiveMapType] = useState<"ROADMAP" | "HYBRID">(
    "ROADMAP",
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.kakao || !mapRef.current)
      return;

    const onLoad = () => {
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(34.9, 126.7),
        level: 9,
      });

      kakaoMapRef.current = map;

      // 마커 생성
      const allMarkers = positions.map(
        ({ lat, lng }) =>
          new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lng),
          }),
      );

      // 지역별로 마커를 그룹핑하기 위한 객체
      const groupMarkers: Record<string, any[]> = {};
      positions.forEach(({ region }, i) => {
        if (!groupMarkers[region]) groupMarkers[region] = [];
        groupMarkers[region].push(allMarkers[i]);
      });

      let regionClusterers: any[] = [];
      let numberClusterer: any = null;
      let currentMode: "region" | "number" = "region";

      // 클러스터 제거
      const clearAllClusters = () => {
        regionClusterers.forEach((c) => c.clear());
        if (numberClusterer) numberClusterer.clear();
        regionClusterers = [];
        numberClusterer = null;
      };

      // 클러스터 마우스 이벤트 리스너 함수
      const addClusterMouseEvents = (
        clusterer: any,
        overStyle: Partial<CSSStyleDeclaration>,
        outStyle: Partial<CSSStyleDeclaration>,
      ) => {
        const applyStyle = (
          el: HTMLElement,
          style: Partial<CSSStyleDeclaration>,
        ) => {
          Object.keys(style).forEach((key) => {
            const value = style[key as keyof CSSStyleDeclaration];
            if (value != null) {
              el.style.setProperty(key, String(value));
            }
          });
        };

        window.kakao.maps.event.addListener(
          clusterer,
          "clusterover",
          (cluster: any) => {
            const el = cluster.getClusterMarker().getContent();
            if (el instanceof HTMLElement) applyStyle(el, overStyle);
          },
        );

        window.kakao.maps.event.addListener(
          clusterer,
          "clusterout",
          (cluster: any) => {
            const el = cluster.getClusterMarker().getContent();
            if (el instanceof HTMLElement) applyStyle(el, outStyle);
          },
        );
      };

      // 지역명 클러스터 세팅
      const setupRegionClusters = () => {
        clearAllClusters();
        regionClusterers = Object.entries(groupMarkers).map(
          ([region, markers]) => {
            const clusterer = new window.kakao.maps.MarkerClusterer({
              map,
              averageCenter: true,
              minLevel: 5,
              disableClickZoom: true,
              texts: [region],
              styles: clusterStyle.region,
            });
            clusterer.addMarkers(markers);

            addClusterMouseEvents(
              clusterer,
              {
                background: "#00DD9B",
                color: "#fff",
              },
              {
                background: "#F8F9FB",
                color: "#000",
              },
            );
            return clusterer;
          },
        );

        currentMode = "region";
      };

      // 위치 기반 숫자 클러스터 세팅
      const setupNumberCluster = () => {
        clearAllClusters();
        numberClusterer = new window.kakao.maps.MarkerClusterer({
          map,
          averageCenter: true,
          minLevel: 5,
          disableClickZoom: true,
          calculator: [2, 4, 8],
          styles: clusterStyle.number,
        });
        numberClusterer.addMarkers(allMarkers);

        addClusterMouseEvents(
          numberClusterer,
          { background: "#00DD9B" },
          { background: "rgba(17, 200, 145, 0.78)" },
        );
        currentMode = "number";

        window.kakao.maps.event.addListener(
          numberClusterer,
          "clusterclick",
          function (numberClusterer: any) {
            const markers = numberClusterer.getMarkers();
            markers.forEach((m: any) => {
              console.log(m.getPosition());
            });
          },
        );
      };

      // 줌 레벨 제어
      const handleZoomChanged = () => {
        const level = map.getLevel();
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
    };

    if (window.kakao.maps?.load) {
      window.kakao.maps.load(onLoad);
    } else {
      onLoad();
    }
  }, []);

  const changeMapType = (type: "ROADMAP" | "HYBRID") => {
    setActiveMapType(type);
    kakaoMapRef.current?.setMapTypeId(window.kakao.maps.MapTypeId[type]);
  };

  return (
    <div className="relative w-screen h-[calc(100vh-65px)]">
      {/* 지도 */}
      <div ref={mapRef} className="w-full h-full" />

      {/* 지도 타입 버튼 */}
      <div className="absolute top-[50%] -translate-y-full right-4 z-10 flex flex-col gap-2">
        <button
          onClick={() => changeMapType("ROADMAP")}
          className={`w-12 h-12 text-white text-sm border-none rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-[#00DD9B]
            ${activeMapType === "ROADMAP" ? "bg-[#00DD9B]" : "bg-gray-500"}`}
        >
          일반지도
        </button>
        <button
          onClick={() => changeMapType("HYBRID")}
          className={`w-12 h-12 text-white text-sm border-none rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-[#00DD9B]
            ${activeMapType === "HYBRID" ? "bg-[#00DD9B]" : "bg-gray-500"}`}
        >
          스카이뷰
        </button>
      </div>
    </div>
  );
}
