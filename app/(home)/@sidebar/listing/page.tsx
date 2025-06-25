"use client";

import Card from "@/components/common/Card";
import LandListingImg from "@/assets/images/land-listing.svg";
import DropDown from "@/components/common/DropDown";
import { useMapStore } from "@/store/MapStore";
import { useQuery } from "@tanstack/react-query";
import { getListing } from "@/services/getListing";
import { ListingItem, useListingStore } from "@/store/ListingStore";
import { useEffect } from "react";

// export interface GetListingResponse {
//   content: ListingItem[];
//   empty: boolean;
//   first: boolean;
//   last: boolean;
//   number: number;
//   numberOfElements: number;
//   totalElements?: number;
//   totalPages?: number;
// }

export default function ListingPage() {
  const { bounds } = useMapStore();
  const { listings, setListings } = useListingStore();

  const options = ["수익형 추천순", "좋아요 많은순"];
  const handleOptionSelect = (value: string) => {
    alert(value);
  };

  const requestData = {
    page: 1,
    size: 20,
    zoom: bounds
      ? [bounds.swLat, bounds.swLng, bounds.neLat, bounds.neLng]
      : [34, 126.42148956786673, 35, 126.34938579514532], // 기본값
  };

  // const { data } = useQuery({
  //   queryKey: ["listing", requestData],
  //   queryFn: () => getListing(requestData),
  //   staleTime: 5 * 60 * 1000,
  // });

  // useEffect(() => {
  //   if (data) {
  //     setListings(data.content);
  //   }
  // }, [data, setListings]);

  // console.log(listings);

  return (
    <div className="px-4">
      <div className="flex justify-between my-4">
        <span className="typo-sub-title-m text-gray-1000">
          {listings.length ?? 0}개의 매물
        </span>
        <DropDown
          options={options}
          onSelect={handleOptionSelect}
          defaultValue={options[0]}
        />
      </div>
      <div>
        {listings.map((item: ListingItem) => (
          <Card
            key={item.saleId}
            imageSrc={LandListingImg}
            type={item.saleCategory}
            price={item.price}
            area={item.area}
            address={item.saleAddr}
            kind={item.landType}
            variant="horizontal"
            crop={item.mainCrop}
            // place="집"
            // time="5분"
          />
        ))}
      </div>
    </div>
  );
}
