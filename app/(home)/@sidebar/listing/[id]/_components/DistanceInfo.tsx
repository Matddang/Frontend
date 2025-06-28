"use client";

import Image from "next/image";
import Link from "next/link";
import HomeIcon from "@/assets/images/home.svg";
import HomeActiveIcon from "@/assets/images/home-active.svg";
import FarmlandIcon from "@/assets/images/farmland.svg";
import FarmlandActiveIcon from "@/assets/images/farmland-active.svg";
import CarIcon from "@/assets/images/car.svg";
import { useEffect, useState } from "react";
import { useTokenStore } from "@/store/useTokenStore";
import { useQuery } from "@tanstack/react-query";
import { getMyPlace } from "@/services/getMyPlace";

interface Place {
  placeId: number;
  address: string;
  placeType: string;
  placeName: string;
  latitude: string;
  longitude: string;
}

export default function DistanceInfo({ coordinate }: { coordinate: number[] }) {
  const [selected, setSelected] = useState<Place>();
  const { token } = useTokenStore();
  const [places, setPlaces] = useState<Place[]>([]);
  const [distance, setDistance] = useState("");

  const { data } = useQuery({
    queryKey: ["myPlace"],
    queryFn: () => getMyPlace(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  useEffect(() => {
    if (data) {
      setPlaces(data.data);
      setSelected(data.data[0]);
    }
  }, [data]);

  useEffect(() => {
    const getDistance = async () => {
      if (!places || !selected?.latitude || !selected?.longitude)
        setDistance("-");
      else {
        await fetch(
          `/api/distance?origin=${selected.latitude},${selected.longitude}&destination=${coordinate[1]},${coordinate[0]}`,
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.rows) {
              const value = data.rows[0].elements[0].duration.text;
              const [hours, mins] = value
                .split(" ")
                .filter((v: string) => Number(v));

              if (hours && mins) setDistance(`${hours}시간 ${mins}분`);
              else if (!mins) setDistance(`${hours}시간`);
              else setDistance(`${mins}분`);
            }
          });
      }
    };

    getDistance();
  }, [selected, coordinate, places]);

  const getIcon = (type: string, isActive: boolean) => {
    if (type === "HOME") {
      return isActive ? HomeActiveIcon : HomeIcon;
    }
    if (type === "FARM") {
      return isActive ? FarmlandActiveIcon : FarmlandIcon;
    }
    return "";
  };

  return (
    <section className="px-4">
      <div className="flex justify-between items-center">
        <h3 className="typo-sub-head-bold">내 장소 기반 거리</h3>
        <Link
          href="/mypage/location"
          className="text-gray-700 border-b border-gray-700 typo-sub-title-m"
        >
          내 장소 편집
        </Link>
      </div>
      <div
        className="flex gap-[11px] mt-5 mb-[27px] overflow-x-scroll"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {places?.map((place) => {
          const isActive = selected?.placeId === place.placeId;
          return (
            <button
              key={place.placeId}
              onClick={() => setSelected(place)}
              className={`flex items-center gap-[6px] p-[10px] border rounded-[6px] min-w-fit ${
                isActive ? "border-primary bg-primary-light" : "border-gray-400"
              }`}
            >
              <Image
                src={getIcon(place.placeType, isActive)}
                alt={place.placeName}
                width={24}
                height={24}
              />
              <span className="typo-sub-title-m text-nowrap">
                {place.placeName}
              </span>
            </button>
          );
        })}
      </div>
      <div className="flex gap-3">
        <div className="w-full flex gap-[6px] justify-center items-center rounded-[10px] bg-gray-300 py-[20px]">
          <Image src={CarIcon} alt="차량" />
          <span>{distance || "-"}</span>
        </div>
      </div>
    </section>
  );
}
