/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { positions } from "@/mock/markerPositions";
import { clusterStyle } from "@/styles/mapClusterStyle";
import { createOverlayContent } from "@/utils/mapOverlay";
import Image from "next/image";
import { useEffect, useRef } from "react";
import PlusIcon from "@/assets/images/plus.svg";
import MinusIcon from "@/assets/images/minus.svg";
import CurrentLocationIcon from "@/assets/images/current-location.svg";
import AgroDistributionActiveIcon from "@/assets/images/agro-distribution-active.svg";
import MachineryRentalActiveIcon from "@/assets/images/machinery-rental-active.svg";

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
    circle: any | null;
    infoOverlay: any | null;
  }>({
    myLocation: null,
    circle: null,
    infoOverlay: null,
  });

  const clearAllOverlays = () => {
    if (overlays.current.myLocation) {
      overlays.current.myLocation.setMap(null);
      overlays.current.myLocation = null;
    }
    if (overlays.current.circle) {
      overlays.current.circle.setMap(null);
      overlays.current.circle = null;
    }
    if (overlays.current.infoOverlay) {
      overlays.current.infoOverlay.setMap(null);
      overlays.current.infoOverlay = null;
    }
  };

  // 현재 선택된 지도 타입 상태
  // const [activeMapType, setActiveMapType] = useState<"ROADMAP" | "HYBRID">(
  //   "ROADMAP",
  // );

  useEffect(() => {
    if (typeof window === "undefined" || !window.kakao || !mapRef.current)
      return;

    const onLoad = () => {
      const map = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(34.9, 126.7),
        level: 10,
      });

      kakaoMapRef.current = map;

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

            // 새 원 그리기 (예: 반경 500m)
            const circle = new window.kakao.maps.Circle({
              center: latLng,
              radius: 50, // 미터 단위
              strokeWeight: 2,
              strokeColor: "#39B94C",
              strokeOpacity: 0.8,
              fillColor: "rgba(57, 185, 76, 0.44)",
              fillOpacity: 0.44,
              map: kakaoMapRef.current,
            });

            overlays.current.circle = circle;

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

        const circle = new window.kakao.maps.Circle({
          center: loc,
          radius: 75,
          strokeWeight: 3,
          strokeColor: "#39B94C",
          strokeOpacity: 0.8,
          fillColor: "rgba(57, 185, 76, 0.4)",
          fillOpacity: 0.4,
          map: kakaoMapRef.current,
        });

        overlays.current.myLocation = circle;
      },
      (error) => {
        alert("위치 정보를 가져올 수 없습니다.");
        console.error(error);
      },
    );
  };

  // const changeMapType = (type: "ROADMAP" | "HYBRID") => {
  //   setActiveMapType(type);
  //   kakaoMapRef.current?.setMapTypeId(window.kakao.maps.MapTypeId[type]);
  // };

  return (
    <div className="relative w-full h-full">
      {/* 지도 */}
      <div ref={mapRef} className="w-full h-full" />

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
        {/* <div className="flex flex-col gap-2">
          <button
            onClick={() => changeMapType("ROADMAP")}
            className={`w-12 h-12 text-white text-sm border-none rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-primary
            ${activeMapType === "ROADMAP" ? "bg-primary" : "bg-gray-500"}`}
          >
            일반지도
          </button>
          <button
            onClick={() => changeMapType("HYBRID")}
            className={`w-12 h-12 text-white text-sm border-none rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-primary
            ${activeMapType === "HYBRID" ? "bg-[#00DD9B]" : "bg-gray-500"}`}
          >
            스카이뷰
          </button>
        </div> */}
      </div>
    </div>
  );
}
