/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { positions } from "@/mock/markerPositions";
import { clusterStyle } from "@/styles/mapClusterStyle";
import { createOverlayContent } from "@/utils/mapOverlay";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import PlusIcon from "@/assets/images/plus.svg";
import MinusIcon from "@/assets/images/minus.svg";
import CurrentLocationIcon from "@/assets/images/current-location.svg";
import AgroDistributionActiveIcon from "@/assets/images/agro-distribution-active.svg";
import MachineryRentalActiveIcon from "@/assets/images/machinery-rental-active.svg";
import { useSidebarStore } from "@/store/useSidebarStore";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null); // 지도를 표시할 HTML DOM 요소 참조
  const kakaoMapRef = useRef<any>(null); // 카카오 지도 인스턴스 저장
  const overlays = useRef<{
    myLocation: any | null;
    infoOverlay: any | null;
  }>({
    myLocation: null,
    infoOverlay: null,
  });

  const { isSidebarOpen } = useSidebarStore();
  const centerRef = useRef<any>(null);

  const [showMoveToJeollaButton, setShowMoveToJeollaButton] = useState(false);

  // 전라남도 센터(화순시)
  const JEONNAM_CENTER = useMemo(() => ({ lat: 35.0675, lng: 126.994 }), []);

  const isInJeonnam = (lat: number, lng: number) => {
    return lat >= 34.0 && lat <= 35.32 && lng >= 126.0 && lng <= 127.7434;
  };

  // 전라남도 구역으로 이동
  const moveToJeonnam = () => {
    if (!kakaoMapRef.current) return;
    kakaoMapRef.current.setLevel(10);
    kakaoMapRef.current.panTo(
      new window.kakao.maps.LatLng(JEONNAM_CENTER.lat, JEONNAM_CENTER.lng),
    );
  };

  // 오베레이 초기화
  const clearAllOverlays = () => {
    if (overlays.current.myLocation) {
      overlays.current.myLocation.setMap(null);
      overlays.current.myLocation = null;
    }
    if (overlays.current.infoOverlay) {
      overlays.current.infoOverlay.setMap(null);
      overlays.current.infoOverlay = null;
    }
  };

  useEffect(() => {
    if (!kakaoMapRef.current) return;

    const currentCenter = kakaoMapRef.current.getCenter();
    kakaoMapRef.current.relayout(); // 지도 크기 재계산
    kakaoMapRef.current.setCenter(currentCenter);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.kakao || !mapRef.current)
      return;

    const onLoad = () => {
      centerRef.current = new window.kakao.maps.LatLng(
        JEONNAM_CENTER.lat,
        JEONNAM_CENTER.lng,
      );

      const map = new window.kakao.maps.Map(mapRef.current, {
        center: centerRef.current,
        level: 10,
        mapTypeId: window.kakao.maps.MapTypeId.HYBRID,
      });

      kakaoMapRef.current = map;

      // 지도가 너무 축소되거나 전라남도가 안보이면 [전라남도 이동] 버튼 띄움
      window.kakao.maps.event.addListener(map, "idle", () => {
        const center = map.getCenter();
        const level = map.getLevel();
        const isJeonnamVisible = isInJeonnam(center.getLat(), center.getLng());

        if (level >= 12 || !isJeonnamVisible) {
          setShowMoveToJeollaButton(true);
        } else {
          setShowMoveToJeollaButton(false);
        }
      });

      // 커스텀 오버레이 마커 생성
      const allMarkers = positions.map(
        ({ lat, lng, region, type, price, area, kind }) => {
          const content = createOverlayContent(type, price, area, kind);

          content.addEventListener("click", () => {
            const latLng = new window.kakao.maps.LatLng(lat, lng);

            clearAllOverlays();

            // 지도 중심 이동 및 줌인
            kakaoMapRef.current.setLevel(0); // 더 낮을수록 더 줌인
            kakaoMapRef.current.panTo(latLng);

            // 정보 표시할 HTML 콘텐츠
            const infoContent = document.createElement("div");
            infoContent.style.position = "relative";
            infoContent.style.padding = "8px 12px";
            infoContent.style.background = "#F6FFE8";
            infoContent.style.borderRadius = "40px";
            infoContent.innerHTML = `<h4 style="font-size:16px; font-weight:700;">${region}</h4>`;

            const pointer = document.createElement("div");
            pointer.style.position = "absolute";
            pointer.style.bottom = "-10px";
            pointer.style.left = "50%";
            pointer.style.transform = "translateX(-50%)";
            pointer.style.width = "0";
            pointer.style.height = "0";
            pointer.style.borderLeft = "10px solid transparent";
            pointer.style.borderRight = "10px solid transparent";
            pointer.style.borderTop = "10px solid #F6FFE8"; // 말풍선 배경색과 동일하게

            infoContent.appendChild(pointer);

            const infoOverlay = new window.kakao.maps.CustomOverlay({
              content: infoContent,
              position: latLng,
              yAnchor: 0.5 + 2.3,
              map: kakaoMapRef.current,
            });

            overlays.current.infoOverlay = infoOverlay;
          });

          const overlay = new window.kakao.maps.CustomOverlay({
            position: new window.kakao.maps.LatLng(lat, lng),
            content: content,
            xAnchor: 0.5,
            yAnchor: 0.5,
          });

          return overlay;
        },
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
              disableClickZoom: false,
              texts: [region],
              styles: clusterStyle.region,
            });
            clusterer.addMarkers(markers);

            addClusterMouseEvents(
              clusterer,
              {
                background: "#39b94c",
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
          disableClickZoom: false,
          calculator: [2, 4, 8],
          styles: clusterStyle.number,
        });
        numberClusterer.addMarkers(allMarkers);

        addClusterMouseEvents(
          numberClusterer,
          { background: "#39b94c" },
          { background: "rgba(57, 185, 76, 0.78)" },
        );
        currentMode = "number";

        // window.kakao.maps.event.addListener(
        //   numberClusterer,
        //   "clusterclick",
        //   function (numberClusterer: any) {
        //     const markers = numberClusterer.getMarkers();
        //     markers.forEach((m: any) => {
        //       console.log(m.getPosition());
        //     });
        //   },
        // );
      };

      // 줌 레벨 제어
      const handleZoomChanged = () => {
        const level = map.getLevel();
        if (level <= 8 && currentMode !== "number") setupNumberCluster();
        if (level > 8 && currentMode !== "region") setupRegionClusters();
      };

      // 현재 보이는 매물 정보
      const showVisibleMarkers = () => {
        const map = kakaoMapRef.current;
        if (!map) return;

        const bounds = map.getBounds(); // 현재 지도 영역
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();

        const visibleMarkers = allMarkers.filter((overlay) => {
          const position = overlay.getPosition();
          const lat = position.getLat();
          const lng = position.getLng();

          return (
            lat >= sw.getLat() &&
            lat <= ne.getLat() &&
            lng >= sw.getLng() &&
            lng <= ne.getLng()
          );
        });

        console.log("현재 화면에 보이는 매물 수:", visibleMarkers.length);
        // visibleMarkers.forEach((overlay, i) => {
        //   const { lat, lng } = positions[i];
        //   console.log(`위도: ${lat}, 경도: ${lng}`);
        // });
      };

      window.kakao.maps.event.addListener(map, "idle", showVisibleMarkers);

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
  }, [JEONNAM_CENTER]);

  const moveToMyLocation = () => {
    if (!navigator.geolocation || !kakaoMapRef.current) {
      alert("위치 정보를 사용할 수 없습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const loc = new window.kakao.maps.LatLng(latitude, longitude);

        clearAllOverlays();

        kakaoMapRef.current.setLevel(4);
        kakaoMapRef.current.panTo(loc);
      },
      (error) => {
        alert("위치 정보를 가져올 수 없습니다.");
        console.error(error);
      },
    );
  };

  return (
    <div className="relative w-full h-full">
      {/* 지도 */}
      <div ref={mapRef} className="w-full h-full" />

      {/* 우측 버튼들 */}
      <div className="absolute top-10 right-10 z-10 flex flex-col gap-[23px]">
        <div className="flex flex-col gap-3">
          <button className="p-[13px] rounded-[50%] flex justify-center items-center bg-primary">
            <Image src={MachineryRentalActiveIcon} alt="농기계 임대 사업소" />
          </button>
          <button className="p-[13px] rounded-[50%] flex justify-center items-center bg-[#FF822F]">
            <Image src={AgroDistributionActiveIcon} alt="농수산물 유통 센터" />
          </button>
        </div>
        <button
          onClick={moveToMyLocation}
          className="px-[6px] py-2 rounded-[8px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.08)] bg-white flex flex-col gap-1 items-center justify-center"
          aria-label="현위치로 이동"
          title="현위치로 이동"
        >
          <Image src={CurrentLocationIcon} alt="현위치" />
          <span className="typo-sub-title-m text-primary">현위치</span>
        </button>
        <div className=" flex flex-col gap-[11.5px] px-3 py-[15px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.08)] bg-white rounded-[8px]">
          <button
            onClick={() => {
              const map = kakaoMapRef.current;
              if (!map) return;
              const level = map.getLevel();
              map.setLevel(level - 1);
            }}
            className=""
            aria-label="지도 확대"
          >
            <Image src={PlusIcon} alt="확대" />
          </button>
          <hr className="w-full h-[1px] text-gray-500" />
          <button
            onClick={() => {
              const map = kakaoMapRef.current;
              if (!map) return;
              const level = map.getLevel();
              map.setLevel(level + 1);
            }}
            className=""
            aria-label="지도 축소"
          >
            <Image src={MinusIcon} alt="축소" />
          </button>
        </div>
      </div>

      {/* 전라도 지도로 이동하기 버튼 */}
      {showMoveToJeollaButton && (
        <div className="group absolute z-10 bottom-[110px] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <button
            onClick={moveToJeonnam}
            className="relative typo-sub-head-sb px-[34px] py-3 w-fit rounded-[119px] border border-[2px] border-primary bg-primary-light shadow-[0_0_20px_rgba(0,0,0,0.08)]"
          >
            전라남도 지도로 이동하기
            {/* hover 시에 나타날 텍스트 */}
            <p className="absolute bottom-full mb-[24px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[16px] bg-primary-light px-4 py-[14px] typo-body-1-m opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100">
              맞땅은 지금 전라도 지역 매물부터 소개하고 있어요 🙂
              <br />
              전라도 지도로 이동하려면 아래 버튼을 눌러주세요!
            </p>
          </button>
        </div>
      )}
    </div>
  );
}
