import { useState } from "react";
import Button from "@/components/common/Button";
import {
  CROP_PARENT_FILTER,
  CROP_CHILD_FILTER,
} from "@/constants/filterOptions";

type CropParentKey = keyof typeof CROP_PARENT_FILTER;

interface CropFilterProps {
  tempCrop: { [parent in CropParentKey]?: string[] };
  setTempCrop: (value: { [parent in CropParentKey]?: string[] }) => void;
}

export default function CropFilter({ tempCrop, setTempCrop }: CropFilterProps) {
  const [cropParent, setCropParent] = useState<CropParentKey | null>(null);

  const parentKeys = Object.keys(CROP_PARENT_FILTER) as CropParentKey[];
  return (
    <div className="flex flex-col gap-6 min-w-[502px] mt-[6px]">
      <div className="text-gray-700 typo-body-1-m">
        최대 4개까지 선택할 수 있습니다.
      </div>
      <div className="grid grid-cols-4 gap-[13px]">
        {parentKeys.map((key) => (
          <div key={key} className="relative">
            <Button
              text={CROP_PARENT_FILTER[key].label}
              isActive={cropParent === key}
              activeColor={["border-gray-600", "bg-gray-100", "text-black"]}
              onClick={() => setCropParent(key)}
            />
            {tempCrop[key]?.length ? (
              <span className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 bg-primary text-white typo-body-2-b rounded-[50%] w-[22px] h-[22px] flex justify-center items-center">
                {tempCrop[key]?.length}
              </span>
            ) : null}
          </div>
        ))}
      </div>

      {cropParent && (
        <div>
          <h2 className="text-lg font-extrabold">
            {CROP_PARENT_FILTER[cropParent].label}
          </h2>
          <div className="typo-14-r">
            {CROP_PARENT_FILTER[cropParent].description}
          </div>
          <div className="grid grid-cols-4 gap-[13px] mt-4">
            {Object.entries(CROP_CHILD_FILTER[cropParent]).map(
              ([key, label]) => (
                <Button
                  key={key}
                  text={label}
                  isActive={tempCrop[cropParent]?.includes(key) ?? false}
                  onClick={() => {
                    const prevSelected = tempCrop[cropParent] ?? [];
                    let newSelected: string[];

                    // 현재 전체 선택된 작물 수 계산
                    const totalSelectedCount = Object.values(tempCrop).reduce(
                      (acc, arr) => acc + (arr?.length ?? 0),
                      0,
                    );

                    if (prevSelected.includes(key)) {
                      newSelected = prevSelected.filter((v) => v !== key);
                    } else {
                      if (totalSelectedCount >= 4) return; // 4개 이상이면 추가 X
                      newSelected = [...prevSelected, key];
                    }
                    setTempCrop({
                      ...tempCrop,
                      [cropParent]: newSelected,
                    });
                  }}
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
