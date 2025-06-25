import {
  AREA_FILTER,
  CROP_CHILD_FILTER,
  KIND_FILTER,
  PRICE_FILTER,
} from "@/constants/filterOptions";

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

  return `${tenThousand}만원`;
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

interface FilterState {
  type: string | null;
  price: { min: number; max: number };
  area: { min: number; max: number };
  kind: string[];
  crop: { [parent: string]: string[] };
  place: { id: number | null; name: string | null };
}

export const formatDisplayFilterText = (
  key: string,
  state: FilterState,
): string => {
  const { type, price, area, kind, crop, place } = state;

  switch (key) {
    case "type":
      return type ?? "";
    case "price": {
      const isMinDefault = price.min === PRICE_FILTER[0].value;
      const isMaxDefault = price.max === PRICE_FILTER.at(-1)?.value;

      if (isMinDefault && isMaxDefault) return "";
      if (!isMinDefault && isMaxDefault)
        return `${formatKoreanUnit(price.min)} 이상`;
      if (isMinDefault && !isMaxDefault)
        return `${price.min}~${formatKoreanUnit(price.max)}`;
      return `${formatKoreanUnit(price.min)} ~ ${formatKoreanUnit(price.max)}`;
    }
    case "area": {
      const isMinDefault = area.min === AREA_FILTER[0].value;
      const isMaxDefault = area.max === AREA_FILTER.at(-1)?.value;

      if (isMinDefault && isMaxDefault) return "";
      if (!isMinDefault && isMaxDefault)
        return `${area.min.toLocaleString()}평 이상`;
      if (!isMinDefault || !isMaxDefault)
        return `${area.min.toLocaleString()}~${area.max.toLocaleString()}평`;
    }
    case "kind":
      return kind.length > 0 ? kind.map((k) => KIND_FILTER[k]).join(", ") : "";
    case "crop":
      return Object.keys(crop).length > 0 ? getCropLabelString(crop) : "";
    case "place":
      return place.name ? `${place.name}에서 가까운` : "";
    default:
      return "";
  }
};
