"use client";

import Card from "@/components/common/Card";
import DropDown from "@/components/common/DropDown";
import { ListingItem, useListingStore } from "@/store/ListingStore";
import { useRouter, useSearchParams } from "next/navigation";

const options = [
  { key: "", label: "수익형 추천순" },
  { key: "liked", label: "좋아요 많은순" },
];

export default function ListingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { listings } = useListingStore();

  const sortKey = searchParams.get("sortBy") || "";

  const selectedOption =
    options.find((option) => option.key === sortKey) || options[0];

  const handleOptionSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("sortBy", value);
    } else {
      params.delete("sortBy");
    }
    router.replace(`?${params.toString()}`);
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
          defaultValue={selectedOption}
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
            isLiked={item.isLiked}
          />
        ))}
      </div>
    </div>
  );
}
