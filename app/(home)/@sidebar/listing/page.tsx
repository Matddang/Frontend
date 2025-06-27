"use client";

import Card from "@/components/common/Card";
import DropDown from "@/components/common/DropDown";
import { ListingItem, useListingStore } from "@/store/ListingStore";
import { useRouter, useSearchParams } from "next/navigation";

export default function ListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { listings } = useListingStore();

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
            saleId={item.saleId}
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
