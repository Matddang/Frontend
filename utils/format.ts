import { CROP_CHILD_FILTER } from "@/constants/filterOptions";

export const formatKoreanUnit = (value: number): string => {
  if (value < 10000) return `${value}원`;

  const hundredMillion = Math.floor(value / 100000000); // 억
  const tenMillion = Math.floor((value % 100000000) / 10000000); // 천만
  const tenThousand = Math.floor(value / 10000); // 만

  if (value >= 100000000) {
    if (tenMillion > 0) {
      return `${hundredMillion}억 ${tenMillion}천`;
    }
    return `${hundredMillion}억`;
  }

  if (value >= 10000000) {
    return `${tenMillion}천`;
  }

  return `${tenThousand}만`;
};

export const getCropLabelString = (crop: { [parent: string]: string[] }) => {
  const subCrops: string[] = [];

  Object.entries(crop).forEach(([parentKey, childIds]) => {
    const labelMap =
      CROP_CHILD_FILTER[parentKey as keyof typeof CROP_CHILD_FILTER];
    if (!labelMap) return;

    childIds.forEach((id) => {
      const label = labelMap[Number(id) as keyof typeof labelMap];
      if (label) subCrops.push(label);
    });
  });

  if (subCrops.length <= 2) {
    return subCrops.join(", ");
  } else {
    return `${subCrops[0]} + ${subCrops.length - 1}`;
  }
};
