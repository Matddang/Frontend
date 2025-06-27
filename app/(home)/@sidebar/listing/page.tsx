"use client";

import Card from "@/components/common/Card";
import DropDown from "@/components/common/DropDown";
import { getListing } from "@/services/getListing";
import { ListingItem, useListingStore } from "@/store/ListingStore";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? undefined;

  const { listings, setListings } = useListingStore();

  // const { data } = useQuery({
  //   queryKey: ["listing", keyword],
  //   queryFn: () => getListing({ keyword }),
  //   enabled: !!keyword,
  // });

  // useEffect(() => {
  //   if (data) {
  //     const refineData = data.content.filter((item: ListingItem) =>
  //       ["전라남도", "전남"].some((prefix) => item.saleAddr.startsWith(prefix)),
  //     );

  //     setListings(refineData);
  //   }
  // }, [data, setListings]);

  const options = ["수익형 추천순", "좋아요 많은순"];
  const handleOptionSelect = (value: string) => {
    alert(value);
  };

  const moveToDetail = (id: number) => {
    router.push(`/listing/${id}?${searchParams.toString()}`);
  };

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
            imageSrc={item.imgUrl}
            type={item.saleCategory}
            price={item.price}
            area={item.area}
            address={item.saleAddr}
            kind={item.landType}
            variant="horizontal"
            crop={item.mainCrop}
            onClick={() => moveToDetail(item.saleId)}
          />
        ))}
      </div>
    </div>
  );
}
