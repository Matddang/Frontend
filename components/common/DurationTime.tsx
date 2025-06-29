"use client";

import { getListingDetail } from "@/services/getListingDetail";
import { getMyPlace } from "@/services/getMyPlace";
import { useTokenStore } from "@/store/useTokenStore";
import { Place } from "@/types/myPlace";
import { getDurationTime } from "@/utils/getDurationTime";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";

interface DurationTimeProps {
  saleId: number;
  location: Place | null;
  setLocation: Dispatch<SetStateAction<Place | null>>;
  setTime: Dispatch<SetStateAction<string>>;
}

export default function DurationTime({
  saleId,
  location,
  setLocation,
  setTime,
}: DurationTimeProps) {
  const { token } = useTokenStore();

  const { data: myPlace } = useQuery({
    queryKey: ["myPlace"],
    queryFn: () => getMyPlace(),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const { data: saleData } = useQuery({
    queryKey: ["listingDetail", saleId],
    queryFn: () => getListingDetail(saleId),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });

  const { data: durationTime } = useQuery({
    queryKey: ["durationTime", saleId, location],
    queryFn: async () => {
      const duration = await getDurationTime(location!, [
        saleData.sale[0].wgsX,
        saleData.sale[0].wgsY,
      ]);
      return duration ?? "-";
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!token && !!location && !!saleData,
  });

  useEffect(() => {
    const getDistance = async () => {
      if (myPlace) {
        const homes = myPlace.data.filter(
          (v: Place) => v.placeType === "HOME" && v.latitude && v.longitude,
        );

        if (!homes.length) return;
        else {
          setLocation(homes[0]);

          if (durationTime) setTime(durationTime);
          else setTime("");
        }
      }
    };

    getDistance();
  }, [setLocation, setTime, durationTime, myPlace]);

  return <></>;
}
