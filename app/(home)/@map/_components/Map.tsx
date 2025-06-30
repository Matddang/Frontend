/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { clusterStyle } from "@/styles/mapClusterStyle";
import { createOverlayContent, createRegionOverlay } from "@/utils/mapOverlay";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSidebarStore } from "@/store/useSidebarStore";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import MapButtons from "./MapButtons";
import MoveToJeollaButton from "./MoveToJeollaButton";
import { markerImages } from "@/constants/markerImages";
import { searchPlaceByKeyword } from "@/utils/map/searchPlaceByKeyword";
import { useMapStore } from "@/store/MapStore";
import { ListingItem, useListingStore } from "@/store/ListingStore";
import { useQuery } from "@tanstack/react-query";
import { getListing } from "@/services/getListing";
import { useFilterStore } from "@/store/FilterStore";
import { buildListingBody } from "@/utils/request/buildListingBody";

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Map() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();

  const zoom = searchParams.get("zoom");
  const initialZoom = zoom ? Number(zoom) : 10;

  const mLat = searchParams.get("m_lat");
  const mLng = searchParams.get("m_lng");
  const keyword = searchParams.get("keyword") ?? undefined;
  const sortBy = searchParams.get("sortBy") ?? undefined;

  const mapRef = useRef<HTMLDivElement>(null); // 지도를 표시할 HTML DOM 요소
  const kakaoMapRef = useRef<any>(null); // 카카오 지도 인스턴스
  const regionMarkersRef = useRef<any[]>([]); // 지역 마커
  const numberClustererRef = useRef<any>(null); // 숫자 클러스터러
  const allMarkersRef = useRef<any[]>([]); // 현재 지도에 보이는 마커들
  const placesMarkersRef = useRef<Record<string, any[]>>({}); // 인프라 마커
  const selectedMarkerRef = useRef<any>(null); // 선택한 마커
  const hasHandledKeywordRef = useRef(false); // 검색 여부
  const isZoomedToMarkerRef = useRef(false); // 상세 매물 마커 줌 여부
  const detailReadyRef = useRef(false);
  // 정보 커스텀 오버레이들
  const overlays = useRef<{
    myLocation: any | null;
    infoOverlay: any | null;
    selectedOverlayRef: HTMLElement | null;
  }>({
    myLocation: null,
    infoOverlay: null,
    selectedOverlayRef: null,
  });

  const { isSidebarOpen } = useSidebarStore();
  const { mode, setMode, bounds, setBounds } = useMapStore();
  const { listings, setListings } = useListingStore();
  const { type, price, area, kind, crop, place } = useFilterStore();

  const [showMoveToJeollaButton, setShowMoveToJeollaButton] = useState(false);
  const [searchToggle, setSearchToggle] = useState<Record<string, boolean>>({});

  // 전라남도 센터(화순시)
  const JEONNAM_CENTER = useMemo(() => ({ lat: 35.0675, lng: 126.994 }), []);

  const isInJeonnam = (lat: number, lng: number) => {
    return lat >= 34 && lat <= 35.6 && lng >= 126 && lng <= 128;
  };

  //  매물 목록 가져오기
  const { data } = useQuery({
    queryKey: [
      "listing",
      type,
      price,
      area,
      kind,
      crop,
      place,
      keyword,
      bounds,
      sortBy,
    ],
    queryFn: () => {
      const body = buildListingBody({
        keyword,
        bounds,
        type,
        kind,
        area,
        price,
        crop,
        place,
        sortBy,
      });

      return getListing(body);
    },
    staleTime: Infinity,
    enabled: mode !== "ranking",
  });

  useEffect(() => {
    if (mode == "ranking") return;
    if (data) {
      const refineData = data.content.filter((item: ListingItem) =>
        ["전라남도", "전남"].some((prefix) => item.saleAddr.startsWith(prefix)),
      );
      setListings(refineData);
    }
  }, [data, setListings, mode]);

  // 전라남도 구역으로 이동
  const moveToJeonnam = () => {
    if (!kakaoMapRef.current) return;
    kakaoMapRef.current.setLevel(10);
    kakaoMapRef.current.panTo(
      new window.kakao.maps.LatLng(JEONNAM_CENTER.lat, JEONNAM_CENTER.lng),
    );
  };

  const clearSelectedMarker = () => {
    if (selectedMarkerRef.current) {
      selectedMarkerRef.current.setMap(null);
      selectedMarkerRef.current = null;
    }
  };

  // 오버레이 초기화 함수
  const clearAllOverlays = () => {
    if (overlays.current.myLocation) {
      overlays.current.myLocation.setMap(null);
      overlays.current.myLocation = null;
    }
    if (overlays.current.infoOverlay) {
      overlays.current.infoOverlay.setMap(null);
      overlays.current.infoOverlay = null;
    }
    if (overlays.current.selectedOverlayRef) {
      overlays.current.selectedOverlayRef.classList.remove("selected");
      overlays.current.selectedOverlayRef = null;
    }
  };

  // 마커 클릭 시 호출
  const handleMarkerClick = useCallback(
    ({
      saleId,
      lat,
      lng,
      address,
      saleCategory,
      price,
      area,
      landCategory,
    }: {
      saleId: number;
      lat: number;
      lng: number;
      address: string;
      saleCategory: string;
      price: number;
      area: number;
      landCategory: string;
    }) => {
      const map = kakaoMapRef.current;
      if (!map) return;

      const latLng = new window.kakao.maps.LatLng(lat, lng);

      // 지도 중심 이동 및 줌인
      if (!isZoomedToMarkerRef.current) {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("zoom", "1");
        queryParams.set("m_lat", String(lat));
        queryParams.set("m_lng", String(lng));

        detailReadyRef.current = true;

        const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
        window.history.replaceState(null, "", newUrl);
      }

      const content = createOverlayContent(
        saleCategory,
        price,
        area,
        landCategory,
      );

      content.dataset.saleId = String(saleId);
      content.classList.add("selected");

      const marker = new window.kakao.maps.CustomOverlay({
        position: latLng,
        content: content,
        xAnchor: 0.5,
        yAnchor: 0.5,
      });

      selectedMarkerRef.current = marker;
      selectedMarkerRef.current.setMap(kakaoMapRef.current);

      overlays.current.selectedOverlayRef = content;

      // 오버레이 생성
      const infoContent = document.createElement("div");
      infoContent.style.position = "relative";
      infoContent.style.padding = "8px 12px";
      infoContent.style.background = "#F6FFE8";
      infoContent.style.borderRadius = "40px";
      infoContent.innerHTML = `<h4 style="font-size:16px; font-weight:700;">${address}</h4>`;

      const pointer = document.createElement("div");
      pointer.style.position = "absolute";
      pointer.style.bottom = "-10px";
      pointer.style.left = "50%";
      pointer.style.transform = "translateX(-50%)";
      pointer.style.width = "0";
      pointer.style.height = "0";
      pointer.style.borderLeft = "10px solid transparent";
      pointer.style.borderRight = "10px solid transparent";
      pointer.style.borderTop = "10px solid #F6FFE8";

      infoContent.appendChild(pointer);

      const infoOverlay = new window.kakao.maps.CustomOverlay({
        content: infoContent,
        position: latLng,
        yAnchor: 0.5 + 2.3,
        map: kakaoMapRef.current,
      });

      overlays.current.infoOverlay = infoOverlay;
    },
    [],
  );

  const handleKeywordSearch = (keyword: string) => {
    if (!kakaoMapRef.current) return;

    searchPlaceByKeyword({
      keyword,
      kakaoMap: kakaoMapRef.current,
      markerImages,
      placesMarkersRef,
      searchToggle,
      setSearchToggle,
    });
  };

  // 내 위치로 이동
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

  // 지도 zoom과 center 변경 시, 쿼리 파라미터 업데이트
  const syncMapQuery = () => {
    const map = kakaoMapRef.current;
    if (!map) return;

    const level = map.getLevel();
    const center = map.getCenter();

    const params = new URLSearchParams(window.location.search);
    params.set("zoom", String(level));
    params.set("m_lat", String(center.getLat()));
    params.set("m_lng", String(center.getLng()));

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  // 클러스터 및 지역 마커 초기화 함수
  const clearAllClusters = () => {
    // 지역명 마커(CustomOverlay) 제거
    regionMarkersRef.current.forEach((overlay) => overlay.setMap(null));
    regionMarkersRef.current = [];

    // 숫자 클러스터 제거
    if (numberClustererRef.current) {
      numberClustererRef.current.clear();
      numberClustererRef.current = null;
    }
  };

  // 클러스터 마우스 이벤트 리스너
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

  // 지역명 마커 세팅
  const setupRegionMarkers = useCallback(() => {
    clearAllClusters();
    clearSelectedMarker();
    clearAllOverlays();

    if (listings.length <= 0) {
      return;
    }

    const grouped = listings.reduce((acc, item) => {
      const region = item.saleAddr.split(" ")[1];
      if (!acc[region]) acc[region] = [];
      acc[region].push(item);
      return acc;
    }, {} as Record<string, ListingItem[]>);

    Object.entries(grouped).forEach(([region, items]) => {
      const avgLat =
        items.reduce((sum, cur) => sum + cur.wgsY, 0) / items.length;
      const avgLng =
        items.reduce((sum, cur) => sum + cur.wgsX, 0) / items.length;

      const content = createRegionOverlay(region);

      content.addEventListener("click", () => {
        kakaoMapRef.current.setLevel(8);
        kakaoMapRef.current.panTo(new window.kakao.maps.LatLng(avgLat, avgLng));
      });

      const regionOverlay = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(avgLat, avgLng),
        content: content,
        xAnchor: 0.5,
        yAnchor: 0.5,
      });

      regionOverlay.setMap(kakaoMapRef.current);
      regionMarkersRef.current.push(regionOverlay);
    });
  }, [listings]);

  // 숫자 클러스터러
  const setupNumberCluster = useCallback(() => {
    clearAllClusters();
    clearSelectedMarker();

    const map = kakaoMapRef.current;
    if (!map) return;

    // 마커 생성
    const markers = listings.map((item) => {
      const content = createOverlayContent(
        item.saleCategory,
        item.price,
        item.area,
        item.landCategory,
      );
      content.dataset.saleId = String(item.saleId);

      content.addEventListener("click", () => {
        const level = map.getLevel();
        const center = map.getCenter();

        const params = new URLSearchParams(window.location.search);
        params.set("zoom", String(level));
        params.set("m_lat", String(center.getLat()));
        params.set("m_lng", String(center.getLng()));

        router.push(`/listing/${item.saleId}?${params.toString()}`);
      });

      const marker = new window.kakao.maps.CustomOverlay({
        position: new window.kakao.maps.LatLng(item.wgsY, item.wgsX),
        content,
        xAnchor: 0.5,
        yAnchor: 0.5,
      });

      marker.setMap(kakaoMapRef.current);
      return marker;
    });

    allMarkersRef.current = markers;

    numberClustererRef.current = new window.kakao.maps.MarkerClusterer({
      map,
      averageCenter: true,
      minLevel: 7,
      disableClickZoom: false,
      calculator: [2, 4, 8],
      styles: clusterStyle.number,
    });

    numberClustererRef.current.addMarkers(markers);

    addClusterMouseEvents(
      numberClustererRef.current,
      { background: "#39b94c" },
      { background: "rgba(57, 185, 76, 0.78)" },
    );
  }, [listings, router]);

  // 매물 변화에 따라 URL 파라미터 업데이트
  const syncUrlOnListings = useCallback(() => {
    const map = kakaoMapRef.current;
    if (!map) return;

    const level = map.getLevel();
    const queryParams = new URLSearchParams(window.location.search);

    // 매물이 2개 이상이고 zoom 레벨이 2 이상, 8 미만이면 listing으로 이동
    if (level < 8 && level >= 2 && listings.length >= 2) {
      // setMode("map");
      router.push(`/listing?${queryParams.toString()}`);
    }
    // 현재 경로가 listing으로 시작하고 zoom 레벨이 8 이상이면 홈으로 이동
    else if (
      pathname.startsWith("/listing") &&
      detailReadyRef.current &&
      level >= 8
    ) {
      console.log("홈으로");
      router.push(`/?${queryParams.toString()}`);
    }
  }, [listings, pathname, router]);

  // 상세 페이지가 변할 때, zoom을 1로하는 세팅과 center로 이동하는 상태 false로 설정
  useEffect(() => {
    if (pathname?.startsWith("/listing/")) {
      isZoomedToMarkerRef.current = false;
    }
  }, [pathname]);

  // 사이드바 열고 닫힐 때 지도가 잘 보이도록 재배치
  useEffect(() => {
    if (!kakaoMapRef.current) return;

    const currentCenter = kakaoMapRef.current.getCenter();
    kakaoMapRef.current.relayout();
    kakaoMapRef.current.setCenter(currentCenter);
  }, [isSidebarOpen]);

  // --- 1. 초기 지도 생성 (한 번만 실행) ---
  useEffect(() => {
    if (typeof window === "undefined" || !window.kakao || !mapRef.current)
      return;

    // 카카오 지도 API가 비동기로 로드되므로, load 완료 후 실행
    const onLoad = () => {
      const initialCenter =
        mLat && mLng
          ? new window.kakao.maps.LatLng(Number(mLat), Number(mLng))
          : new window.kakao.maps.LatLng(
              JEONNAM_CENTER.lat,
              JEONNAM_CENTER.lng,
            );

      const map = new window.kakao.maps.Map(mapRef.current, {
        center: initialCenter,
        level: initialZoom,
        mapTypeId: window.kakao.maps.MapTypeId.HYBRID,
      });

      kakaoMapRef.current = map;

      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      // 처음 바운드 설정
      setBounds({
        swLat: sw.getLat(),
        swLng: sw.getLng(),
        neLat: ne.getLat(),
        neLng: ne.getLng(),
      });

      window.kakao.maps.event.addListener(map, "idle", () => {
        const bounds = map.getBounds();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const center = map.getCenter();
        const level = map.getLevel();
        const isJeonnamVisible = isInJeonnam(center.getLat(), center.getLng());

        // 지도가 움직일 때마다 바운드 설정
        setBounds({
          swLat: sw.getLat(),
          swLng: sw.getLng(),
          neLat: ne.getLat(),
          neLng: ne.getLng(),
        });

        if (level >= 12 || !isJeonnamVisible) {
          setShowMoveToJeollaButton(true);
        } else {
          setShowMoveToJeollaButton(false);
        }

        syncMapQuery();
      });
    };

    if (window.kakao.maps?.load) {
      window.kakao.maps.load(() => {
        onLoad();
      });
    } else {
      onLoad();
    }
  }, [setBounds]);

  useEffect(() => {
    const map = kakaoMapRef.current;
    if (!map) return;

    const level = map.getLevel();
    if (level <= 8) {
      setupNumberCluster();
    } else {
      setupRegionMarkers();
    }
  }, [bounds, setupNumberCluster, setupRegionMarkers]);

  // 현재 URL 경로에 따른 지도 업데이트
  useEffect(() => {
    if (pathname === "/") {
      setMode("map");
      const queryParams = new URLSearchParams(searchParams.toString());
      queryParams.delete("keyword");
      queryParams.delete("sortBy");
    }

    const zoom = searchParams.get("zoom");
    const mLat = searchParams.get("m_lat");
    const mLng = searchParams.get("m_lng");

    if (!kakaoMapRef.current) return;

    // 쿼리 파라미터가 있을 경우, 해당 좌표와 줌 레벨로 이동
    if (zoom && mLat && mLng) {
      const center = new window.kakao.maps.LatLng(Number(mLat), Number(mLng));
      const level = Number(zoom);

      kakaoMapRef.current.setLevel(level);
      kakaoMapRef.current.setCenter(center);
    } else if (window.location.pathname === "/") {
      const defaultCenter = new window.kakao.maps.LatLng(
        JEONNAM_CENTER.lat,
        JEONNAM_CENTER.lng,
      );
      kakaoMapRef.current.setLevel(10);
      kakaoMapRef.current.setCenter(defaultCenter);
    } else {
      kakaoMapRef.current.setLevel(10);
    }
  }, [searchParams, JEONNAM_CENTER, pathname, setMode]);

  // --- 2. listings 변경 시 마커 및 클러스터 업데이트 ---
  useEffect(() => {
    if (!kakaoMapRef.current || listings.length <= 0) {
      clearAllClusters();
      clearAllOverlays();
      return;
    }

    // 기존 마커 제거
    allMarkersRef.current.forEach((overlay) => overlay.setMap(null));
    allMarkersRef.current = [];

    const level = kakaoMapRef.current.getLevel();

    // 지도 현재 줌 레벨에 따라 클러스터 설정
    if (level <= 8) {
      setupNumberCluster();
    } else {
      setupRegionMarkers();
    }

    syncUrlOnListings();
  }, [listings, setupNumberCluster, setupRegionMarkers, syncUrlOnListings]);

  // 키워드 검색으로 리스팅 변경 시, 해당 지역으로 이동
  useEffect(() => {
    if (!keyword || !kakaoMapRef.current || hasHandledKeywordRef.current)
      return;

    // listings이 로드될 때까지 기다리기
    if (listings.length === 0) return;

    // 중심 좌표 계산
    const avgLat =
      listings.reduce((sum, cur) => sum + cur.wgsY, 0) / listings.length;
    const avgLng =
      listings.reduce((sum, cur) => sum + cur.wgsX, 0) / listings.length;

    // 지도 이동
    const center = new window.kakao.maps.LatLng(avgLat, avgLng);
    kakaoMapRef.current.setLevel(10);
    kakaoMapRef.current.panTo(center);

    const map = kakaoMapRef.current;

    let shouldRemoveKeyword = false;

    const handleIdle = () => {
      if (!shouldRemoveKeyword) {
        // 첫 idle(검색으로 이동한 후)에는 플래그만 설정
        shouldRemoveKeyword = true;
        return;
      }
      // 이동 후 keyword 파라미터 제거
      const params = new URLSearchParams(window.location.search);
      params.delete("keyword");
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      window.history.replaceState(null, "", newUrl);

      hasHandledKeywordRef.current = true;

      // 리스너 제거
      window.kakao.maps.event.removeListener(map, "idle", handleIdle);
    };

    // 지도 이동 완료 후(이동 후 idle 발생) keyword 제거
    window.kakao.maps.event.addListener(map, "idle", handleIdle);
  }, [listings]);

  // 검색 키워드가 변경되면 초기화
  useEffect(() => {
    hasHandledKeywordRef.current = false;
  }, [keyword]);

  // --- 3. 상세페이지 URL 파라미터로 마커 선택 상태 반영
  useEffect(() => {
    if (
      !kakaoMapRef.current ||
      !pathname?.startsWith("/listing/") ||
      !params?.id
    ) {
      return;
    }

    clearSelectedMarker();
    clearAllOverlays();

    const target = listings.find(
      (pos) => String(pos.saleId) === String(params.id),
    );
    if (!target) return;
    const {
      saleId,
      wgsY: lat,
      wgsX: lng,
      saleAddr: address,
      saleCategory,
      price,
      area,
      landCategory,
    } = target;

    handleMarkerClick({
      saleId,
      lat,
      lng,
      address,
      saleCategory,
      price,
      area,
      landCategory,
    });
    isZoomedToMarkerRef.current = true;
  }, [params?.id, pathname, listings, handleMarkerClick, bounds, mode]);

  // 상세 페이지가 아니면 선택된 마커 오버레이 해제
  useEffect(() => {
    if (!pathname?.startsWith("/listing/")) {
      // 상세페이지가 아니면 선택 해제
      if (overlays.current.selectedOverlayRef) {
        clearAllOverlays();
      }
      isZoomedToMarkerRef.current = false;
    }
  }, [pathname]);

  return (
    <div className="relative w-full h-full">
      {/* 지도 */}
      <div ref={mapRef} className="w-full h-full" />

      {/* 우측 버튼들 */}
      <MapButtons
        onMoveToMyLocation={moveToMyLocation}
        onZoomIn={() => {
          const map = kakaoMapRef.current;
          if (!map) return;
          const level = map.getLevel();
          map.setLevel(level - 1);
        }}
        onZoomOut={() => {
          const map = kakaoMapRef.current;
          if (!map) return;
          const level = map.getLevel();
          map.setLevel(level + 1);
        }}
        onSearch={handleKeywordSearch}
      />

      {/* 전라도 지도로 이동하기 버튼 */}
      {showMoveToJeollaButton && <MoveToJeollaButton onClick={moveToJeonnam} />}
    </div>
  );
}
