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
    if (typeof window === "undefined" || !window.kakao || !mapRef.current)
      return;

    const onLoad = () => {
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(34.9, 126.7),
        level: 9,
      });

      // 마커 위치 및 지역 임시 데이터
      const positions = [
        // 나주시
        {
          latlng: new window.kakao.maps.LatLng(34.8161, 126.5),
          region: "나주시",
        },
        {
          latlng: new window.kakao.maps.LatLng(34.818, 126.505),
          region: "나주시",
        },
        {
          latlng: new window.kakao.maps.LatLng(34.82, 126.495),
          region: "나주시",
        },
        {
          latlng: new window.kakao.maps.LatLng(34.815, 126.49),
          region: "나주시",
        },
        {
          latlng: new window.kakao.maps.LatLng(34.812, 126.498),
          region: "나주시",
        },
        // 목포시
        {
          latlng: new window.kakao.maps.LatLng(34.7922, 126.718),
          region: "목포시",
        },
        {
          latlng: new window.kakao.maps.LatLng(34.79, 126.72),
          region: "목포시",
        },
        {
          latlng: new window.kakao.maps.LatLng(34.788, 126.715),
          region: "목포시",
        },
        // 무안군
        {
          latlng: new window.kakao.maps.LatLng(34.8061, 126.92),
          region: "무안군",
        },
        {
          latlng: new window.kakao.maps.LatLng(34.804, 126.922),
          region: "무안군",
        },
      ];

      const allMarkers = positions.map(
        ({ latlng }) => new window.kakao.maps.Marker({ position: latlng }),
      );

      // 지역별로 마커를 그룹핑하기 위한 객체
      const groupMarkers: Record<string, any[]> = {};
      positions.forEach(({ region }, i) => {
        if (!groupMarkers[region]) groupMarkers[region] = [];
        groupMarkers[region].push(allMarkers[i]);
      });

      // 클러스터 스타일
      const clusterStyle = {
        region: [
          {
            display: "inline-flex",
            padding: "12px 34px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderRadius: "119px",
            border: "2px solid #00DD9B",
            background: "#F8F9FB",
            boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.08)",
          },
        ],
        number: [
          {
            display: "flex",
            width: "108px",
            height: "108px",
            padding: "33.987px 45.316px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "54.521px",
            background: "rgba(17, 200, 145, 0.78)",
            color: "#FFF",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "700",
          },
          {
            display: "flex",
            width: "130px",
            height: "130px",
            padding: "41.872px 55.83px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "67.17px",
            background: "rgba(17, 200, 145, 0.78)",
            color: "#FFF",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "700",
          },
          {
            display: "flex",
            width: "156px",
            height: "156px",
            padding: "51.117px 68.156px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "82px",
            background: "rgba(17, 200, 145, 0.78)",
            color: "#FFF",
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "700",
          },
        ],
      };

      let regionClusterers: any[] = [];
      let numberClusterer: any = null;
      let currentMode: "region" | "number" = "region";

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
              minLevel: 4,
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
          minLevel: 4,
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
      };

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

  return <div ref={mapRef} className="w-screen h-[calc(100vh-65px)]" />;
}
