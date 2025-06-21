import { CROP_CHILD_FILTER } from "@/constants/filterOptions";

export const formatKoreanUnit = (value: number): string => {
  if (value === 0) return "0";

  const units = [
    { unit: 100000000, label: "억" },
    { unit: 10000000, label: "천" },
    { unit: 10000, label: "만원" },
  ];

  let result = "";

  for (const { unit, label } of units) {
    const quotient = Math.floor(value / unit);
    if (quotient > 0) {
      result += `${quotient}${label} `;
      value -= quotient * unit;
    }
  }

  return result;
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

  return subCrops.join(", ");
};
