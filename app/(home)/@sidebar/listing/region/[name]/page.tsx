"use client";

import Card from "@/components/common/Card";
import LandListingImg from "@/assets/images/land-listing.svg";
import DropDown from "@/components/common/DropDown";

export default function page() {
  const slides = Array.from({ length: 5 });
  const options = ["수익형 추천순", "좋아요 많은순"];
  const handleOptionSelect = (value: string) => {
    alert(value);
  };
  return (
    <div className="px-4">
      <div className="flex justify-between my-4">
        <span className="typo-sub-title-m text-gray-1000">
          {slides.length}개의 매물
        </span>
        <DropDown
          options={options}
          onSelect={handleOptionSelect}
          defaultValue={options[0]}
        />
      </div>
      <div>
        {slides.map((_, i) => (
          <Card
            key={i}
            imageSrc={LandListingImg}
            type="매매"
            price={150000000}
            area={351}
            address="전라남도 여수시 청산면 12-1"
            kind="과수원"
            variant="horizontal"
            crop="포도"
            place="집"
            time="5분"
            onClick={() => alert("이동")}
          />
        ))}
      </div>
    </div>
  );
}
